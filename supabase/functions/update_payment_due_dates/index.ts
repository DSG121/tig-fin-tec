import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

Deno.serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers":
          "authorization, x-client-info, apikey, content-type",
      },
    });
  }

  try {
    // Create a Supabase client with the Auth context of the function
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase API ANON KEY - env var exported by default.
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    // Get today's date
    const today = new Date().toISOString().split("T")[0];

    // Get all auto-renew payments that are due
    const { data: duePayments, error: fetchError } = await supabaseClient
      .from("client_payments")
      .select("*")
      .eq("auto_renew", true)
      .eq("status", "Active")
      .lte("next_due_date", today);

    if (fetchError) throw fetchError;

    if (!duePayments || duePayments.length === 0) {
      return new Response(
        JSON.stringify({ message: "No payments to update" }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        },
      );
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

      return supabaseClient
        .from("client_payments")
        .update({
          next_due_date: newDueDate.toISOString().split("T")[0],
          updated_at: new Date().toISOString(),
        })
        .eq("id", payment.id);
    });

    // Execute all updates
    await Promise.all(updates);

    return new Response(
      JSON.stringify({
        success: true,
        message: `Updated ${duePayments.length} payments with new due dates`,
        updatedPayments: duePayments.length,
      }),
      {
        headers: { "Content-Type": "application/json" },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { "Content-Type": "application/json" },
      status: 400,
    });
  }
});
