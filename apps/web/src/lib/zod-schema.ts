import {
  CourseCategory,
  Difficulty,
} from "@/../../backend/generated/prisma/enums";
import z from "zod";

export const courseFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  about: z.string().min(1, "Description is required"),

  difficulty: z.enum(Difficulty),
  category: z.enum(CourseCategory),
});

export const moduleFormSchema = z.object({
  name: z.string().min(1, "Name tidak boleh kosong"),
  slug: z.string().min(1, "Slug tidak boleh kosong"),
});

export const lessonFormSchema = z.object({
  name: z.string().min(1, "Name tidak boleh kosong"),
  slug: z.string().min(1, "Slug tidak boleh kosong"),
  content: z.string().optional(),

  // excercise
  instructions: z.string().optional(),
  startedCode: z.string().optional(),
  solution: z.string().optional(),
  // language: z.string().optional(),
});

export const testCaseFormSchema = z.object({
  input: z.string().optional(),
  expectedOutput: z
    .string()
    .min(1, "Output tidak boleh kosong")
    .max(1000, "Output terlalu panjang"),
  isHidden: z.boolean().default(false),
});
