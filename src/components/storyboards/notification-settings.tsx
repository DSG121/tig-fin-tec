import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell } from "lucide-react";

export default function NotificationSettings() {
  return (
    <main className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="container mx-auto flex flex-col gap-8">
        {/* Header Section */}
        <header className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Notification Settings</h1>
          </div>
          <div className="bg-orange-50 text-sm p-3 px-4 rounded-lg text-orange-800 border border-orange-200 flex gap-2 items-center">
            <Bell size="14" />
            <span>Configure how you receive notifications</span>
          </div>
        </header>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Email Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Payment Notifications",
                  description: "Receive alerts about payments and invoices",
                  options: [
                    "New payments",
                    "Payment reminders",
                    "Overdue invoices",
                    "Payment confirmations",
                  ],
                },
                {
                  title: "Project Notifications",
                  description: "Stay updated on project activities",
                  options: [
                    "Project status changes",
                    "Deadline reminders",
                    "New comments",
                    "Task assignments",
                  ],
                },
                {
                  title: "Client Notifications",
                  description: "Updates related to client activities",
                  options: [
                    "New client registrations",
                    "Client profile updates",
                    "Document uploads",
                    "Meeting reminders",
                  ],
                },
                {
                  title: "System Notifications",
                  description: "Important system-related updates",
                  options: [
                    "System maintenance",
                    "Feature updates",
                    "Security alerts",
                    "Account activity",
                  ],
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className="border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="font-medium">{category.title}</h4>
                      <p className="text-sm text-gray-500">
                        {category.description}
                      </p>
                    </div>
                    <div className="h-6 w-11 rounded-full bg-orange-500 flex items-center p-1 cursor-pointer">
                      <div className="h-4 w-4 rounded-full bg-white ml-auto"></div>
                    </div>
                  </div>

                  <div className="ml-6 mt-3 space-y-2">
                    {category.options.map((option, optIndex) => (
                      <div
                        key={optIndex}
                        className="flex items-center justify-between"
                      >
                        <span className="text-sm">{option}</span>
                        <div className="h-5 w-10 rounded-full bg-gray-200 flex items-center p-1 cursor-pointer">
                          <div className="h-3 w-3 rounded-full bg-white"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Email Notifications",
                  description: "Receive notifications via email",
                  enabled: true,
                },
                {
                  title: "In-App Notifications",
                  description: "Show notifications in the dashboard",
                  enabled: true,
                },
                {
                  title: "SMS Notifications",
                  description: "Receive text messages for urgent alerts",
                  enabled: false,
                },
                {
                  title: "Weekly Digest",
                  description: "Receive a summary of all notifications weekly",
                  enabled: true,
                },
              ].map((method, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">{method.title}</h4>
                    <p className="text-sm text-gray-500">
                      {method.description}
                    </p>
                  </div>
                  <div
                    className={`h-6 w-11 rounded-full ${method.enabled ? "bg-orange-500" : "bg-gray-200"} flex items-center p-1 cursor-pointer`}
                  >
                    <div
                      className={`h-4 w-4 rounded-full bg-white ${method.enabled ? "ml-auto" : ""}`}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
