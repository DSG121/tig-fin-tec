import DashboardNavbar from "@/components/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Filter, Plus, Search } from "lucide-react";
import Link from "next/link";
import AddExpenseDialog from "@/components/add-expense-dialog";

export default async function ExpensesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get expenses from the database
  const { data: expenses = [] } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", user.id)
    .order("date", { ascending: false });

  // If no expenses found, use sample data
  if (expenses.length === 0) {
    expenses.push(
      {
        id: "exp-001",
        date: "2023-07-15",
        category: "Office Supplies",
        description: "Printer paper and ink cartridges",
        amount: 120.5,
        status: "Paid",
      },
      {
        id: "exp-002",
        date: "2023-07-12",
        category: "Software",
        description: "Monthly subscription to design software",
        amount: 49.99,
        status: "Paid",
      },
      {
        id: "exp-003",
        date: "2023-07-10",
        category: "Marketing",
        description: "Social media advertising campaign",
        amount: 750.0,
        status: "Paid",
      },
      {
        id: "exp-004",
        date: "2023-07-05",
        category: "Travel",
        description: "Client meeting - airfare and hotel",
        amount: 1250.75,
        status: "Pending",
      },
      {
        id: "exp-005",
        date: "2023-07-01",
        category: "Utilities",
        description: "Office electricity and internet",
        amount: 310.25,
        status: "Paid",
      },
    );
  }

  // Calculate total expenses
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );

  // Get expense categories for summary
  const categories = {};
  expenses.forEach((expense) => {
    if (categories[expense.category]) {
      categories[expense.category] += expense.amount;
    } else {
      categories[expense.category] = expense.amount;
    }
  });

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Link href="/dashboard/finances">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold">Expense Management</h1>
              </div>
              <AddExpenseDialog />
            </div>
          </header>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-600">
                  ${totalExpenses.toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">Current month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Largest Category</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-600">
                  {Object.entries(categories).sort((a, b) => b[1] - a[1])[0][0]}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  $
                  {Object.entries(categories)
                    .sort((a, b) => b[1] - a[1])[0][1]
                    .toFixed(2)}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Pending Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-orange-600">
                  $
                  {expenses
                    .filter((e) => e.status === "Pending")
                    .reduce((sum, e) => sum + e.amount, 0)
                    .toFixed(2)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {expenses.filter((e) => e.status === "Pending").length} items
                  pending
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <Input placeholder="Search expenses..." className="max-w-xs" />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.keys(categories).map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Expenses Table */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Category
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Description
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">
                        Amount
                      </th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr
                        key={expense.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">{expense.date}</td>
                        <td className="py-3 px-4">{expense.category}</td>
                        <td className="py-3 px-4">{expense.description}</td>
                        <td className="py-3 px-4 text-right">
                          ${expense.amount.toFixed(2)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-block px-2 py-1 rounded-full text-xs ${expense.status === "Paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                          >
                            {expense.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Category Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Expense Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(categories).map(([category, amount]) => (
                  <div
                    key={category}
                    className="flex justify-between items-center p-3 border rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium">{category}</h3>
                      <p className="text-sm text-gray-500">
                        {((amount / totalExpenses) * 100).toFixed(1)}% of total
                      </p>
                    </div>
                    <p className="text-lg font-bold">${amount.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
