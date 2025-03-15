import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  DollarSign,
  FileText,
  Filter,
  ListTodo,
  MoreHorizontal,
  Plus,
  Search,
  Tag,
  Users,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TaskManagement() {
  // This would typically come from a database query
  const tasks = [
    {
      id: "1",
      title: "Complete financial report for Q2",
      description: "Analyze and compile financial data for the second quarter",
      status: "in-progress",
      priority: "high",
      dueDate: "2023-07-30",
      assignedTo: "John Smith",
      category: "Finance",
    },
    {
      id: "2",
      title: "Client onboarding - ABC Corporation",
      description: "Set up new client account and initial documentation",
      status: "to-do",
      priority: "medium",
      dueDate: "2023-08-05",
      assignedTo: "Sarah Johnson",
      category: "Client Management",
    },
    {
      id: "3",
      title: "Update project timeline for Website Redesign",
      description: "Revise project milestones based on client feedback",
      status: "to-do",
      priority: "medium",
      dueDate: "2023-07-28",
      assignedTo: "Michael Brown",
      category: "Project Management",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-orange-100 text-orange-800";
      case "to-do":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-orange-100 text-orange-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Count tasks by status
  const todoCount = tasks.filter((task) => task.status === "to-do").length;
  const inProgressCount = tasks.filter(
    (task) => task.status === "in-progress",
  ).length;
  const completedCount = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  return (
    <main className="w-full bg-gray-50 p-6 rounded-lg">
      <div className="container mx-auto flex flex-col gap-8">
        {/* Header Section */}
        <header className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Task Management</h1>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="h-4 w-4 mr-2" /> Create New Task
            </Button>
          </div>
          <div className="bg-orange-50 text-sm p-3 px-4 rounded-lg text-orange-800 border border-orange-200 flex gap-2 items-center">
            <ListTodo size={14} />
            <span>Manage your tasks, track progress, and meet deadlines</span>
          </div>
        </header>

        {/* Task Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">To Do</p>
                  <h3 className="text-2xl font-bold mt-1">{todoCount}</h3>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <ListTodo className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    In Progress
                  </p>
                  <h3 className="text-2xl font-bold mt-1">{inProgressCount}</h3>
                </div>
                <div className="bg-orange-100 p-3 rounded-full">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Completed</p>
                  <h3 className="text-2xl font-bold mt-1">{completedCount}</h3>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Search tasks..." className="pl-10 w-full" />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white">
                  <Filter className="h-4 w-4 mr-2" /> Status
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Tasks</DropdownMenuItem>
                <DropdownMenuItem>To Do</DropdownMenuItem>
                <DropdownMenuItem>In Progress</DropdownMenuItem>
                <DropdownMenuItem>Completed</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white">
                  <Tag className="h-4 w-4 mr-2" /> Priority
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>All Priorities</DropdownMenuItem>
                <DropdownMenuItem>High</DropdownMenuItem>
                <DropdownMenuItem>Medium</DropdownMenuItem>
                <DropdownMenuItem>Low</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Tasks List */}
        <Card>
          <CardHeader>
            <CardTitle>All Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Task
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Category
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Assigned To
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Due Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Priority
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-sm">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-sm">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((task) => (
                    <tr
                      key={task.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium">{task.title}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {task.description}
                        </div>
                      </td>
                      <td className="py-3 px-4">{task.category}</td>
                      <td className="py-3 px-4">{task.assignedTo}</td>
                      <td className="py-3 px-4">{formatDate(task.dueDate)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                            task.priority,
                          )}`}
                        >
                          {task.priority.charAt(0).toUpperCase() +
                            task.priority.slice(1)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                            task.status,
                          )}`}
                        >
                          {task.status === "to-do"
                            ? "To Do"
                            : task.status === "in-progress"
                              ? "In Progress"
                              : "Completed"}
                        </span>
                      </td>
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

        {/* Task Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Task Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  name: "Finance",
                  count: tasks.filter((t) => t.category === "Finance").length,
                  color: "bg-blue-100 border-blue-300",
                  icon: <DollarSign className="h-5 w-5 text-blue-600" />,
                },
                {
                  name: "Project Management",
                  count: tasks.filter(
                    (t) => t.category === "Project Management",
                  ).length,
                  color: "bg-purple-100 border-purple-300",
                  icon: <FileText className="h-5 w-5 text-purple-600" />,
                },
                {
                  name: "Client Management",
                  count: tasks.filter((t) => t.category === "Client Management")
                    .length,
                  color: "bg-orange-100 border-orange-300",
                  icon: <Users className="h-5 w-5 text-orange-600" />,
                },
              ].map((category, index) => (
                <Card
                  key={index}
                  className={`border-2 ${category.color} hover:shadow-md transition-shadow`}
                >
                  <CardContent className="p-4 flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <p className="text-sm text-gray-500">
                        {category.count} tasks
                      </p>
                    </div>
                    <div
                      className={
                        category.color
                          .replace("bg-", "bg-")
                          .replace("100", "200") + " p-2 rounded-full"
                      }
                    >
                      {category.icon}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
