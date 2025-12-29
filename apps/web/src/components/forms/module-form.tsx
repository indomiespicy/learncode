"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { moduleFormSchema } from "@/lib/zod-schema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { Module } from "../../lib/types";
import { useEffect } from "react";
import { slugify } from "@/lib/utils";

// TODO: edit slug to display text /course/{slug} on input

export const ModuleForm = ({
  module,
  onSubmit,
}: {
  module?: Module;
  onSubmit: (data: z.infer<typeof moduleFormSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof moduleFormSchema>>({
    defaultValues: {
      name: module?.name || "",
      slug: module?.slug || "",
    },
    resolver: zodResolver(moduleFormSchema),
  });

  // auto write for slug
  const name = useWatch({ control: form.control, name: "name" });
  const slugTouched = form.formState.dirtyFields.slug;
  useEffect(() => {
    if (module) return;

    // if user already typed slug manually, don't overwrite
    if (slugTouched) return;

    if (name) {
      form.setValue("slug", slugify(name), {
        shouldValidate: true,
      });
    }
  }, [name, slugTouched, module, form]);

  return (
    <form id="module-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldSet>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Nama</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="Pengenalan JSX"
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
                  placeholder="learncode.id/courses/js-basic/slug"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
