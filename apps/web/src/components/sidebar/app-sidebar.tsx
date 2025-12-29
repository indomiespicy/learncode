import { Sidebar } from "@/components/ui/sidebar";
import { SidebarContent } from "./sidebar-content";
import { SidebarFooter } from "./sidebar-footer";
import { User } from "better-auth";
import { SidebarHeader } from "./sidebar-header";

export async function AppSidebar({ user }: { user: User }) {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader />
      <SidebarContent />
      <SidebarFooter user={user} />
    </Sidebar>
  );
}
