"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Payment {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  category: string;
}

export default function UpcomingPaymentsWidget() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUpcomingPayments = async () => {
      try {
        const response = await fetch("/api/financial-reports/summary");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setPayments(data.summary.upcomingPayments || []);
      } catch (error) {
        console.error("Error fetching upcoming payments:", error);
        // Fallback to sample data if API fails
        setPayments([
          {
            id: "sample-1",
            name: "Office Rent",
            amount: 2500,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 3))
              .toISOString()
              .split("T")[0],
            category: "Rent",
          },
          {
            id: "sample-2",
            name: "Software Subscription",
            amount: 79.99,
            dueDate: new Date(new Date().setDate(new Date().getDate() + 5))
              .toISOString()
              .split("T")[0],
            category: "Software",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingPayments();
  }, []);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      // Format as "Jul 15" or similar
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    }
  };

  // Calculate days until due
  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dueDate = new Date(dateString);
    dueDate.setHours(0, 0, 0, 0);

    const diffTime = dueDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upcoming Payments</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6">
            <Clock className="h-8 w-8 animate-spin text-orange-600" />
          </div>
        ) : payments.length > 0 ? (
          <div className="space-y-4">
            {payments.map((payment) => {
              const daysUntil = getDaysUntil(payment.dueDate);
              const isUrgent = daysUntil <= 2;

              return (
                <div
                  key={payment.id}
                  className="flex justify-between items-center p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`${isUrgent ? "bg-red-100" : "bg-orange-100"} p-3 rounded-full`}
                    >
                      <Calendar
                        className={`h-5 w-5 ${isUrgent ? "text-red-600" : "text-orange-600"}`}
                      />
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
                    <p
                      className={`text-sm ${isUrgent ? "text-red-600 font-medium" : "text-gray-500"}`}
                    >
                      Due: {formatDate(payment.dueDate)}
                      {isUrgent && daysUntil === 0
                        ? " (Today)"
                        : isUrgent && daysUntil === 1
                          ? " (Tomorrow)"
                          : isUrgent
                            ? ` (${daysUntil} days)`
                            : ""}
                    </p>
                  </div>
                </div>
              );
            })}
            <Button variant="outline" className="w-full mt-2">
              View All Recurring Payments
            </Button>
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p>No upcoming payments due in the next 7 days</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
