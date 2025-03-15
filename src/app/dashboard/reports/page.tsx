import DashboardNavbar from "@/components/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import {
  BarChart3,
  ChevronDown,
  Download,
  FileText,
  PieChart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function ReportsDashboard() {
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
              <h1 className="text-3xl font-bold">Reports & Analytics</h1>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Download className="h-4 w-4 mr-2" /> Export Reports
              </Button>
            </div>
            <div className="bg-orange-50 text-sm p-3 px-4 rounded-lg text-orange-800 border border-orange-200 flex gap-2 items-center">
              <BarChart3 size="14" />
              <span>View and analyze your business performance metrics</span>
            </div>
          </header>

          {/* Report Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white">
                    Report Type <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Financial Reports</DropdownMenuItem>
                  <DropdownMenuItem>Project Reports</DropdownMenuItem>
                  <DropdownMenuItem>Client Reports</DropdownMenuItem>
                  <DropdownMenuItem>Team Reports</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white">
                    Time Period <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>This Month</DropdownMenuItem>
                  <DropdownMenuItem>Last Month</DropdownMenuItem>
                  <DropdownMenuItem>This Quarter</DropdownMenuItem>
                  <DropdownMenuItem>This Year</DropdownMenuItem>
                  <DropdownMenuItem>Custom Range</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="bg-white">
                <FileText className="h-4 w-4 mr-2" /> Save Report
              </Button>
              <Button variant="outline" className="bg-white">
                <BarChart3 className="h-4 w-4 mr-2" /> Customize View
              </Button>
            </div>
          </div>

          {/* Financial Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Financial Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Revenue vs Expenses
                  </h3>
                  <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-orange-500 mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">
                        Revenue vs Expenses Chart
                      </p>
                      <div className="mt-4 flex justify-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">Revenue</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm">Expenses</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Revenue by Category
                  </h3>
                  <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 text-orange-500 mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">
                        Revenue Distribution
                      </p>
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
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      Total Revenue
                    </div>
                    <div className="text-2xl font-bold">$124,750</div>
                    <div className="text-xs text-green-600 mt-1">
                      ↑ 12% from previous period
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      Total Expenses
                    </div>
                    <div className="text-2xl font-bold">$78,230</div>
                    <div className="text-xs text-red-600 mt-1">
                      ↑ 8% from previous period
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">Net Profit</div>
                    <div className="text-2xl font-bold">$46,520</div>
                    <div className="text-xs text-green-600 mt-1">
                      ↑ 15% from previous period
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Project Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Project Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Project Status Distribution
                  </h3>
                  <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 text-blue-500 mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">Project Status</p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Completed (33%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">In Progress (58%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <span className="text-sm">At Risk (8%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                          <span className="text-sm">Not Started (1%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Resource Allocation
                  </h3>
                  <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-blue-500 mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">
                        Team Resource Allocation
                      </p>
                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Development (40%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-sm">Design (25%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">Marketing (20%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">Management (15%)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      Total Projects
                    </div>
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-xs text-green-600 mt-1">
                      2 new this month
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      On-time Completion Rate
                    </div>
                    <div className="text-2xl font-bold">85%</div>
                    <div className="text-xs text-green-600 mt-1">
                      ↑ 5% from previous period
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      Average Project Duration
                    </div>
                    <div className="text-2xl font-bold">45 days</div>
                    <div className="text-xs text-red-600 mt-1">
                      ↑ 3 days from previous period
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Client Analytics */}
          <Card>
            <CardHeader>
              <CardTitle>Client Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Client Acquisition
                  </h3>
                  <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="h-16 w-16 text-green-500 mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">
                        New Clients by Month
                      </p>
                      <div className="mt-4 flex justify-center gap-6">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">New Clients</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">Target</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Revenue by Client
                  </h3>
                  <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 text-green-500 mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">
                        Top 5 Clients by Revenue
                      </p>
                      <div className="mt-4 grid grid-cols-1 gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                          <span className="text-sm">ABC Corporation (30%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm">XYZ Enterprises (25%)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-sm">
                            Tech Solutions Inc (15%)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-sm">
                            Global Retail Group (10%)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm">
                            Startup Innovations (5%)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      Total Clients
                    </div>
                    <div className="text-2xl font-bold">48</div>
                    <div className="text-xs text-green-600 mt-1">
                      ↑ 5 from previous period
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      Client Retention Rate
                    </div>
                    <div className="text-2xl font-bold">92%</div>
                    <div className="text-xs text-green-600 mt-1">
                      ↑ 3% from previous period
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-gray-50">
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-1">
                      Average Revenue per Client
                    </div>
                    <div className="text-2xl font-bold">$2,599</div>
                    <div className="text-xs text-green-600 mt-1">
                      ↑ 8% from previous period
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>

          {/* Report Export Options */}
          <Card>
            <CardHeader>
              <CardTitle>Export Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  {
                    title: "Financial Report",
                    description:
                      "Complete financial analysis with revenue and expense breakdown",
                    formats: ["PDF", "Excel", "CSV"],
                  },
                  {
                    title: "Project Report",
                    description:
                      "Project status, timeline, and resource allocation metrics",
                    formats: ["PDF", "Excel", "CSV"],
                  },
                  {
                    title: "Client Report",
                    description:
                      "Client acquisition, retention, and revenue analysis",
                    formats: ["PDF", "Excel", "CSV"],
                  },
                ].map((report, index) => (
                  <Card key={index} className="border border-gray-200">
                    <CardContent className="p-4">
                      <h3 className="font-medium text-lg">{report.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 mb-4">
                        {report.description}
                      </p>
                      <div className="flex gap-2">
                        {report.formats.map((format, i) => (
                          <Button
                            key={i}
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            <Download className="h-3 w-3 mr-1" /> {format}
                          </Button>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
