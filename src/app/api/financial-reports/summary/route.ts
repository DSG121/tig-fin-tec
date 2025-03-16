import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get current date info
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Get expenses for the current month
    const { data: expenses, error: expensesError } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", user.id)
      .gte(
        "date",
        `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-01`,
      );

    if (expensesError) throw expensesError;

    // Get recurring payments
    const { data: recurringPayments, error: recurringError } = await supabase
      .from("recurring_payments")
      .select("*")
      .eq("user_id", user.id)
      .eq("status", "Active");

    if (recurringError) throw recurringError;

    // Calculate expense breakdown by category
    const expensesByCategory = {};
    expenses?.forEach((expense) => {
      if (!expensesByCategory[expense.category]) {
        expensesByCategory[expense.category] = 0;
      }
      expensesByCategory[expense.category] += expense.amount;
    });

    // Calculate recurring payments by category
    const recurringByCategory = {};
    recurringPayments?.forEach((payment) => {
      if (!recurringByCategory[payment.category]) {
        recurringByCategory[payment.category] = 0;
      }

      // Normalize to monthly amount
      let monthlyAmount = payment.amount;
      if (payment.frequency === "Bi-weekly")
        monthlyAmount = payment.amount * 2.17;
      else if (payment.frequency === "Weekly")
        monthlyAmount = payment.amount * 4.33;
      else if (payment.frequency === "Quarterly")
        monthlyAmount = payment.amount / 3;
      else if (payment.frequency === "Annually")
        monthlyAmount = payment.amount / 12;

      recurringByCategory[payment.category] += monthlyAmount;
    });

    // Calculate total expenses
    const totalExpenses =
      expenses?.reduce((sum, expense) => sum + expense.amount, 0) || 0;

    // Calculate total recurring payments (monthly equivalent)
    const totalRecurring =
      recurringPayments?.reduce((sum, payment) => {
        let monthlyAmount = payment.amount;
        if (payment.frequency === "Bi-weekly")
          monthlyAmount = payment.amount * 2.17;
        else if (payment.frequency === "Weekly")
          monthlyAmount = payment.amount * 4.33;
        else if (payment.frequency === "Quarterly")
          monthlyAmount = payment.amount / 3;
        else if (payment.frequency === "Annually")
          monthlyAmount = payment.amount / 12;
        return sum + monthlyAmount;
      }, 0) || 0;

    // Sample revenue data (in a real app, this would come from invoices)
    const revenue = 25000;

    // Calculate financial health indicators
    const totalOutflow = totalExpenses + totalRecurring;
    const netCashFlow = revenue - totalOutflow;
    const profitMargin = (netCashFlow / revenue) * 100;

    // Prepare response
    const summary = {
      currentMonth: currentDate.toLocaleString("default", { month: "long" }),
      currentYear,
      revenue,
      expenses: {
        total: totalExpenses,
        byCategory: expensesByCategory,
      },
      recurringPayments: {
        total: totalRecurring,
        byCategory: recurringByCategory,
      },
      financialHealth: {
        netCashFlow,
        profitMargin: profitMargin.toFixed(2),
        status:
          profitMargin > 20
            ? "Excellent"
            : profitMargin > 10
              ? "Good"
              : profitMargin > 0
                ? "Fair"
                : "Needs Attention",
      },
      upcomingPayments:
        recurringPayments
          ?.filter((payment) => {
            const nextDate = new Date(payment.next_date);
            const oneWeekFromNow = new Date();
            oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);
            return nextDate <= oneWeekFromNow;
          })
          .map((payment) => ({
            id: payment.id,
            name: payment.name,
            amount: payment.amount,
            dueDate: payment.next_date,
            category: payment.category,
          })) || [],
    };

    return NextResponse.json({ summary });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to fetch financial summary" },
      { status: 500 },
    );
  }
}
