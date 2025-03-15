import DashboardNavbar from "@/components/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart3, ChevronDown, Plus, Search, Settings, UserPlus, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function TeamDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // This would typically come from a database query
  const teamMembers = [
    {
      id: "1",
      name: "John Smith",
      email: "john@tigfin.com",
      role: "Lead Developer",
      department: "Engineering",
      avatar: "JS",
      projects: 4,
      workload: 85,
      status: "active",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      email: "sarah@tigfin.com",
      role: "UI/UX Designer",
      department: "Design",
      avatar: "SJ",
      projects: 3,
      workload: 70,
      status: "active",
    },
    {
      id: "3",
      name: "Michael Brown",
      email: "michael@tigfin.com",
      role: "Project Manager",
      department: "Management",
      avatar: "MB",
      projects: 5,
      workload: 90,
      status: "active",
    },
    {
      id: "4",
      name: "Emily Davis",
      email: "emily@tigfin.com",
      role: "Content Strategist",
      department: "Marketing",
      avatar: "ED",
      projects: 2,
      workload: 50,
      status: "active",
    },
    {
      id: "5",
      name: "David Wilson",
      email: "david@tigfin.com",
      role: "Backend Developer",
      department: "Engineering",
      avatar: "DW",
      projects: 3,
      workload: 75,
      status: "active",
    },
    {
      id: "6",
      name: "Jennifer Lee",
      email: "jennifer@tigfin.com",
      role: "Marketing Specialist",
      department: "Marketing",
      avatar: "JL",
      projects: 2,
      workload: 60,
      status: "active",
    },
  ];

  const departments = [
    { name: "Engineering", count: 2, color: "bg-blue-500" },
    { name: "Design", count: 1, color: "bg-purple-500" },
    { name: "Management", count: 1, color: "bg-orange-500" },
    { name: "Marketing", count: 2, color: "bg-green-500" },
  ];

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Team Management</h1>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <UserPlus className="h-4 w-4 mr-2" /> Add Team Member
              </Button>
            </div>
            <div className="bg-orange-50 text-sm p-3 px-4 rounded-lg text-orange-800 border border-orange-200 flex gap-2 items-center">
              <Users size="14" />
              <span>Manage your team members, roles, and workload</span>
            </div>
          </header>

          {/* Team Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Team Members</p>
                    <h3 className="text-2xl font-bold mt-1">{teamMembers.length}</h3>
                  </div>
                  <div className="bg-blue-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Departments</p>
                    <h3 className="text-2xl font-bold mt-1">{departments.length}</h3>
                  </div>
                  <div className="bg-purple-100 p-3 rounded-full">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Average Workload</p>
                    <h3 className="text-2xl font-bold mt-1">72%</h3>
                  </div>
                  <div className="bg-orange-100 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Active Projects</p>
                    <h3 className="text-2xl font-bold mt-1">12</h3>
                  </div>
                  <div className="bg-green-100 p-3 rounded-full">
                    <BarChart3 className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search team members..." className="pl-10 w-full" />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white">
                    Department <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All Departments</DropdownMenuItem>
                  <DropdownMenuItem>Engineering</DropdownMenuItem>
                  <DropdownMenuItem>Design</DropdownMenuItem>
                  <DropdownMenuItem>Management</DropdownMenuItem>
                  <DropdownMenuItem>Marketing</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="bg-white">
                    Workload <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>All</DropdownMenuItem>
                  <DropdownMenuItem>High (80%+)</DropdownMenuItem>
                  <DropdownMenuItem>Medium (50-80%)</DropdownMenuItem>
                  <DropdownMenuItem>Low (< 50%)</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Team Members List */}
          <Card>
            <CardHeader>
              <CardTitle>Team Members</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-medium text-sm">Name</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Role</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Department</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Projects</th>
                      <th className="text-left py-3 px-4 font-medium text-sm">Workload</th>
                      <th className="text-right py-3 px-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map((member) => (
                      <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-medium">
                              {member.avatar}
                            </div>
                            <div>
                              <div className="font-medium">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{member.role}</td>
                        <td className="py-3 px-4">{member.department}</td>
                        <td className="py-3 px-4">{member.projects}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full max-w-[100px] bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${member.workload > 80 ? "bg-red-500" : member.workload > 60 ? "bg-orange-500" : "bg-green-500"}`}
                                style={{ width: `${member.workload}%` }}
                              ></div>
                            </div>
                            <span className="text-sm">{member.workload}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Button variant="ghost" size="sm">
                            <Settings className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Department Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Department Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="h-64 bg-gray-50 rounded-md flex items-center justify-center">
                    <div className="text-center">
                      <PieChart className="h-16 w-16 text-orange-500 mx-auto mb-4 opacity-50" />
                      <p className="text-muted-foreground">Team Distribution by Department</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="space-y-4">
                    {departments.map((dept, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-4 h-4 rounded-full ${dept.color}`}></div>
                          <span>{dept.name}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium">{dept.count} members</span>
                          <span className="text-sm text-gray-500">
                            {Math.round((dept.count / teamMembers.length) * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">Department Workload</h3>
                    <div className="space-y-4">
                      {departments.map((dept, index) => {
                        // Calculate average workload for each department
                        const deptMembers = teamMembers.filter(m => m.department === dept.name);
                        const avgWorkload = deptMembers.reduce((sum, m) => sum + m.workload, 0) / deptMembers.length;
                        
                        return (
                          <div key={index} className="flex items-center justify-between">
                            <span>{dept.name}</span>
                            <div className="flex items-center gap-2">
                              <div className="w-32 bg-gray-200 rounded-full h-2">
                                <div
                                  className={`h-2 rounded-full ${avgWorkload > 80 ? "bg-red-500" : avgWorkload > 60 ? "bg-orange-500" : "bg-green-500"}`}
                                  style={{ width: `${avgWorkload}%` }}
                                ></div>
                              </div>
                              <span className="text-sm">{Math.round(avgWorkload)}%</span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Team Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-2">Project Completion Rate</h3>
                    <div className="text-3xl font-bold">92%</div>
                    <p className="text-sm text-gray-500 mt-1">Projects completed on time</p>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: "92%" }}></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-2">Team Utilization</h3>
                    <div className="text-3xl font-bold">85%</div>
                    <p className="text-sm text-gray-500 mt-1">Of available team capacity</p>
                    <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardContent className="p-4">
                    <h3 className="font-medium text-lg mb-2">Client Satisfaction</h3>
                    <div className="text-3xl font-bold">4.8/5</div>
                    <p className="text-sm text-gray-500 mt-1">Average client rating</p>
                    <div className="mt-4 flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className={`w-5 h-5 ${star <= 4 ? "text-yellow-500" : "text-gray-300"}`}>
                          ★
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
