import { queryOptions } from "@tanstack/react-query";
import { Module } from "./types";
import { CourseWithModulesAndLessons, CourseWithModulesCount } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

export const api = async <T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> => {
  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!res.ok) {
    // parse the error message from NestJS
    const errorData = await res.json().catch(() => null);
    const message = errorData?.message
      ? Array.isArray(errorData.message)
        ? errorData.message.join(", ")
        : errorData.message
      : `API error: ${res.status}`;

    throw new Error(message);
  }

  return res.json();
};

export const coursesOptions = queryOptions({
  queryKey: ["courses"],
  queryFn: () => api<CourseWithModulesCount[]>("/courses"),
});

export const courseBySlugOptions = (slug: string) =>
  queryOptions({
    queryKey: ["courses", slug],
    queryFn: () => api<CourseWithModulesAndLessons>(`/courses/${slug}`),
    enabled: !!slug,
  });

export const moduleOptions = (slug: string, courseId: string) =>
  queryOptions({
    queryKey: ["modules", slug, courseId],
    queryFn: () => api<Module>(`/modules/${slug}?${courseId}`),
    enabled: !!slug,
  });
