"use client";

import Link from "next/link";
import { createClient } from "../../supabase/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  BarChart3,
  DollarSign,
  FileText,
  Home,
  ListTodo,
  Settings,
  Users,
  UserCircle,
} from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import NotificationPanel from "./notification-panel";

export default function DashboardNavbar() {
  const supabase = createClient();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="w-full border-b border-gray-200 bg-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-2xl font-bold text-orange-600">
            TigFin
          </Link>
          <div className="hidden md:flex gap-6 ml-10">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive("/dashboard") ? "text-orange-600" : "text-gray-700 hover:text-orange-600"}`}
            >
              <BarChart3 className="h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/dashboard/finances"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive("/dashboard/finances") ? "text-orange-600" : "text-gray-700 hover:text-orange-600"}`}
            >
              <DollarSign className="h-4 w-4" />
              Finances
            </Link>
            <Link
              href="/dashboard/projects"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive("/dashboard/projects") ? "text-orange-600" : "text-gray-700 hover:text-orange-600"}`}
            >
              <FileText className="h-4 w-4" />
              Projects
            </Link>
            <Link
              href="/dashboard/clients"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive("/dashboard/clients") ? "text-orange-600" : "text-gray-700 hover:text-orange-600"}`}
            >
              <Users className="h-4 w-4" />
              Clients
            </Link>
            <Link
              href="/dashboard/tasks"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive("/dashboard/tasks") ? "text-orange-600" : "text-gray-700 hover:text-orange-600"}`}
            >
              <ListTodo className="h-4 w-4" />
              Tasks
            </Link>
            <Link
              href="/dashboard/reports"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive("/dashboard/reports") ? "text-orange-600" : "text-gray-700 hover:text-orange-600"}`}
            >
              <BarChart3 className="h-4 w-4" />
              Reports
            </Link>
            <Link
              href="/dashboard/team"
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${isActive("/dashboard/team") ? "text-orange-600" : "text-gray-700 hover:text-orange-600"}`}
            >
              <Users className="h-4 w-4" />
              Team
            </Link>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <NotificationPanel />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <UserCircle className="h-6 w-6 text-orange-600" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/profile")}
                className="cursor-pointer"
              >
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => router.push("/dashboard/notifications")}
                className="cursor-pointer"
              >
                Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await supabase.auth.signOut();
                  router.refresh();
                }}
                className="cursor-pointer"
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
