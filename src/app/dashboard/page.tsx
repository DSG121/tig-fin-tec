import DashboardNavbar from "@/components/dashboard-navbar";
import {
  BarChart3,
  DollarSign,
  FileText,
  InfoIcon,
  Users,
  UserCircle,
} from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import { Card } from "@/components/ui/card";

export default async function Dashboard() {
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
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <div className="text-sm text-gray-500">
                Welcome back, {user.user_metadata?.full_name || user.email}
              </div>
            </div>
            <div className="bg-orange-50 text-sm p-3 px-4 rounded-lg text-orange-800 border border-orange-200 flex gap-2 items-center">
              <InfoIcon size="14" />
              <span>
                Welcome to TigFin - Your business management dashboard
              </span>
            </div>
          </header>

          {/* KPI Cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 border-l-4 border-l-orange-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Revenue
                  </p>
                  <h3 className="text-2xl font-bold mt-1">$24,780</h3>
                  <p className="text-xs text-green-600 mt-1">
                    +12% from last month
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <DollarSign className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-blue-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Active Projects
                  </p>
                  <h3 className="text-2xl font-bold mt-1">12</h3>
                  <p className="text-xs text-blue-600 mt-1">3 due this week</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-green-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Clients
                  </p>
                  <h3 className="text-2xl font-bold mt-1">48</h3>
                  <p className="text-xs text-green-600 mt-1">
                    +5 new this month
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6 border-l-4 border-l-purple-500">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Pending Payments
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

          {/* Main Dashboard Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Activity */}
            <Card className="col-span-2 p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {[
                  {
                    title: "New client added",
                    time: "2 hours ago",
                    description: "John Smith was added as a new client",
                  },
                  {
                    title: "Payment received",
                    time: "Yesterday",
                    description: "$1,200 payment received from ABC Corp",
                  },
                  {
                    title: "Project completed",
                    time: "2 days ago",
                    description: "Website redesign project marked as complete",
                  },
                  {
                    title: "New invoice created",
                    time: "3 days ago",
                    description: "Invoice #1234 created for XYZ Company",
                  },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="bg-orange-100 p-2 rounded-full">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <h4 className="font-medium">{activity.title}</h4>
                        <span className="text-xs text-gray-500">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* User Profile Section */}
            <Card className="p-6">
              <div className="flex items-center gap-4 mb-6">
                <UserCircle size={48} className="text-orange-600" />
                <div>
                  <h2 className="font-semibold text-xl">Your Profile</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Role</span>
                  <span className="text-sm font-medium">Administrator</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Last Login</span>
                  <span className="text-sm font-medium">Today, 10:30 AM</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                  <span className="text-sm text-gray-500">Account Status</span>
                  <span className="text-sm font-medium text-green-600">
                    Active
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}
