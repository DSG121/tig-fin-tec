import { createClient } from "../../../../../supabase/server";
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
    // Get specific client payment
    const { data, error } = await supabase
      .from("client_payments")
      .select("*, clients(name, email)")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single();

    if (error) throw error;

    if (!data) {
      return NextResponse.json({ error: "Payment not found" }, { status: 404 });
    }

    return NextResponse.json({ payment: data });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to fetch client payment" },
      { status: 500 },
    );
  }
}

export async function PATCH(
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
    const formData = await request.json();

    // First check if the payment exists and belongs to the user
    const { data: existingPayment, error: fetchError } = await supabase
      .from("client_payments")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !existingPayment) {
      return NextResponse.json(
        { error: "Payment not found or unauthorized" },
        { status: 404 },
      );
    }

    // Handle payment recording if requested
    let paymentHistory = existingPayment.payment_history || [];
    let lastPaymentDate = existingPayment.last_payment_date;

    if (formData.recordPayment) {
      const paymentRecord = {
        date: new Date().toISOString(),
        amount: parseFloat(formData.amount),
        notes: formData.paymentNotes || "",
      };

      paymentHistory = [...paymentHistory, paymentRecord];
      lastPaymentDate = new Date().toISOString();
    }

    // Update the payment
    const { data, error } = await supabase
      .from("client_payments")
      .update({
        client_id: formData.clientId,
        amount: parseFloat(formData.amount),
        frequency: formData.frequency,
        next_due_date: formData.nextDueDate,
        status: formData.status,
        description: formData.description,
        auto_renew: formData.autoRenew,
        updated_at: new Date().toISOString(),
        last_payment_date: lastPaymentDate,
        payment_history: paymentHistory,
      })
      .eq("id", params.id)
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ payment: data[0] });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to update client payment" },
      { status: 500 },
    );
  }
}

export async function DELETE(
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
    // First check if the payment exists and belongs to the user
    const { data: existingPayment, error: fetchError } = await supabase
      .from("client_payments")
      .select("*")
      .eq("id", params.id)
      .eq("user_id", user.id)
      .single();

    if (fetchError || !existingPayment) {
      return NextResponse.json(
        { error: "Payment not found or unauthorized" },
        { status: 404 },
      );
    }

    // Delete the payment
    const { error } = await supabase
      .from("client_payments")
      .delete()
      .eq("id", params.id);

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to delete client payment" },
      { status: 500 },
    );
  }
}
