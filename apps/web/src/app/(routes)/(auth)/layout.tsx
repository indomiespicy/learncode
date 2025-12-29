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
    // Redirect based on user role
    const isAdmin = session.data.user.role === "admin";
    redirect(isAdmin ? "/admin" : "/learn");
  }
  return children;
};

export default AuthLayout;