import { Navbar } from "@/components/layout/navbar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const AdminDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (session.data?.user.role !== "admin") {
    redirect("/login");
  }
  return (
    <>
      <SidebarProvider>
        <AppSidebar user={session.data.user} />
        <SidebarInset>
          {/* layout */}
          <Navbar />
          <div className="m-4 p-4">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
};

export default AdminDashboardLayout;
