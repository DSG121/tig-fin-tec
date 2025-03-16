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
    // Get client payments for the user
    const { data, error } = await supabase
      .from("client_payments")
      .select("*, clients(name, email)")
      .eq("user_id", user.id)
      .order("next_due_date", { ascending: true });

    if (error) throw error;

    // Format the data for the frontend
    const clientPayments =
      data?.map((payment) => ({
        id: payment.id,
        clientId: payment.client_id,
        clientName: payment.clients?.name || "Unknown Client",
        clientEmail: payment.clients?.email || "",
        amount: payment.amount,
        frequency: payment.frequency,
        nextDueDate: payment.next_due_date,
        status: payment.status,
        description: payment.description,
        lastPaymentDate: payment.last_payment_date,
        paymentHistory: payment.payment_history || [],
      })) || [];

    return NextResponse.json({ clientPayments });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to fetch client payments" },
      { status: 500 },
    );
  }
}

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

    const { data, error } = await supabase
      .from("client_payments")
      .insert([
        {
          user_id: user.id,
          client_id: formData.clientId,
          amount: parseFloat(formData.amount),
          frequency: formData.frequency,
          next_due_date: formData.nextDueDate,
          status: formData.status,
          description: formData.description,
          auto_renew: formData.autoRenew,
          payment_history: [],
          last_payment_date: null,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ payment: data[0] }, { status: 201 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Failed to add client payment" },
      { status: 500 },
    );
  }
}
