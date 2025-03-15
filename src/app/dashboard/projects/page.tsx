import DashboardNavbar from "@/components/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function ProjectsDashboard() {
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
              <h1 className="text-3xl font-bold">Project Dashboard</h1>
              <Button className="bg-orange-600 hover:bg-orange-700">
                New Project
              </Button>
            </div>
            <div className="bg-orange-50 text-sm p-3 px-4 rounded-lg text-orange-800 border border-orange-200 flex gap-2 items-center">
              <FileText size="14" />
              <span>You have 3 projects due this week</span>
            </div>
          </header>

          {/* Project Stats */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Projects
                  </p>
                  <h3 className="text-2xl font-bold mt-1">12</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    In Progress
                  </p>
                  <h3 className="text-2xl font-bold mt-1">7</h3>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <h3 className="text-2xl font-bold mt-1">4</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">At Risk</p>
                  <h3 className="text-2xl font-bold mt-1">1</h3>
                </div>
                <div className="bg-red-100 p-3 rounded-full">
                  <AlertCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </Card>
          </section>

          {/* Active Projects */}
          <Card>
            <CardHeader>
              <CardTitle>Active Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    name: "Website Redesign",
                    client: "ABC Corporation",
                    deadline: "Jul 30, 2023",
                    progress: 75,
                    status: "On Track",
                    statusColor: "bg-green-500",
                  },
                  {
                    name: "Mobile App Development",
                    client: "XYZ Startup",
                    deadline: "Aug 15, 2023",
                    progress: 45,
                    status: "In Progress",
                    statusColor: "bg-orange-500",
                  },
                  {
                    name: "Marketing Campaign",
                    client: "Global Enterprises",
                    deadline: "Jul 25, 2023",
                    progress: 30,
                    status: "At Risk",
                    statusColor: "bg-red-500",
                  },
                  {
                    name: "CRM Integration",
                    client: "Tech Solutions Inc",
                    deadline: "Sep 5, 2023",
                    progress: 60,
                    status: "On Track",
                    statusColor: "bg-green-500",
                  },
                  {
                    name: "E-commerce Platform",
                    client: "Retail Group",
                    deadline: "Oct 10, 2023",
                    progress: 15,
                    status: "Just Started",
                    statusColor: "bg-blue-500",
                  },
                ].map((project, index) => (
                  <div
                    key={index}
                    className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {project.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {project.client}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span
                          className={`inline-block w-2 h-2 ${project.statusColor} rounded-full`}
                        ></span>
                        <span className="text-sm">{project.status}</span>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-orange-500 h-2 rounded-full"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-4 w-4 mr-1" />
                          Due: {project.deadline}
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-8"
                        >
                          View Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Team Workload */}
          <Card>
            <CardHeader>
              <CardTitle>Team Workload</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    name: "John Smith",
                    role: "Lead Developer",
                    avatar: "JS",
                    projects: 4,
                    workload: 85,
                  },
                  {
                    name: "Sarah Johnson",
                    role: "UI/UX Designer",
                    avatar: "SJ",
                    projects: 3,
                    workload: 70,
                  },
                  {
                    name: "Michael Brown",
                    role: "Project Manager",
                    avatar: "MB",
                    projects: 5,
                    workload: 90,
                  },
                  {
                    name: "Emily Davis",
                    role: "Content Strategist",
                    avatar: "ED",
                    projects: 2,
                    workload: 50,
                  },
                ].map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-medium">
                        {member.avatar}
                      </div>
                      <div>
                        <h4 className="font-medium">{member.name}</h4>
                        <p className="text-sm text-gray-500">{member.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {member.projects} Projects
                        </p>
                        <div className="w-32 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className={`h-2 rounded-full ${
                              member.workload > 80
                                ? "bg-red-500"
                                : member.workload > 60
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                            }`}
                            style={{ width: `${member.workload}%` }}
                          ></div>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Assign
                      </Button>
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
