"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RecurringPaymentFilters({
  onFilterChange,
}: {
  onFilterChange?: (filters: { status: string; frequency: string }) => void;
}) {
  const [status, setStatus] = useState("all");
  const [frequency, setFrequency] = useState("all");

  const handleStatusChange = (value: string) => {
    setStatus(value);
    onFilterChange?.({ status: value, frequency });
  };

  const handleFrequencyChange = (value: string) => {
    setFrequency(value);
    onFilterChange?.({ status, frequency: value });
  };

  return (
    <div className="flex gap-2">
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="paused">Paused</SelectItem>
        </SelectContent>
      </Select>
      <Select value={frequency} onValueChange={handleFrequencyChange}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Frequency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Frequencies</SelectItem>
          <SelectItem value="monthly">Monthly</SelectItem>
          <SelectItem value="bi-weekly">Bi-weekly</SelectItem>
          <SelectItem value="quarterly">Quarterly</SelectItem>
          <SelectItem value="annually">Annually</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
