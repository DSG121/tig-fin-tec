"use client";

import { useState } from "react";
import { Bell, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

type Notification = {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "payment" | "project" | "client" | "system";
};

export default function NotificationPanel() {
  const [notifications, setNotifications] = useState<Notification[]>([
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
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getTypeColor = (type: Notification["type"]) => {
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

  const getTypeIcon = (type: Notification["type"]) => {
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
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md">
        <SheetHeader className="border-b pb-4">
          <div className="flex justify-between items-center">
            <SheetTitle>Notifications</SheetTitle>
            {unreadCount > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={markAllAsRead}
                className="text-xs"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </SheetHeader>

        <div className="mt-4 space-y-4 max-h-[80vh] overflow-y-auto pr-2">
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
                      <h4 className="font-medium">{notification.title}</h4>
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
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="h-3 w-3 mr-1" /> Mark as read
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs"
                    onClick={() => removeNotification(notification.id)}
                  >
                    <X className="h-3 w-3 mr-1" /> Dismiss
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
