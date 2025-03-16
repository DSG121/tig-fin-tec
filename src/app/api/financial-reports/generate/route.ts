import { createClient } from "../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const formData = await request.json();
    const { reportType, period, format, includeCharts, includeNotes } =
      formData;

    // Format the period for display
    let formattedPeriod = "";
    if (period === "current-month") {
      formattedPeriod = new Date().toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    } else if (period === "previous-month") {
      const prevMonth = new Date();
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      formattedPeriod = prevMonth.toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
    } else if (period === "current-quarter") {
      const currentMonth = new Date().getMonth();
      const quarter = Math.floor(currentMonth / 3) + 1;
      formattedPeriod = `Q${quarter} ${new Date().getFullYear()}`;
    } else if (period === "year-to-date") {
      formattedPeriod = `YTD ${new Date().getFullYear()}`;
    } else {
      formattedPeriod = period;
    }

    // Format the report name
    const reportName = `${reportType
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}`;

    // Create the report in the database
    const { data: newReport, error } = await supabase
      .from("financial_reports")
      .insert({
        user_id: user.id,
        name: reportName,
        description: `Generated ${reportName} report for ${formattedPeriod}`,
        period: formattedPeriod,
        report_type: reportType,
        format: format,
        include_charts: includeCharts,
        include_notes: includeNotes,
      })
      .select()
      .single();

    if (error) throw error;

    // Format the report for the response
    const report = {
      id: newReport.id,
      name: newReport.name,
      description: newReport.description,
      period: newReport.period,
      type: newReport.report_type,
      format: newReport.format,
      includeCharts: newReport.include_charts,
      includeNotes: newReport.include_notes,
      createdAt: new Date(newReport.created_at).toISOString().split("T")[0],
      downloadUrl: `/api/financial-reports/download/${newReport.id}`,
    };

    return NextResponse.json({ report }, { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to generate report" },
      { status: 500 },
    );
  }
}
