import DashboardNavbar from "@/components/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Users, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddClientPaymentDialog from "@/components/add-client-payment-dialog";
import EditClientPaymentDialog from "@/components/edit-client-payment-dialog";
import DeleteClientPaymentDialog from "@/components/delete-client-payment-dialog";
import PaymentHistoryDialog from "@/components/payment-history-dialog";
import RecordPaymentDialog from "@/components/record-payment-dialog";

export default async function ClientPaymentsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Fetch clients for the user
  const { data: clients } = await supabase
    .from("clients")
    .select("*")
    .eq("user_id", user.id);

  // Fetch client payments for the user
  const { data: clientPayments } = await supabase
    .from("client_payments")
    .select("*, clients(name, email)")
    .eq("user_id", user.id)
    .order("next_due_date", { ascending: true });

  // Calculate monthly revenue from active payments
  const monthlyRevenue =
    clientPayments
      ?.filter((payment) => payment.status === "Active")
      .reduce((total, payment) => {
        // Adjust amount based on frequency
        let monthlyAmount = payment.amount;
        if (payment.frequency === "Weekly") monthlyAmount = payment.amount * 4;
        if (payment.frequency === "Bi-weekly")
          monthlyAmount = payment.amount * 2;
        if (payment.frequency === "Quarterly")
          monthlyAmount = payment.amount / 3;
        if (payment.frequency === "Annually")
          monthlyAmount = payment.amount / 12;
        return total + monthlyAmount;
      }, 0) || 0;

  // Count payments due this week
  const today = new Date();
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);

  const dueThisWeek =
    clientPayments?.filter((payment) => {
      const dueDate = new Date(payment.next_due_date);
      return (
        dueDate >= today && dueDate <= nextWeek && payment.status === "Active"
      );
    }) || [];

  const dueThisWeekTotal = dueThisWeek.reduce(
    (total, payment) => total + payment.amount,
    0,
  );

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          <header className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Link href="/dashboard/finances">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold">Client Payments</h1>
              </div>
              <AddClientPaymentDialog />
            </div>
          </header>

          {/* Client Payments Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Monthly Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-600">
                  ${monthlyRevenue.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  From active client payments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Clients</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-600">
                  {clients?.length || 0}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  With recurring payments
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Due This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-600">
                  {dueThisWeek.length}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  ${dueThisWeekTotal.toFixed(2)} total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Overdue Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-red-600">
                  {clientPayments?.filter((payment) => {
                    const dueDate = new Date(payment.next_due_date);
                    return dueDate < today && payment.status === "Active";
                  }).length || 0}
                </p>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3 text-red-500" />
                  Requires attention
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Client Payments Tabs */}
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="all">All Payments</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Client Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-600">
                            Client
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">
                            Frequency
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">
                            Next Due Date
                          </th>
                          <th className="text-right py-3 px-4 font-medium text-gray-600">
                            Amount
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
                            Status
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientPayments
                          ?.filter((payment) => payment.status === "Active")
                          .map((payment) => (
                            <tr
                              key={payment.id}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="bg-orange-100 p-2 rounded-full">
                                    <Users className="h-4 w-4 text-orange-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {payment.clients?.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {payment.clients?.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-400">
                                    {payment.frequency}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                {new Date(
                                  payment.next_due_date,
                                ).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4 text-right">
                                ${payment.amount.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="inline-block px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                                  {payment.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex justify-center gap-2">
                                  <EditClientPaymentDialog payment={payment} />
                                  <DeleteClientPaymentDialog
                                    paymentId={payment.id}
                                    clientName={
                                      payment.clients?.name || "this client"
                                    }
                                  />
                                  <PaymentHistoryDialog
                                    paymentId={payment.id}
                                    clientName={
                                      payment.clients?.name || "this client"
                                    }
                                    paymentHistory={
                                      payment.payment_history || []
                                    }
                                  />
                                  <RecordPaymentDialog
                                    paymentId={payment.id}
                                    clientName={
                                      payment.clients?.name || "this client"
                                    }
                                    amount={payment.amount}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="pending" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Client Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-600">
                            Client
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">
                            Frequency
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">
                            Next Due Date
                          </th>
                          <th className="text-right py-3 px-4 font-medium text-gray-600">
                            Amount
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
                            Status
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientPayments
                          ?.filter((payment) => payment.status === "Pending")
                          .map((payment) => (
                            <tr
                              key={`pending-${payment.id}`}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="bg-orange-100 p-2 rounded-full">
                                    <Users className="h-4 w-4 text-orange-600" />
                                  </div>
                                  <div>
                                    <p className="font-medium">
                                      {payment.clients?.name}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {payment.clients?.email}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-1">
                                  <span className="text-gray-400">
                                    {payment.frequency}
                                  </span>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                {new Date(
                                  payment.next_due_date,
                                ).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4 text-right">
                                ${payment.amount.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-center">
                                <span className="inline-block px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                                  {payment.status}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <div className="flex justify-center gap-2">
                                  <EditClientPaymentDialog payment={payment} />
                                  <DeleteClientPaymentDialog
                                    paymentId={payment.id}
                                    clientName={
                                      payment.clients?.name || "this client"
                                    }
                                  />
                                  <PaymentHistoryDialog
                                    paymentId={payment.id}
                                    clientName={
                                      payment.clients?.name || "this client"
                                    }
                                    paymentHistory={
                                      payment.payment_history || []
                                    }
                                  />
                                  <RecordPaymentDialog
                                    paymentId={payment.id}
                                    clientName={
                                      payment.clients?.name || "this client"
                                    }
                                    amount={payment.amount}
                                  />
                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="all" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>All Client Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-600">
                            Client
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">
                            Frequency
                          </th>
                          <th className="text-left py-3 px-4 font-medium text-gray-600">
                            Next Due Date
                          </th>
                          <th className="text-right py-3 px-4 font-medium text-gray-600">
                            Amount
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
                            Status
                          </th>
                          <th className="text-center py-3 px-4 font-medium text-gray-600">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientPayments?.map((payment) => (
                          <tr
                            key={`all-${payment.id}`}
                            className="border-b border-gray-100 hover:bg-gray-50"
                          >
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className="bg-orange-100 p-2 rounded-full">
                                  <Users className="h-4 w-4 text-orange-600" />
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {payment.clients?.name}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {payment.clients?.email}
                                  </p>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-1">
                                <span className="text-gray-400">
                                  {payment.frequency}
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-4">
                              {new Date(
                                payment.next_due_date,
                              ).toLocaleDateString()}
                            </td>
                            <td className="py-3 px-4 text-right">
                              ${payment.amount.toFixed(2)}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span
                                className={`inline-block px-2 py-1 rounded-full text-xs ${payment.status === "Pending" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}`}
                              >
                                {payment.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex justify-center gap-2">
                                <EditClientPaymentDialog payment={payment} />
                                <DeleteClientPaymentDialog
                                  paymentId={payment.id}
                                  clientName={
                                    payment.clients?.name || "this client"
                                  }
                                />
                                <PaymentHistoryDialog
                                  paymentId={payment.id}
                                  clientName={
                                    payment.clients?.name || "this client"
                                  }
                                  paymentHistory={payment.payment_history || []}
                                />
                                <RecordPaymentDialog
                                  paymentId={payment.id}
                                  clientName={
                                    payment.clients?.name || "this client"
                                  }
                                  amount={payment.amount}
                                />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
}
