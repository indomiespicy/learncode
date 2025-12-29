"use client";

import {
  SidebarContent as SidebarContentComponent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { adminNavigation, navigation } from "@/lib/consts";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const SidebarContent = () => {
  const pathname = usePathname();
  let route;
  if (pathname.startsWith("/admin")) {
    route = adminNavigation;
  } else {
    route = navigation;
  }
  return (
    <SidebarContentComponent>
      <SidebarGroup />
      <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {route.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Link href={item.url}>
                  <item.icon /> <span className="ml-2">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
      <SidebarGroup />
    </SidebarContentComponent>
  );
};
