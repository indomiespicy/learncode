import { BookCheck } from "lucide-react";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader as SidebarHeaderComponent,
} from "../ui/sidebar";
import Link from "next/link";

export const SidebarHeader = () => {
  return (
    <SidebarHeaderComponent>
      <SidebarMenu>
        <SidebarMenuItem>
          {/* logo and app name */}
          <Link href="/">
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookCheck className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-2xl ">
                <span className="truncate text-primary">LearnCode</span>
              </div>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeaderComponent>
  );
};
