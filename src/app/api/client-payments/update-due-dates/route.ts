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
    // Get all auto-renew payments that are due
    const today = new Date().toISOString().split("T")[0];

    const { data: duePayments, error: fetchError } = await supabase
      .from("client_payments")
      .select("*")
      .eq("user_id", user.id)
      .eq("auto_renew", true)
      .eq("status", "Active")
      .lte("next_due_date", today);

    if (fetchError) throw fetchError;

    if (!duePayments || duePayments.length === 0) {
      return NextResponse.json({ message: "No payments to update" });
    }

    // Update each payment with a new due date
    const updates = duePayments.map((payment) => {
      const dueDate = new Date(payment.next_due_date);
      let newDueDate = new Date(dueDate);

      // Calculate next due date based on frequency
      switch (payment.frequency) {
        case "Weekly":
          newDueDate.setDate(dueDate.getDate() + 7);
          break;
        case "Bi-weekly":
          newDueDate.setDate(dueDate.getDate() + 14);
          break;
        case "Monthly":
          newDueDate.setMonth(dueDate.getMonth() + 1);
          break;
        case "Quarterly":
          newDueDate.setMonth(dueDate.getMonth() + 3);
          break;
        case "Annually":
          newDueDate.setFullYear(dueDate.getFullYear() + 1);
          break;
        default:
          newDueDate.setMonth(dueDate.getMonth() + 1);
      }

      return supabase
        .from("client_payments")
        .update({
          next_due_date: newDueDate.toISOString().split("T")[0],
          updated_at: new Date().toISOString(),
        })
        .eq("id", payment.id);
    });

    // Execute all updates
    await Promise.all(updates);

    return NextResponse.json({
      success: true,
      message: `Updated ${duePayments.length} payments with new due dates`,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to update payment due dates" },
      { status: 500 },
    );
  }
}
