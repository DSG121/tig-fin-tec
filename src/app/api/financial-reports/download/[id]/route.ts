import { createClient } from "../../../../../../supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const reportId = params.id;

    // Check if the report exists and belongs to the user
    const { data: report, error } = await supabase
      .from("financial_reports")
      .select("*")
      .eq("id", reportId)
      .eq("user_id", user.id)
      .single();

    if (error) throw error;

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    // In a real application, this would generate and return the actual report file
    // For now, we'll just return a JSON response indicating success

    return NextResponse.json({
      success: true,
      report: {
        id: report.id,
        name: report.name,
        format: report.format,
        message: `Report ${report.name} would be downloaded here in a real application`,
      },
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to download report" },
      { status: 500 },
    );
  }
}
