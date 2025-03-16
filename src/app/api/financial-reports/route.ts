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

    // Get user's financial reports
    const { data: userReports, error: reportsError } = await supabase
      .from("financial_reports")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (reportsError) throw reportsError;

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

    // Format user reports for the response
    const reports = userReports
      ? userReports.map((report) => ({
          id: report.id,
          name: report.name,
          description: report.description,
          period: report.period,
          type: report.report_type,
          format: report.format,
          includeCharts: report.include_charts,
          includeNotes: report.include_notes,
          createdAt: new Date(report.created_at).toISOString().split("T")[0],
          downloadUrl: `/api/financial-reports/download/${report.id}`,
        }))
      : [];

    // If no reports exist yet, create some sample reports
    if (reports.length === 0) {
      // Generate sample report list
      const sampleReports = [
        {
          name: "Monthly Profit & Loss",
          description:
            "Detailed breakdown of revenue and expenses for the current month",
          period: `${new Date().toLocaleString("default", { month: "long" })} ${currentYear}`,
          report_type: "profit-loss",
          format: "pdf",
          include_charts: true,
          include_notes: false,
          user_id: user.id,
        },
        {
          name: "Quarterly Balance Sheet",
          description:
            "Summary of assets, liabilities, and equity for current quarter",
          period: `Q${Math.floor(currentMonth / 3) + 1} ${currentYear}`,
          report_type: "balance-sheet",
          format: "pdf",
          include_charts: true,
          include_notes: true,
          user_id: user.id,
        },
        {
          name: "Cash Flow Statement",
          description:
            "Analysis of cash inflows and outflows for the current month",
          period: `${new Date().toLocaleString("default", { month: "long" })} ${currentYear}`,
          report_type: "cash-flow",
          format: "pdf",
          include_charts: true,
          include_notes: false,
          user_id: user.id,
        },
      ];

      // Insert sample reports into the database
      const { data: newReports, error: insertError } = await supabase
        .from("financial_reports")
        .insert(sampleReports)
        .select();

      if (insertError) throw insertError;

      // Format the newly created reports for the response
      if (newReports) {
        for (const report of newReports) {
          reports.push({
            id: report.id,
            name: report.name,
            description: report.description,
            period: report.period,
            type: report.report_type,
            format: report.format,
            includeCharts: report.include_charts,
            includeNotes: report.include_notes,
            createdAt: new Date(report.created_at).toISOString().split("T")[0],
            downloadUrl: `/api/financial-reports/download/${report.id}`,
          });
        }
      }
    }

    return NextResponse.json({ financialMetrics, reports });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to fetch financial reports data" },
      { status: 500 },
    );
  }
}
