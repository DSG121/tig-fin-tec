import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BarChart3,
  Calendar,
  Clock,
  DollarSign,
  Download,
  Edit,
  FileText,
  Filter,
  LineChart,
  PieChart,
  Plus,
  Printer,
  Receipt,
  RefreshCcw,
  Search,
  Trash2,
} from "lucide-react";
import Link from "next/link";

export default function FinanceExpanded() {
  // Sample data for the components
  const expenses = [
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
  ];

  const recurringPayments = [
    {
      id: "rec-001",
      name: "Office Rent",
      amount: 2500.0,
      frequency: "Monthly",
      nextDate: "2023-08-01",
      category: "Rent",
      status: "Active",
    },
    {
      id: "rec-002",
      name: "Software Subscription - Adobe",
      amount: 79.99,
      frequency: "Monthly",
      nextDate: "2023-07-25",
      category: "Software",
      status: "Active",
    },
    {
      id: "rec-003",
      name: "Internet Service",
      amount: 129.99,
      frequency: "Monthly",
      nextDate: "2023-07-28",
      category: "Utilities",
      status: "Active",
    },
  ];

  const reports = [
    {
      id: "rep-001",
      name: "Monthly Profit & Loss",
      description:
        "Detailed breakdown of revenue and expenses for the current month",
      period: "July 2023",
      type: "Profit & Loss",
      createdAt: "2023-07-31",
    },
    {
      id: "rep-002",
      name: "Quarterly Balance Sheet",
      description: "Summary of assets, liabilities, and equity for Q2 2023",
      period: "Q2 2023",
      type: "Balance Sheet",
      createdAt: "2023-07-15",
    },
  ];

  // Calculate totals
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0,
  );
  const monthlyRecurring = recurringPayments.reduce(
    (sum, payment) => sum + payment.amount,
    0,
  );

  return (
    <div className="bg-gray-50 p-8 rounded-lg">
      <h2 className="text-2xl font-bold mb-6">Financial Management Features</h2>

      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-full">
              <Receipt className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Expense Management</h3>
              <p className="text-sm text-gray-500">
                Track and categorize expenses
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <RefreshCcw className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Recurring Payments</h3>
              <p className="text-sm text-gray-500">Manage recurring expenses</p>
            </div>
          </div>
        </Card>

        <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full">
              <FileText className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Financial Reports</h3>
              <p className="text-sm text-gray-500">Generate detailed reports</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Expense Management Preview */}
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-4">Expense Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
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
      </div>

      {/* Recurring Payments Preview */}
      <div className="mb-10">
        <h3 className="text-xl font-bold mb-4">Recurring Payments</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Monthly Total</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-orange-600">
                ${monthlyRecurring.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Active recurring payments
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Active Recurring Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recurringPayments.map((payment) => (
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
                      Due: {payment.nextDate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Reports Preview */}
      <div>
        <h3 className="text-xl font-bold mb-4">Financial Reports</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reports.map((report) => (
            <Card key={report.id} className="overflow-hidden">
              <div className="bg-orange-50 p-4 flex items-center gap-4">
                <div className="bg-orange-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-medium">{report.name}</h3>
                  <p className="text-sm text-gray-500">{report.period}</p>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-gray-600 mb-4">
                  {report.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">
                    Created: {report.createdAt}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Printer className="h-3 w-3 mr-1" /> Print
                    </Button>
                    <Button
                      size="sm"
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      <Download className="h-3 w-3 mr-1" /> Download
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
