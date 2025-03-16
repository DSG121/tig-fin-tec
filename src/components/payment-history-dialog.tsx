"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { History } from "lucide-react";

interface PaymentRecord {
  date: string;
  amount: number;
  notes?: string;
}

interface PaymentHistoryDialogProps {
  paymentId: string;
  clientName: string;
  paymentHistory: PaymentRecord[];
}

export default function PaymentHistoryDialog({
  paymentId,
  clientName,
  paymentHistory = [],
}: PaymentHistoryDialogProps) {
  const [open, setOpen] = useState(false);

  // Format date to be more readable
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="flex gap-1">
          <History className="h-4 w-4" />
          <span>History</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Payment History</DialogTitle>
          <DialogDescription>
            Payment history for {clientName}
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[400px] overflow-y-auto">
          {paymentHistory.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No payment records found
            </div>
          ) : (
            <div className="space-y-4">
              {paymentHistory.map((record, index) => (
                <div
                  key={index}
                  className="border rounded-lg p-4 bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">
                      ${record.amount.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500">
                      {formatDate(record.date)}
                    </span>
                  </div>
                  {record.notes && (
                    <p className="text-sm text-gray-600">{record.notes}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
