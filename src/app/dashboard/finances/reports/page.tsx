"use client";

import { useState, useEffect } from "react";
import DashboardNavbar from "@/components/dashboard-navbar";
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
  ArrowLeft,
  Download,
  FileText,
  Printer,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import FinancialReportCard from "@/components/financial-report-card";

export default function FinancialReportsPage() {
  const [loading, setLoading] = useState(true);
  const [financialMetrics, setFinancialMetrics] = useState({
    revenue: 0,
    expenses: 0,
    profit: 0,
    profitMargin: 0,
    cashOnHand: 0,
    accountsReceivable: 0,
    accountsPayable: 0,
  });
  const [reports, setReports] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reportTypeFilter, setReportTypeFilter] = useState("all");
  const [periodFilter, setPeriodFilter] = useState("all");
  const { toast } = useToast();

  // Form state for generating custom report
  const [customReportForm, setCustomReportForm] = useState({
    reportType: "profit-loss",
    period: "current-month",
    format: "pdf",
    includeCharts: true,
    includeNotes: false,
  });
  const [generatingReport, setGeneratingReport] = useState(false);

  const fetchReportsData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/financial-reports");
      if (!response.ok) {
        throw new Error("Failed to fetch financial reports data");
      }
      const data = await response.json();
      setFinancialMetrics(data.financialMetrics);
      setReports(data.reports);
    } catch (error) {
      console.error("Error fetching financial reports:", error);
      toast({
        title: "Error",
        description: "Failed to load financial reports data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReportsData();
  }, []);

  const handleCustomReportChange = (field, value) => {
    setCustomReportForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerateReport = async () => {
    setGeneratingReport(true);
    try {
      const response = await fetch("/api/financial-reports/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customReportForm),
      });

      if (!response.ok) {
        throw new Error("Failed to generate report");
      }

      const data = await response.json();
      toast({
        title: "Report Generated",
        description: `${data.report.name} has been generated successfully`,
      });

      // Refresh reports list
      fetchReportsData();
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error",
        description: "Failed to generate report",
        variant: "destructive",
      });
    } finally {
      setGeneratingReport(false);
    }
  };

  const handleDownloadReport = async (reportId) => {
    try {
      const response = await fetch(
        `/api/financial-reports/download/${reportId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to download report");
      }

      toast({
        title: "Download Started",
        description: "Your report download has started",
      });

      // In a real app, this would trigger a file download
      // For now, we just show a toast notification
    } catch (error) {
      console.error("Error downloading report:", error);
      toast({
        title: "Error",
        description: "Failed to download report",
        variant: "destructive",
      });
    }
  };

  // Filter reports based on search term and filters
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      reportTypeFilter === "all" ||
      report.type.toLowerCase().includes(reportTypeFilter.replace("-", " "));

    // Simple period matching - in a real app, this would be more sophisticated
    const matchesPeriod =
      periodFilter === "all" ||
      (periodFilter === "july-2023" && report.period.includes("July")) ||
      (periodFilter === "q2-2023" && report.period.includes("Q2"));

    return matchesSearch && matchesType && matchesPeriod;
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
                <h1 className="text-3xl font-bold">Financial Reports</h1>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={fetchReportsData}
                  disabled={loading}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`}
                  />
                  Refresh
                </Button>
                <Button variant="outline">
                  <Printer className="h-4 w-4 mr-2" /> Print
                </Button>
                <Button className="bg-orange-600 hover:bg-orange-700">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
              </div>
            </div>
          </header>

          {/* Financial Summary */}
          <Card>
            <CardHeader>
              <CardTitle>
                Financial Summary -{" "}
                {new Date().toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="flex justify-center py-8">
                  <RefreshCw className="h-8 w-8 animate-spin text-orange-600" />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Revenue</span>
                      <span className="text-2xl font-bold text-orange-600">
                        ${financialMetrics.revenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Expenses</span>
                      <span className="text-2xl font-bold text-red-600">
                        ${financialMetrics.expenses.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Net Profit</span>
                      <span className="text-2xl font-bold text-green-600">
                        ${financialMetrics.profit.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        Profit Margin
                      </span>
                      <span className="text-2xl font-bold text-blue-600">
                        {financialMetrics.profitMargin}%
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        Cash on Hand
                      </span>
                      <span className="text-xl font-bold">
                        ${financialMetrics.cashOnHand.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        Accounts Receivable
                      </span>
                      <span className="text-xl font-bold">
                        ${financialMetrics.accountsReceivable.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        Accounts Payable
                      </span>
                      <span className="text-xl font-bold">
                        ${financialMetrics.accountsPayable.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Report Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Search reports..."
                className="max-w-xs"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button variant="outline" onClick={() => setSearchTerm("")}>
                Clear
              </Button>
            </div>
            <div className="flex gap-2">
              <Select
                value={reportTypeFilter}
                onValueChange={setReportTypeFilter}
                defaultValue="all"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Report Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="profit-loss">Profit & Loss</SelectItem>
                  <SelectItem value="balance-sheet">Balance Sheet</SelectItem>
                  <SelectItem value="cash-flow">Cash Flow</SelectItem>
                  <SelectItem value="expense">Expense Report</SelectItem>
                  <SelectItem value="revenue">Revenue Report</SelectItem>
                  <SelectItem value="tax">Tax Report</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={periodFilter}
                onValueChange={setPeriodFilter}
                defaultValue="july-2023"
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Periods</SelectItem>
                  <SelectItem value="july-2023">July 2023</SelectItem>
                  <SelectItem value="q2-2023">Q2 2023</SelectItem>
                  <SelectItem value="q1-2023">Q1 2023</SelectItem>
                  <SelectItem value="2023">Year 2023</SelectItem>
                  <SelectItem value="2022">Year 2022</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Available Reports */}
          {loading ? (
            <div className="flex justify-center py-12">
              <RefreshCw className="h-12 w-12 animate-spin text-orange-600" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <FinancialReportCard
                    key={report.id}
                    report={report}
                    onDownload={handleDownloadReport}
                  />
                ))
              ) : (
                <div className="col-span-3 py-12 text-center">
                  <p className="text-gray-500">
                    No reports found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Generate Custom Report */}
          <Card>
            <CardHeader>
              <CardTitle>Generate Custom Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium mb-1">
                      Report Type
                    </Label>
                    <Select
                      value={customReportForm.reportType}
                      onValueChange={(value) =>
                        handleCustomReportChange("reportType", value)
                      }
                      defaultValue="profit-loss"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="profit-loss">
                          Profit & Loss
                        </SelectItem>
                        <SelectItem value="balance-sheet">
                          Balance Sheet
                        </SelectItem>
                        <SelectItem value="cash-flow">Cash Flow</SelectItem>
                        <SelectItem value="expense">Expense Report</SelectItem>
                        <SelectItem value="revenue">Revenue Report</SelectItem>
                        <SelectItem value="tax">Tax Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-1">
                      Period
                    </Label>
                    <Select
                      value={customReportForm.period}
                      onValueChange={(value) =>
                        handleCustomReportChange("period", value)
                      }
                      defaultValue="current-month"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current-month">
                          Current Month
                        </SelectItem>
                        <SelectItem value="previous-month">
                          Previous Month
                        </SelectItem>
                        <SelectItem value="current-quarter">
                          Current Quarter
                        </SelectItem>
                        <SelectItem value="year-to-date">
                          Year to Date
                        </SelectItem>
                        <SelectItem value="custom">
                          Custom Date Range
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="block text-sm font-medium mb-1">
                      Format
                    </Label>
                    <Select
                      value={customReportForm.format}
                      onValueChange={(value) =>
                        handleCustomReportChange("format", value)
                      }
                      defaultValue="pdf"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="block text-sm font-medium mb-1">
                      Additional Options
                    </Label>
                    <div className="flex items-center gap-2 mt-2">
                      <Checkbox
                        id="include-charts"
                        checked={customReportForm.includeCharts}
                        onCheckedChange={(checked) =>
                          handleCustomReportChange("includeCharts", checked)
                        }
                      />
                      <Label htmlFor="include-charts" className="text-sm">
                        Include charts and graphs
                      </Label>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <Checkbox
                        id="include-notes"
                        checked={customReportForm.includeNotes}
                        onCheckedChange={(checked) =>
                          handleCustomReportChange("includeNotes", checked)
                        }
                      />
                      <Label htmlFor="include-notes" className="text-sm">
                        Include notes and comments
                      </Label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={handleGenerateReport}
                  disabled={generatingReport}
                >
                  {generatingReport ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Report"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
