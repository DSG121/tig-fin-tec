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

    // In a real application, this would generate an actual report
    // For now, we'll just return a success message with the report details

    const reportId = `rep-${Date.now().toString().substring(7)}`;
    const reportName = `${reportType
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")}`;

    const report = {
      id: reportId,
      name: reportName,
      description: `Generated ${reportName} report for ${period}`,
      period: period,
      type: reportType,
      format: format,
      includeCharts: includeCharts,
      includeNotes: includeNotes,
      createdAt: new Date().toISOString().split("T")[0],
      downloadUrl: `/api/financial-reports/download/${reportId}`,
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
