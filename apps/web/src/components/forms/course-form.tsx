"use client";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { courseFormSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Course } from "../../lib/types";
import { useEffect } from "react";
import { slugify } from "@/lib/utils";

export const CourseForm = ({
  course,
  onSubmit,
}: {
  onSubmit: (data: z.infer<typeof courseFormSchema>) => void;
  course?: Course;
}) => {
  const form = useForm<z.infer<typeof courseFormSchema>>({
    defaultValues: {
      name: course?.name || "",
      slug: course?.slug || "",
      about: course?.about || "",
      difficulty: course?.difficulty || "BEGINNER",
      category: course?.category || "WEB_DEVELOPMENT",
    },
    resolver: zodResolver(courseFormSchema),
  });

  // reset form for modal
  useEffect(() => {
    if (course) {
      form.reset({
        name: course.name,
        slug: course.slug,
        about: course.about ?? "",
        difficulty: course.difficulty,
        category: course.category,
      });
    }
  }, [course, form]);

  const name = useWatch({ control: form.control, name: "name" });
  const slugTouched = form.formState.dirtyFields.slug;
  useEffect(() => {
    // if editing existing course, don't auto-generate
    if (course) return;

    // if user already typed slug manually, don't overwrite
    if (slugTouched) return;

    if (name) {
      form.setValue("slug", slugify(name), {
        shouldValidate: true,
      });
    }
  }, [name, slugTouched, course, form]);

  return (
    <form id="course-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Name *</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="React Basics"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="slug"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Slug *</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="learncode.id/courses/slug"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="about"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Description *</FieldLabel>
                <Textarea
                  {...field}
                  id={field.name}
                  placeholder="Enter course description here"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <div className="flex flex-row gap-4 items-center justify-between">
            <Controller
              name="difficulty"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Difficulty Level *
                  </FieldLabel>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Pilih Tingkat Kesusahan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BEGINNER">Beginner</SelectItem>
                      <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
                      <SelectItem value="ADVANCED">Advance</SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* TODO: add combobox and create new category */}
            <Controller
              name="category"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Category *</FieldLabel>
                  <Select
                    value={field.value}
                    name={field.name}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger aria-invalid={fieldState.invalid}>
                      <SelectValue placeholder="Pilih Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="WEB_DEVELOPMENT">
                        Web Development
                      </SelectItem>
                      <SelectItem value="DATA_SCIENCE">Data Science</SelectItem>
                      <SelectItem value="PROGRAMMING_LANGUAGE">
                        Programming Language
                      </SelectItem>
                      <SelectItem value="DEVOPS">Devops</SelectItem>
                      <SelectItem value="MOBILE_DEVELOPMENT">
                        Mobile Development
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </div>
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
