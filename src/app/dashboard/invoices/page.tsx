import DashboardNavbar from "@/components/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowDown,
  ArrowUp,
  ChevronDown,
  Clock,
  DollarSign,
  Download,
  FileText,
  Filter,
  Plus,
  Printer,
  Search,
  Send,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function InvoicesDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // This would typically come from a database query
  const invoices = [
    {
      id: "INV-001",
      client: "ABC Corporation",
      amount: 1200.00,
      date: "2023-07-15",
      dueDate: "2023-08-15",
      status: "paid",
      items: [
        { description: "Website Design", quantity: 1, rate: 800, amount: 800 },
        { description: "Content Creation", quantity: 4, rate: 100, amount: 400 },
      ],
    },
    {
      id: "INV-002",
      client: "XYZ Enterprises",
      amount: 3500.00,
      date: "2023-07-20",
      dueDate: "2023-08-20",
      status: "pending",
      items: [
        { description: "Mobile App Development", quantity: 1, rate: 3500, amount: 3500 },
      ],
    },
    {
      id: "INV-003",
      client: "Tech Solutions Inc",
      amount: 750.00,
      date: "2023-07-25",
      dueDate: "2023-08-25",
      status: "pending",
      items: [
        { description: "SEO Services", quantity: 1, rate: 500, amount: 500 },
        { description: "Social Media Setup", quantity: 1, rate: 250, amount: 250 },
      ],
    },
    {
      id: "INV-004",
      client: "Global Retail Group",
      amount: 2000.00,
      date: "2023-06-15",
      dueDate: "2023-07-15",
      status: "overdue",
      items: [
        { description: "E-commerce Integration", quantity: 1, rate: 2000, amount: 2000 },
      ],
    },
    {
      id: "INV-005",
      client: "Startup Innovations",
      amount: 1500.00,
      date: "2023-07-01",
      dueDate: "2023-08-01",
      status: "paid",
      items: [
        { description: "Branding Package", quantity: 1, rate: 1000, amount: 1000 },
        { description: "Logo Design", quantity: 1, rate: 500, amount: 500 },
      ],
    },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate totals
  const totalInvoiced = invoices.reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPaid = invoices
    .filter((invoice) => invoice.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalPending = invoices
    .filter((invoice) => invoice.status === "pending")
    .reduce((sum, invoice) => sum + invoice.amount, 0);
  const totalOverdue = invoices
    .filter((invoice) => invoice.status === "overdue")
    .reduce((sum, invoice) => sum + invoice.amount, 0);

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Invoices</h1>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Plus className="h-4 w-4 mr-2" /> Create Invoice
              </Button>
            </div>
            <div className="bg-orange-50 text-sm p-3 px-4 rounded-lg text-orange-800 border border-orange-200 flex gap-2 items-center">
              <FileText size="14" />
              <span>Manage your invoices, track payments, and send reminders</span>
            </div>
          </header>

          {/* Invoice Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Invoiced</p>
                    <h3 className="text-2xl font-bold mt-1">${totalInvoiced.toFixed(2)}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Paid</p>
                    <h3 className="text-2xl font-bold mt-1">${totalPaid.toFixed(2)}</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <ArrowDown className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending</p>
                    <h3 className="text-2xl font-bold mt-1">${totalPending.toFixed(2)}</h3>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Overdue</p>
                    <h3 className="text-2xl font-bold mt-1">${totalOverdue.toFixed(2)}</h3>
                  </div>
                  <div className="bg-red-100 p-3 rounded-full">
                    <ArrowUp className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search invoices..." className="pl-10 w-full" />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white">
                    <Filter className="h-4 w-4 mr-2" /> Filter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Invoices</DropdownMenuItem>
                  <DropdownMenuItem>Paid</DropdownMenuItem>
                  <DropdownMenuItem>Pending</DropdownMenuItem>
                  <DropdownMenuItem>Overdue</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white">
                    <ChevronDown className="h-4 w-4 mr-2" /> Sort By
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Date (Newest)</DropdownMenuItem>
                  <DropdownMenuItem>Date (Oldest)</DropdownMenuItem>
                  <DropdownMenuItem>Amount (High to Low)</DropdownMenuItem>
                  <DropdownMenuItem>Amount (Low to High)</DropdownMenuItem>
                  <DropdownMenuItem>Client Name</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Invoices List */}
          <Card>
            <CardHeader>
              <CardTitle>All Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-sm">Invoice #</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Client</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Due Date</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium">{invoice.id}</td>
                        <td className="py-3 px-4">{invoice.client}</td>
                        <td className="py-3 px-4">${invoice.amount.toFixed(2)}</td>
                        <td className="py-3 px-4">{formatDate(invoice.date)}</td>
                        <td className="py-3 px-4">{formatDate(invoice.dueDate)}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}
                          >
                            {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Send className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Printer className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Invoice Templates */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Standard Invoice",
                    description: "Basic invoice template for general use",
                    color: "border-blue-200",
                  },
                  {
                    name: "Professional Services",
                    description: "Detailed template for consulting and services",
                    color: "border-green-200",
                  },
                  {
                    name: "Product Sales",
                    description: "Template optimized for product-based businesses",
                    color: "border-orange-200",
                  },
                ].map((template, index) => (
                  <Card key={index} className={`border-2 ${template.color}`}>
                    <CardContent className="p-6">
                      <h3 className="font-medium text-lg mb-2">{template.name}</h3>
                      <p className="text-sm text-gray-500 mb-4">{template.description}</p>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" /> Use Template
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recurring Invoices */}
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Recurring Invoices</CardTitle>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" /> Set Up Recurring
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-sm">Client</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Amount</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Frequency</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Next Date</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        client: "ABC Corporation",
                        amount: 500.00,
                        frequency: "Monthly",
                        nextDate: "2023-08-15",
                        status: "active",
                      },
                      {
                        client: "Tech Solutions Inc",
                        amount: 750.00,
                        frequency: "