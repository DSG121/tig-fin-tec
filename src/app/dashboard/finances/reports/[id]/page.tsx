"use client";

import { useState, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, Printer, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";

export default function ReportDetailPage({ params }) {
  const [loading, setLoading] = useState(true);
  const [report, setReport] = useState(null);
  const { toast } = useToast();
  const reportId = params.id;

  useEffect(() => {
    // In a real app, this would fetch the specific report details
    // For now, we'll simulate it with a timeout
    const timer = setTimeout(() => {
      // Sample report data
      setReport({
        id: reportId,
        name: "Monthly Profit & Loss",
        description:
          "Detailed breakdown of revenue and expenses for the current month",
        period: `${new Date().toLocaleString("default", { month: "long" })} ${new Date().getFullYear()}`,
        type: "Profit & Loss",
        createdAt: new Date().toISOString().split("T")[0],
        data: {
          revenue: {
            total: 24780,
            breakdown: [
              { category: "Client Services", amount: 18500 },
              { category: "Product Sales", amount: 4280 },
              { category: "Consulting", amount: 2000 },
            ],
          },
          expenses: {
            total: 16230,
            breakdown: [
              { category: "Salaries", amount: 8500 },
              { category: "Rent", amount: 2200 },
              { category: "Software", amount: 1350 },
              { category: "Utilities", amount: 680 },
              { category: "Marketing", amount: 1500 },
              { category: "Other", amount: 2000 },
            ],
          },
          profit: 8550,
          profitMargin: 34.5,
        },
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [reportId]);

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your report download has started",
    });
  };

  const handlePrint = () => {
    toast({
      title: "Print Requested",
      description:
        "Print functionality would be implemented in a production environment",
    });
  };

  if (loading) {
    return (
      <>
        <DashboardNavbar />
        <main className="w-full bg-gray-50 min-h-screen">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
            <div className="flex justify-center py-16">
              <RefreshCw className="h-12 w-12 animate-spin text-orange-600" />
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Link href="/dashboard/finances/reports">
                  <Button variant="ghost" size="icon">
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <h1 className="text-3xl font-bold">{report.name}</h1>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={handlePrint}>
                  <Printer className="h-4 w-4 mr-2" /> Print
                </Button>
                <Button
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={handleDownload}
                >
                  <Download className="h-4 w-4 mr-2" /> Download
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-500">Period: {report.period}</span>
              <span className="text-gray-500">
                Generated: {report.createdAt}
              </span>
            </div>
          </header>

          {/* Report Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Total Revenue</span>
                  <span className="text-2xl font-bold text-orange-600">
                    ${report.data.revenue.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Total Expenses</span>
                  <span className="text-2xl font-bold text-red-600">
                    ${report.data.expenses.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500">Net Profit</span>
                  <span className="text-2xl font-bold text-green-600">
                    ${report.data.profit.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-500">Profit Margin</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: `${report.data.profitMargin}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {report.data.profitMargin}%
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Category
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">
                        Amount
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">
                        % of Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.data.revenue.breakdown.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4">{item.category}</td>
                        <td className="py-3 px-4 text-right">
                          ${item.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {(
                            (item.amount / report.data.revenue.total) *
                            100
                          ).toFixed(1)}
                          %
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-medium">
                      <td className="py-3 px-4">Total Revenue</td>
                      <td className="py-3 px-4 text-right">
                        ${report.data.revenue.total.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Expenses Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Expenses Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">
                        Category
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">
                        Amount
                      </th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">
                        % of Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.data.expenses.breakdown.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100">
                        <td className="py-3 px-4">{item.category}</td>
                        <td className="py-3 px-4 text-right">
                          ${item.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {(
                            (item.amount / report.data.expenses.total) *
                            100
                          ).toFixed(1)}
                          %
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-gray-50 font-medium">
                      <td className="py-3 px-4">Total Expenses</td>
                      <td className="py-3 px-4 text-right">
                        ${report.data.expenses.total.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Notes Section */}
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                This report provides a detailed breakdown of revenue and
                expenses for {report.period}. The profit margin of{" "}
                {report.data.profitMargin}% indicates a healthy financial
                position.
              </p>
              <p className="text-gray-600 mt-4">Key observations:</p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-600">
                <li>
                  Client Services continues to be the primary revenue source
                </li>
                <li>Salaries represent the largest expense category</li>
                <li>
                  Consider reviewing software expenses for potential cost
                  optimization
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
