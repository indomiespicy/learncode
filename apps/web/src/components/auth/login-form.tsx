"use client";

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "../ui/field";
import { Input } from "../ui/input";
import { signIn, useSession } from "@/lib/auth-client";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import Link from "next/link";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6, "Masukkan minimal 6 karakter."),
});

export const LoginForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const reason = searchParams.get("reason");
  const session = useSession();

  useEffect(() => {
    if (reason === "unauthorized") {
      toast.error("Harap login terlebih dahulu");
    }
  }, [reason]);

  useEffect(() => {
    if (session.data && !session.isPending) {
      const isAdmin = session.data.user.role === "admin";
      router.replace(isAdmin ? "/admin" : "/learn");
    }
  }, [session.data, session.isPending, router]);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async ({
    email,
    password,
  }: z.infer<typeof loginSchema>) => {
    const { error } = await signIn.email({ email, password });
    if (error) {
      // Handle email not verified error
      if (error.status === 403) {
        toast.error("Email belum diverifikasi. Silakan cek email Anda.");
        router.push(`/check-email?email=${encodeURIComponent(email)}`);
        return;
      }
      form.setError("root", { message: "Email atau password salah" });
      return;
    }
    toast.success("Login berhasil!");
  };

  return (
    <form id="login-form" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldSet>
        <FieldGroup>
          {/* email */}
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
                  placeholder="your@email.com"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          {/* password */}
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="password"
                  placeholder="********"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Link
            href="/forgot-password"
            className="text-sm text-muted-foreground hover:underline"
          >
            Lupa password?
          </Link>
          {/* submit button */}
          <Button
            disabled={form.formState.isSubmitting}
            form="login-form"
            type="submit"
            className="w-full"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 animate-spin" /> Loading...
              </>
            ) : (
              "Login"
            )}
          </Button>
          {form.formState.errors.root && (
            <FieldError errors={[form.formState.errors.root]} />
          )}
        </FieldGroup>
      </FieldSet>
    </form>
  );
};
