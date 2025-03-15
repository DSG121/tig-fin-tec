import { createClient } from "../../../../supabase/server";
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
    // Get recurring payments for financial calculations
    const { data: recurringPayments, error: recurringError } = await supabase
      .from("recurring_payments")
      .select("*")
      .eq("user_id", user.id);

    if (recurringError) throw recurringError;

    // Get expenses for financial calculations
    const { data: expenses, error: expensesError } = await supabase
      .from("expenses")
      .select("*")
      .eq("user_id", user.id);

    if (expensesError) throw expensesError;

    // Calculate financial metrics
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Filter expenses for current month
    const currentMonthExpenses =
      expenses?.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      }) || [];

    // Calculate total expenses for current month
    const totalExpenses = currentMonthExpenses.reduce(
      (sum, expense) => sum + expense.amount,
      0,
    );

    // Calculate monthly recurring payments
    const monthlyRecurringTotal = (recurringPayments || []).reduce(
      (sum, payment) => {
        if (payment.status !== "Active") return sum;

        if (payment.frequency === "Monthly") return sum + payment.amount;
        if (payment.frequency === "Bi-weekly")
          return sum + payment.amount * 2.17;
        if (payment.frequency === "Weekly") return sum + payment.amount * 4.33;
        if (payment.frequency === "Quarterly") return sum + payment.amount / 3;
        if (payment.frequency === "Annually") return sum + payment.amount / 12;
        return sum;
      },
      0,
    );

    // Sample revenue (in a real app, this would come from invoices or payments)
    const estimatedRevenue = 25000;

    // Calculate financial metrics
    const financialMetrics = {
      revenue: estimatedRevenue,
      expenses: totalExpenses + monthlyRecurringTotal,
      profit: estimatedRevenue - (totalExpenses + monthlyRecurringTotal),
      profitMargin: (
        ((estimatedRevenue - (totalExpenses + monthlyRecurringTotal)) /
          estimatedRevenue) *
        100
      ).toFixed(1),
      cashOnHand: 42500, // Sample data - would come from bank account integration
      accountsReceivable: 15750, // Sample data - would come from unpaid invoices
      accountsPayable: monthlyRecurringTotal, // Using recurring payments as accounts payable
    };

    // Generate report list
    const reports = [
      {
        id: "rep-001",
        name: "Monthly Profit & Loss",
        description:
          "Detailed breakdown of revenue and expenses for the current month",
        period: `${new Date().toLocaleString("default", { month: "long" })} ${currentYear}`,
        type: "Profit & Loss",
        createdAt: new Date().toISOString().split("T")[0],
      },
      {
        id: "rep-002",
        name: "Quarterly Balance Sheet",
        description:
          "Summary of assets, liabilities, and equity for current quarter",
        period: `Q${Math.floor(currentMonth / 3) + 1} ${currentYear}`,
        type: "Balance Sheet",
        createdAt: new Date().toISOString().split("T")[0],
      },
      {
        id: "rep-003",
        name: "Cash Flow Statement",
        description:
          "Analysis of cash inflows and outflows for the current month",
        period: `${new Date().toLocaleString("default", { month: "long" })} ${currentYear}`,
        type: "Cash Flow",
        createdAt: new Date().toISOString().split("T")[0],
      },
      {
        id: "rep-004",
        name: "Expense Analysis",
        description: "Detailed breakdown of expenses by category",
        period: `${new Date().toLocaleString("default", { month: "long" })} ${currentYear}`,
        type: "Expense Report",
        createdAt: new Date().toISOString().split("T")[0],
      },
      {
        id: "rep-005",
        name: "Revenue by Client",
        description: "Analysis of revenue sources by client",
        period: `${new Date().toLocaleString("default", { month: "long" })} ${currentYear}`,
        type: "Revenue Report",
        createdAt: new Date().toISOString().split("T")[0],
      },
      {
        id: "rep-006",
        name: "Tax Summary",
        description:
          "Summary of tax liabilities and payments for current quarter",
        period: `Q${Math.floor(currentMonth / 3) + 1} ${currentYear}`,
        type: "Tax Report",
        createdAt: new Date().toISOString().split("T")[0],
      },
    ];

    return NextResponse.json({ financialMetrics, reports });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to fetch financial reports data" },
      { status: 500 },
    );
  }
}
