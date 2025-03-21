import DashboardNavbar from "@/components/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  DollarSign,
  FileText,
  LineChart,
  PieChart,
  Receipt,
  RefreshCcw,
} from "lucide-react";
import FinancialHealthIndicator from "@/components/financial-health-indicator";
import UpcomingPaymentsWidget from "@/components/upcoming-payments-widget";
import ClientPaymentsCard from "@/components/client-payments-card";
import OverduePaymentsNotification from "@/components/overdue-payments-notification";

export default async function FinancesDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Financial Dashboard</h1>
              <div className="text-sm text-gray-500">
                Welcome, {user.user_metadata?.full_name || user.email}
              </div>
            </div>
            <div className="bg-orange-50 text-sm p-3 px-4 rounded-lg text-orange-800 border border-orange-200 flex gap-2 items-center">
              <BarChart3 size="14" />
              <span>Financial overview for the current month</span>
            </div>
          </header>

          {/* Overdue Payments Notification */}
          <OverduePaymentsNotification />

          {/* Financial Management Modules */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/dashboard/finances/expenses">
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
            </Link>

            <Link href="/dashboard/finances/recurring">
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <RefreshCcw className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Recurring Payments</h3>
                    <p className="text-sm text-gray-500">
                      Manage recurring expenses
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/dashboard/finances/reports">
              <Card className="p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg">Financial Reports</h3>
                    <p className="text-sm text-gray-500">
                      Generate detailed reports
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          </section>

          {/* KPI Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-l-4 border-l-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Monthly Revenue
                  </p>
                  <h3 className="text-2xl font-bold mt-1">$24,780</h3>
                  <p className="text-xs text-green-600 mt-1 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> 12% from last month
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-red-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Monthly Expenses
                  </p>
                  <h3 className="text-2xl font-bold mt-1">$16,230</h3>
                  <p className="text-xs text-red-600 mt-1 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> 8% from last month
                  </p>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Net Profit
                  </p>
                  <h3 className="text-2xl font-bold mt-1">$8,550</h3>
                  <p className="text-xs text-blue-600 mt-1 flex items-center">
                    <ArrowUp className="h-3 w-3 mr-1" /> 5% from last month
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <LineChart className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-purple-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Pending Invoices
                  </p>
                  <h3 className="text-2xl font-bold mt-1">$8,450</h3>
                  <p className="text-xs text-red-600 mt-1">4 overdue</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </Card>
          </section>

          {/* Financial Health Indicator */}
          <FinancialHealthIndicator />

          {/* Financial Health & Upcoming Payments */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <UpcomingPaymentsWidget />
            <ClientPaymentsCard />
          </div>

          {/* Revenue & Expense Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-orange-500 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">Revenue by Category</p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                        <span className="text-sm">Product Sales (45%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Services (30%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Subscriptions (15%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <span className="text-sm">Other (10%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-md">
                  <div className="text-center">
                    <PieChart className="h-16 w-16 text-red-500 mx-auto mb-4 opacity-50" />
                    <p className="text-muted-foreground">
                      Expenses by Category
                    </p>
                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span className="text-sm">Salaries (40%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Operations (25%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        <span className="text-sm">Marketing (20%)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                        <span className="text-sm">Other (15%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Transactions</CardTitle>
              <Link href="/dashboard/finances/expenses">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Payment received",
                    amount: "$1,200.00",
                    client: "ABC Corp",
                    date: "Today",
                    type: "income",
                  },
                  {
                    title: "Software subscription",
                    amount: "$49.99",
                    client: "SaaS Provider",
                    date: "Yesterday",
                    type: "expense",
                  },
                  {
                    title: "Office supplies",
                    amount: "$120.50",
                    client: "Office Depot",
                    date: "Jul 12, 2023",
                    type: "expense",
                  },
                  {
                    title: "Consulting services",
                    amount: "$2,500.00",
                    client: "XYZ Company",
                    date: "Jul 10, 2023",
                    type: "income",
                  },
                  {
                    title: "Marketing campaign",
                    amount: "$750.00",
                    client: "Ad Agency",
                    date: "Jul 5, 2023",
                    type: "expense",
                  },
                ].map((transaction, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${
                          transaction.type === "income"
                            ? "bg-green-100"
                            : "bg-red-100"
                        }`}
                      >
                        {transaction.type === "income" ? (
                          <ArrowUp className="h-4 w-4 text-green-600" />
                        ) : (
                          <ArrowDown className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{transaction.title}</h4>
                        <p className="text-sm text-gray-500">
                          {transaction.client}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`font-medium ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}
                        {transaction.amount}
                      </p>
                      <p className="text-xs text-gray-500">
                        {transaction.date}
                      </p>
                    </div>
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
