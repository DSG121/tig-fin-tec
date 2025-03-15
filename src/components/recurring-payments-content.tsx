"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import EditRecurringPaymentDialog from "@/components/edit-recurring-payment-dialog";
import DeleteRecurringPaymentDialog from "@/components/delete-recurring-payment-dialog";
import RecurringPaymentFilters from "@/components/recurring-payment-filters";
import { createClient } from "@/utils/utils";

export default function RecurringPaymentsContent() {
  const [filters, setFilters] = useState({ status: "all", frequency: "all" });
  const [recurringPayments, setRecurringPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPayments = async () => {
    try {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("recurring_payments")
        .select("*")
        .order("next_date", { ascending: true });

      if (error) throw error;
      setRecurringPayments(data || []);
    } catch (error) {
      console.error("Error fetching recurring payments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();

    // Set up an interval to refresh data every 10 seconds
    const intervalId = setInterval(() => {
      fetchPayments();
    }, 10000);

    // Clean up the interval when component unmounts
    return () => clearInterval(intervalId);
  }, []);

  const filteredPayments = recurringPayments.filter((payment) => {
    const statusMatch =
      filters.status === "all" ||
      payment.status.toLowerCase() === filters.status;
    const frequencyMatch =
      filters.frequency === "all" ||
      payment.frequency.toLowerCase() === filters.frequency;
    return statusMatch && frequencyMatch;
  });

  const monthlyTotal = recurringPayments
    .filter((payment) => payment.status === "Active")
    .reduce((sum, payment) => {
      if (payment.frequency === "Monthly") return sum + payment.amount;
      if (payment.frequency === "Bi-weekly") return sum + payment.amount * 2.17;
      if (payment.frequency === "Quarterly") return sum + payment.amount / 3;
      if (payment.frequency === "Annually") return sum + payment.amount / 12;
      return sum;
    }, 0);

  const today = new Date();
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 7);

  const upcomingPayments = recurringPayments
    .filter((payment) => {
      const paymentDate = new Date(payment.next_date);
      return (
        payment.status === "Active" &&
        paymentDate <= nextWeek &&
        paymentDate >= today
      );
    })
    .sort(
      (a, b) =>
        new Date(a.next_date).getTime() - new Date(b.next_date).getTime(),
    );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Monthly Total</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">
              ${monthlyTotal.toFixed(2)}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Active recurring payments
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Active Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">
              {recurringPayments.filter((p) => p.status === "Active").length}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              {recurringPayments.filter((p) => p.status === "Paused").length}{" "}
              paused
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Due This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-orange-600">
              {upcomingPayments.length}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              $
              {upcomingPayments
                .reduce((sum, p) => sum + p.amount, 0)
                .toFixed(2)}{" "}
              total
            </p>
          </CardContent>
        </Card>
      </div>

      {upcomingPayments.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments (Next 7 Days)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex justify-between items-center p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div className="bg-orange-100 p-3 rounded-full">
                      <Calendar className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">{payment.name}</h3>
                      <p className="text-sm text-gray-500">
                        {payment.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <p className="font-bold">${payment.amount.toFixed(2)}</p>
                    <p className="text-sm text-gray-500">
                      Due: {payment.next_date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>All Recurring Payments</CardTitle>
          <RecurringPaymentFilters onFilterChange={setFilters} />
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Frequency
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Next Date
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
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium">{payment.name}</td>
                    <td className="py-3 px-4">{payment.category}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-gray-400" />
                        {payment.frequency}
                      </div>
                    </td>
                    <td className="py-3 px-4">{payment.next_date}</td>
                    <td className="py-3 px-4 text-right">
                      ${payment.amount.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${payment.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {payment.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex justify-center gap-2">
                        <EditRecurringPaymentDialog payment={payment} />
                        <DeleteRecurringPaymentDialog
                          paymentId={payment.id}
                          paymentName={payment.name}
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
    </>
  );
}
