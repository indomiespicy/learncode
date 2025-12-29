import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        {/* card header */}
        <CardHeader className="border-b">
          <CardTitle>Lupa Password?</CardTitle>
          <CardDescription>
            Masukkan email Anda dan kami akan mengirimkan link untuk reset
            password.
          </CardDescription>
        </CardHeader>

        {/* card content */}
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>

        {/* card footer */}
        <CardFooter className="block">
          <CardDescription>
            Ingat password Anda?{" "}
            <Button asChild variant="link">
              <Link href="/login">Kembali ke Login</Link>
            </Button>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
