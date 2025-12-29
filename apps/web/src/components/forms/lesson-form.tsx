"use client";

import Editor from "@monaco-editor/react";
import { lessonFormSchema } from "@/lib/zod-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { Lesson } from "../../../../backend/generated/prisma/client";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { Textarea } from "../ui/textarea";
import { useEffect } from "react";

// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";

export const LessonForm = ({
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
      content: lesson?.content || "",
      instructions: lesson?.instructions || "",
      startedCode: lesson?.startedCode || "",
      solution: lesson?.solution || "",
    },
    resolver: zodResolver(lessonFormSchema),
  });

  const editor = useCreateBlockNote({
    initialContent: Array.from({ length: 7 }, () => ({
      type: "paragraph",
    })),
  });

  useEffect(() => {
    if (!lesson?.content) return;

    try {
      const parsed = JSON.parse(lesson.content);

      editor.replaceBlocks(editor.document, parsed);
      form.setValue("content", lesson.content);
    } catch (e) {
      console.error("Invalid lesson content", e);
    }
  }, [lesson, editor, form]);

  return (
    <form
      className="mt-5"
      id="lesson-form"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="flex gap-4">
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
                <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="learncode.id/courses/js-basic/jsx-basic/slug"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        {/* TODO: add md rich text editor */}
        <Controller
          name="content"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Konten</FieldLabel>
              <BlockNoteView
                editor={editor}
                onChange={() => {
                  const json = JSON.stringify(editor.document);
                  field.onChange(json);
                }}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="instructions"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Instruksi soal</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                placeholder="Masukkan instruksi soal"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        {/* TODO: add code editor */}
        <div className="flex gap-4">
          <Controller
            name="startedCode"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Started Code</FieldLabel>
                <Editor
                  height="300px"
                  language="javascript"
                  theme="vs-dark"
                  value={field.value}
                  onChange={(value) => field.onChange(value ?? "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name="solution"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Solution</FieldLabel>
                <Editor
                  height="300px"
                  language="javascript"
                  theme="vs-dark"
                  value={field.value}
                  onChange={(value) => field.onChange(value ?? "")}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    wordWrap: "on",
                    scrollBeyondLastLine: false,
                  }}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>
        {/* <Controller
          name="language"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Bahasa Pemrograman</FieldLabel>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih bahasa pemrograman" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="JAVASCRIPT">Javascript</SelectItem>
                  <SelectItem value="PYTHON">Python</SelectItem>
                  <SelectItem value="GOLANG">Go</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        /> */}
      </FieldGroup>
    </form>
  );
};
