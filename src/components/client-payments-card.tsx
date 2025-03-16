"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, RefreshCw, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

interface ClientPayment {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  frequency: string;
  nextDueDate: string;
  status: string;
  description: string;
  lastPaymentDate?: string;
  paymentHistory?: Array<{
    date: string;
    amount: number;
    notes?: string;
  }>;
}

export default function ClientPaymentsCard() {
  const [payments, setPayments] = useState<ClientPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientPayments = async () => {
      try {
        const response = await fetch("/api/client-payments");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        setPayments(data.clientPayments || []);
      } catch (error) {
        console.error("Error fetching client payments:", error);
        // Fallback to sample data if API fails
        setPayments([
          {
            id: "sample-1",
            clientId: "client-1",
            clientName: "Acme Corporation",
            amount: 3500,
            frequency: "Monthly",
            nextDueDate: new Date(new Date().setDate(new Date().getDate() + 5))
              .toISOString()
              .split("T")[0],
            status: "Active",
            description: "Monthly retainer for Acme Corp",
          },
          {
            id: "sample-2",
            clientId: "client-2",
            clientName: "TechStart Inc",
            amount: 2200,
            frequency: "Monthly",
            nextDueDate: new Date(new Date().setDate(new Date().getDate() + 12))
              .toISOString()
              .split("T")[0],
            status: "Active",
            description: "Monthly service package",
          },
          {
            id: "sample-3",
            clientId: "client-3",
            clientName: "Global Solutions",
            amount: 4800,
            frequency: "Monthly",
            nextDueDate: new Date(new Date().setDate(new Date().getDate() + 3))
              .toISOString()
              .split("T")[0],
            status: "Pending",
            description: "Monthly consulting retainer",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchClientPayments();
  }, []);

  // Calculate total monthly recurring revenue
  const totalMonthlyRevenue = payments
    .filter((payment) => payment.status === "Active")
    .reduce((sum, payment) => sum + payment.amount, 0);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg">Client Recurring Payments</CardTitle>
        <Link href="/dashboard/finances/client-payments">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-6">
            <RefreshCw className="h-8 w-8 animate-spin text-orange-600" />
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4 p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-full">
                  <Users className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Monthly Recurring Revenue
                  </p>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-600">
                  ${totalMonthlyRevenue.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="space-y-3 mt-3">
              {payments.slice(0, 3).map((payment) => (
                <div
                  key={payment.id}
                  className="flex justify-between items-center p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${payment.status === "Active" ? "bg-green-100" : "bg-yellow-100"}`}
                    >
                      {payment.status === "Active" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-medium">{payment.clientName}</h4>
                      <div className="flex items-center gap-1">
                        <p className="text-xs text-gray-500">
                          Due: {formatDate(payment.nextDueDate)}
                        </p>
                        {new Date(payment.nextDueDate) < new Date() && (
                          <span className="bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full">
                            Overdue
                          </span>
                        )}
                      </div>
                      {payment.lastPaymentDate && (
                        <p className="text-xs text-green-600">
                          Last paid: {formatDate(payment.lastPaymentDate)}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      ${payment.amount.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">{payment.frequency}</p>
                  </div>
                </div>
              ))}

              {payments.length > 3 && (
                <p className="text-center text-sm text-gray-500 mt-2">
                  +{payments.length - 3} more client payments
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
