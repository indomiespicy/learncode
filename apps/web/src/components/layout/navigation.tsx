"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { adminNavigation, navigation } from "@/lib/consts";

import { usePathname } from "next/navigation";

//TODO: fix navigation breadcrumb

export const Navigation = () => {
  const pathname = usePathname();
  const route =
    pathname === "/admin"
      ? navigation.find((item) => pathname === item.url)
      : adminNavigation.find((item) => pathname === item.url);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        {route && route.url !== "/" && (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <BreadcrumbLink href={route.url}>{route.title}</BreadcrumbLink>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </>
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
