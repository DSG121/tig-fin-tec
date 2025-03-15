"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ClientSearchForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(searchParams.get("q") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "All");
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "name");

  // Debounce search to avoid too many requests
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateSearchParams();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, status, sortBy]);

  const updateSearchParams = () => {
    const params = new URLSearchParams();

    if (searchQuery) params.set("q", searchQuery);
    if (status !== "All") params.set("status", status);
    if (sortBy !== "name") params.set("sortBy", sortBy);

    router.replace(`${pathname}?${params.toString()}`);
    router.refresh();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search clients..."
          className="pl-10 w-full"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex gap-2">
        <select
          className="px-4 py-2 rounded-md border border-gray-200 text-sm"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="All">All Clients</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          className="px-4 py-2 rounded-md border border-gray-200 text-sm"
          value={sortBy}
          onChange={handleSortChange}
        >
          <option value="name">Sort by Name</option>
          <option value="created_at">Sort by Date Added</option>
          <option value="updated_at">Sort by Last Activity</option>
        </select>
      </div>
    </div>
  );
}
