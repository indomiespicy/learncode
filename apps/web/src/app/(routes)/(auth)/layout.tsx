import { getSession } from "@/lib/auth-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

const AuthLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getSession({
    fetchOptions: {
      headers: await headers(),
    },
  });

  if (session?.data) {
    redirect("/learn");
  }
  return children;
};

export default AuthLayout;
