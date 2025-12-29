import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth-client";

const DashboardPage = async () => {
  const session = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (!session.data) {
    redirect("/login?reason=unauthorized");
  }
  return (
    <div>
      Hello {session.data.user.name}
      Hello {session.data.user.role}
      <div></div>
    </div>
  );
};

export default DashboardPage;
