import DashboardNavbar from "@/components/dashboard-navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import { Bell, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default async function NotificationsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // This would typically come from a database query
  const notifications = [
    {
      id: "1",
      title: "Payment Received",
      message: "$1,200 payment received from ABC Corp",
      time: "2 hours ago",
      read: false,
      type: "payment",
    },
    {
      id: "2",
      title: "Project Deadline Approaching",
      message: "Website Redesign project is due in 3 days",
      time: "Yesterday",
      read: false,
      type: "project",
    },
    {
      id: "3",
      title: "New Client Added",
      message: "John Smith was added as a new client",
      time: "2 days ago",
      read: true,
      type: "client",
    },
    {
      id: "4",
      title: "Invoice Overdue",
      message: "Invoice #1234 for XYZ Company is 7 days overdue",
      time: "3 days ago",
      read: true,
      type: "payment",
    },
    {
      id: "5",
      title: "System Update",
      message: "TigFin will be updated to version 2.0 this weekend",
      time: "5 days ago",
      read: true,
      type: "system",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "payment":
        return "bg-green-100 text-green-600";
      case "project":
        return "bg-blue-100 text-blue-600";
      case "client":
        return "bg-orange-100 text-orange-600";
      case "system":
        return "bg-purple-100 text-purple-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "payment":
        return "$";
      case "project":
        return "P";
      case "client":
        return "C";
      case "system":
        return "S";
      default:
        return "!";
    }
  };

  return (
    <>
      <DashboardNavbar />
      <main className="w-full bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
          {/* Header Section */}
          <header className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold">Notifications</h1>
              <Button className="bg-orange-600 hover:bg-orange-700">
                Mark All as Read
              </Button>
            </div>
            <div className="bg-orange-50 text-sm p-3 px-4 rounded-lg text-orange-800 border border-orange-200 flex gap-2 items-center">
              <Bell size="14" />
              <span>
                You have {notifications.filter((n) => !n.read).length} unread
                notifications
              </span>
            </div>
          </header>

          {/* Notification Filters */}
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" className="bg-white">
              All
            </Button>
            <Button variant="outline" className="bg-white">
              Unread
            </Button>
            <Button variant="outline" className="bg-white">
              Payments
            </Button>
            <Button variant="outline" className="bg-white">
              Projects
            </Button>
            <Button variant="outline" className="bg-white">
              Clients
            </Button>
            <Button variant="outline" className="bg-white">
              System
            </Button>
          </div>

          {/* Notifications List */}
          <Card>
            <CardHeader>
              <CardTitle>All Notifications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No notifications
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${notification.read ? "bg-white" : "bg-orange-50"}`}
                    >
                      <div className="flex gap-3">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${getTypeColor(
                            notification.type,
                          )}`}
                        >
                          {getTypeIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between">
                            <h4 className="font-medium">
                              {notification.title}
                            </h4>
                            <span className="text-xs text-gray-500">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">
                            {notification.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end mt-2 gap-2">
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 text-xs"
                          >
                            <Check className="h-3 w-3 mr-1" /> Mark as read
                          </Button>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 text-xs"
                        >
                          <X className="h-3 w-3 mr-1" /> Dismiss
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Email Notifications",
                    description: "Receive updates via email",
                  },
                  {
                    title: "Project Updates",
                    description: "Get notified about project changes",
                  },
                  {
                    title: "Payment Alerts",
                    description: "Receive payment notifications",
                  },
                  {
                    title: "System Announcements",
                    description: "Important system updates",
                  },
                ].map((pref, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <h4 className="font-medium">{pref.title}</h4>
                      <p className="text-sm text-gray-500">
                        {pref.description}
                      </p>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-gray-200 flex items-center p-1 cursor-pointer">
                      <div className="h-4 w-4 rounded-full bg-white"></div>
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
