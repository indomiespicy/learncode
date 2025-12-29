"use client";

import { lessonFormSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, useWatch } from "react-hook-form";
import z from "zod";
import { Lesson } from "../../lib/types";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/shadcn/style.css";
import { useEffect } from "react";
import { slugify } from "@/lib/utils";

export const CreateLessonForm = ({
  onSubmit,
  lesson,
}: {
  onSubmit: (lesson: z.infer<typeof lessonFormSchema>) => void;
  lesson?: Lesson;
}) => {
  const form = useForm<z.infer<typeof lessonFormSchema>>({
    defaultValues: {
      name: lesson?.name || "",
      slug: lesson?.slug || "",
    },
    resolver: zodResolver(lessonFormSchema),
  });

  // auto write for slug
  const name = useWatch({ control: form.control, name: "name" });
  const slugTouched = form.formState.dirtyFields.slug;
  useEffect(() => {
    if (lesson) return;

    // if user already typed slug manually, don't overwrite
    if (slugTouched) return;

    if (name) {
      form.setValue("slug", slugify(name), {
        shouldValidate: true,
      });
    }
  }, [name, slugTouched, lesson, form]);

  return (
    <form id="lesson-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Nama Pelajaran</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                placeholder="Apa itu React"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="slug"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
              <Input
                {...field}
                id={field.name}
                type="text"
                placeholder="learncode.id/courses/js-basic/jsx-basic/slug"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
};
