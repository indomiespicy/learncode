import { Controller, useForm } from "react-hook-form";
import { TestCase } from "../../lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { testCaseFormSchema } from "@/lib/zod-schema";
import z from "zod";
import { Field, FieldError, FieldGroup, FieldLabel } from "../ui/field";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

export const TestCaseForm = ({
  testCase,
  onSubmit,
}: {
  testCase?: TestCase;
  onSubmit: (data: z.infer<typeof testCaseFormSchema>) => void;
}) => {
  const form = useForm({
    defaultValues: {
      input: testCase?.input || "",
      expectedOutput: testCase?.expectedOutput || "",
      isHidden: testCase?.isHidden || false,
    },
    resolver: zodResolver(testCaseFormSchema),
  });

  return (
    <form id="test-case-form" onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <Controller
          name="input"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field>
              <FieldLabel>Input Test Case</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                placeholder="Masukkan input untuk test case"
                aria-invalid={fieldState.invalid}
                rows={4}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="expectedOutput"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Expected Output</FieldLabel>
              <Textarea
                {...field}
                id={field.name}
                placeholder="Masukkan output yang diharapkan untuk test case"
                aria-invalid={fieldState.invalid}
                rows={4}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="isHidden"
          control={form.control}
          render={({ field }) => (
            <Field>
              <div className="flex items-center space-x-2">
                <Switch
                  id="isHidden"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-checked={field.value}
                />
                <Label htmlFor={field.name}>Sembunyikan Test Case</Label>
              </div>
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  );
};
