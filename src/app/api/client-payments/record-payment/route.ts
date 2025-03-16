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
    const { paymentId, amount, notes } = await request.json();

    // First check if the payment exists and belongs to the user
    const { data: existingPayment, error: fetchError } = await supabase
      .from("client_payments")
      .select("*")
      .eq("id", paymentId)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !existingPayment) {
      return NextResponse.json(
        { error: "Payment not found or unauthorized" },
        { status: 404 },
      );
    }

    // Create payment record
    const paymentRecord = {
      date: new Date().toISOString(),
      amount: parseFloat(amount),
      notes: notes || "",
    };

    // Update payment history
    const paymentHistory = [
      ...(existingPayment.payment_history || []),
      paymentRecord,
    ];

    // Update the payment record
    const { data, error } = await supabase
      .from("client_payments")
      .update({
        last_payment_date: new Date().toISOString(),
        payment_history: paymentHistory,
        updated_at: new Date().toISOString(),
      })
      .eq("id", paymentId)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ payment: data[0] });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to record payment" },
      { status: 500 },
    );
  }
}
