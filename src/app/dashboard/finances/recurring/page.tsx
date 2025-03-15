import DashboardNavbar from "@/components/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import AddRecurringPaymentDialog from "@/components/add-recurring-payment-dialog";
import EditRecurringPaymentDialog from "@/components/edit-recurring-payment-dialog";
import DeleteRecurringPaymentDialog from "@/components/delete-recurring-payment-dialog";
import RecurringPaymentsContent from "@/components/recurring-payments-content";

export default function RecurringPaymentsPage() {
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
                <h1 className="text-3xl font-bold">Recurring Payments</h1>
              </div>
              <AddRecurringPaymentDialog />
            </div>
          </header>
          <RecurringPaymentsContent />
        </div>
      </main>
    </>
  );
}
