import DashboardNavbar from "@/components/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { FileText, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddClientDialog from "@/components/add-client-dialog";
import ClientActions from "@/components/client-actions-dropdown";
import ClientSearchForm from "@/components/client-search-form";

export default async function ClientsDashboard({
  searchParams,
}: {
  searchParams?: { q?: string; status?: string; sortBy?: string };
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Get search parameters
  const query = searchParams?.q || "";
  const status = searchParams?.status || "";
  const sortBy = searchParams?.sortBy || "name";

  // Fetch clients from the database with filters
  let dbQuery = supabase.from("clients").select("*").eq("user_id", user.id);

  if (query) {
    dbQuery = dbQuery.or(
      `name.ilike.%${query}%,contact_name.ilike.%${query}%,email.ilike.%${query}%`,
    );
  }

  if (status) {
    dbQuery = dbQuery.eq("status", status);
  }

  const { data: clientsData, error: clientsError } = await dbQuery.order(
    sortBy,
    { ascending: true },
  );

  // If there's an error or no data, use sample data
  const clients =
    clientsData && clientsData.length > 0
      ? clientsData.map((client) => ({
          id: client.id,
          name: client.name,
          contact: client.contact_name,
          email: client.email,
          projects: 0, // We'll implement projects later
          status: client.status,
          lastActivity: new Date(client.updated_at).toLocaleDateString(
            "en-US",
            {
              year: "numeric",
              month: "short",
              day: "numeric",
            },
          ),
        }))
      : [
          {
            id: "1",
            name: "ABC Corporation",
            contact: "John Smith",
            email: "john@abccorp.com",
            projects: 3,
            status: "Active",
            lastActivity: "Today",
          },
          {
            id: "2",
            name: "XYZ Enterprises",
            contact: "Sarah Johnson",
            email: "sarah@xyz.com",
            projects: 2,
            status: "Active",
            lastActivity: "Yesterday",
          },
          {
            id: "3",
            name: "Tech Solutions Inc",
            contact: "Michael Brown",
            email: "michael@techsolutions.com",
            projects: 1,
            status: "Active",
            lastActivity: "Jul 15, 2023",
          },
          {
            id: "4",
            name: "Global Retail Group",
            contact: "Emily Davis",
            email: "emily@globalretail.com",
            projects: 0,
            status: "Inactive",
            lastActivity: "Jun 30, 2023",
          },
          {
            id: "5",
            name: "Startup Innovations",
            contact: "David Wilson",
            email: "david@startupinnovations.com",
            projects: 2,
            status: "Active",
            lastActivity: "Jul 18, 2023",
          },
        ];

  const activities = [
    {
      id: "1",
      client: "ABC Corporation",
      action: "New project created",
      details: "Website Redesign",
      time: "2 hours ago",
    },
    {
      id: "2",
      client: "XYZ Enterprises",
      action: "Invoice paid",
      details: "$1,200.00",
      time: "Yesterday",
    },
    {
      id: "3",
      client: "Tech Solutions Inc",
      action: "Document uploaded",
      details: "Project requirements.pdf",
      time: "Jul 18, 2023",
    },
    {
      id: "4",
      client: "Startup Innovations",
      action: "Meeting scheduled",
      details: "Project kickoff - Jul 25, 2023",
      time: "Jul 17, 2023",
    },
  ];

  // Calculate total active projects
  const totalActiveProjects = clients.reduce(
    (acc, client) => acc + (client.projects || 0),
    0,
  );

  // Count active clients
  const activeClients = clients.filter(
    (client) => client.status === "Active",
  ).length;

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Client Management</h1>
              <AddClientDialog />
            </div>
            <div className="bg-orange-50 text-sm p-3 px-4 rounded-lg text-orange-800 border border-orange-200 flex gap-2 items-center">
              <Users size="14" />
              <span>
                You have {clients.length} total clients with {activeClients}{" "}
                active
              </span>
            </div>
          </header>

          {/* Search and Filter */}
          <ClientSearchForm />

          {/* Client Stats */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Total Clients
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{clients.length}</h3>
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
                  <h3 className="text-2xl font-bold mt-1">
                    {totalActiveProjects}
                  </h3>
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
                    {clients.map((client) => (
                      <tr
                        key={client.id}
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
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              client.status === "Active"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {client.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">{client.lastActivity}</td>
                        <td className="py-3 px-4 text-right">
                          <ClientActions
                            clientId={client.id}
                            clientData={{
                              name: client.name,
                              contact_name: client.contact,
                              email: client.email,
                              status: client.status,
                            }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Recent Client Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Client Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="bg-orange-100 p-2 rounded-full">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{activity.client}</h4>
                        <span className="text-xs text-gray-500">
                          {activity.time}
                        </span>
                      </div>
                      <p className="text-sm">{activity.action}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {activity.details}
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
