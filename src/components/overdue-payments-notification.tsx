"use client";

import { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

interface ClientPayment {
  id: string;
  client_id: string;
  amount: number;
  frequency: string;
  next_due_date: string;
  status: string;
  clients: {
    name: string;
    email: string;
  };
}

export default function OverduePaymentsNotification() {
  const [overduePayments, setOverduePayments] = useState<ClientPayment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClientPayments = async () => {
      try {
        const response = await fetch("/api/client-payments");
        if (!response.ok) throw new Error("Failed to fetch data");

        const data = await response.json();
        const today = new Date();

        // Filter for overdue payments
        const overdue = data.clientPayments.filter((payment: ClientPayment) => {
          const dueDate = new Date(payment.next_due_date);
          return dueDate < today && payment.status === "Active";
        });

        setOverduePayments(overdue);
      } catch (error) {
        console.error("Error fetching client payments:", error);
        setOverduePayments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClientPayments();
  }, []);

  if (loading || overduePayments.length === 0) return null;

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Overdue Payments</AlertTitle>
      <AlertDescription>
        You have {overduePayments.length} overdue client payment
        {overduePayments.length !== 1 ? "s" : ""}.
        <Link
          href="/dashboard/finances/client-payments"
          className="font-medium underline"
        >
          View and manage them now
        </Link>
        .
      </AlertDescription>
    </Alert>
  );
}
