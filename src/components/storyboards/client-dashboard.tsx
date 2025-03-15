import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MoreHorizontal, Plus, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ClientDashboard() {
  return (
    <main className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="container mx-auto flex flex-col gap-8">
        {/* Header Section */}
        <header className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Client Management</h1>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" /> Add New Client
            </Button>
          </div>
          <div className="bg-orange-50 text-sm p-3 px-4 rounded-lg text-orange-800 border border-orange-200 flex gap-2 items-center">
            <Users size="14" />
            <span>You have 48 total clients with 5 added this month</span>
          </div>
        </header>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search clients..." className="pl-10 w-full" />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 rounded-md border border-gray-200 text-sm">
              <option>All Clients</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
            <select className="px-4 py-2 rounded-md border border-gray-200 text-sm">
              <option>Sort by Name</option>
              <option>Sort by Date Added</option>
              <option>Sort by Last Activity</option>
            </select>
          </div>
        </div>

        {/* Client Stats */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Clients
                </p>
                <h3 className="text-2xl font-bold mt-1">48</h3>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Projects
                </p>
                <h3 className="text-2xl font-bold mt-1">12</h3>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Revenue This Month
                </p>
                <h3 className="text-2xl font-bold mt-1">$24,780</h3>
              </div>
              <div className="bg-orange-100 p-3 rounded-full">
                <FileText className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </Card>
        </section>

        {/* Client List */}
        <Card>
          <CardHeader>
            <CardTitle>Client Directory</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Client
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Contact
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Projects
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Last Activity
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      name: "ABC Corporation",
                      contact: "John Smith",
                      email: "john@abccorp.com",
                      projects: 3,
                      status: "Active",
                      statusColor: "bg-green-500",
                      lastActivity: "Today",
                    },
                    {
                      name: "XYZ Enterprises",
                      contact: "Sarah Johnson",
                      email: "sarah@xyz.com",
                      projects: 2,
                      status: "Active",
                      statusColor: "bg-green-500",
                      lastActivity: "Yesterday",
                    },
                    {
                      name: "Tech Solutions Inc",
                      contact: "Michael Brown",
                      email: "michael@techsolutions.com",
                      projects: 1,
                      status: "Active",
                      statusColor: "bg-green-500",
                      lastActivity: "Jul 15, 2023",
                    },
                  ].map((client, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium">{client.name}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div>{client.contact}</div>
                        <div className="text-sm text-gray-500">
                          {client.email}
                        </div>
                      </td>
                      <td className="py-3 px-4">{client.projects}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${client.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {client.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{client.lastActivity}</td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
