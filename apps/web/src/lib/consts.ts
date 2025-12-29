import { BarChartBig, BookCopy, LayoutDashboard, User } from "lucide-react";

export const navigation = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/learn" },
  { title: "My Learning", icon: BookCopy, url: "/learn/learning" },
];

export const adminNavigation = [
  { title: "Dashboard", icon: LayoutDashboard, url: "/admin" },
  { title: "Courses", icon: BookCopy, url: "/admin/courses" },
  { title: "Users", icon: User, url: "/admin/users" },
  { title: "Analytics", icon: BarChartBig, url: "/admin/analytics" },
];
