"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { sendVerificationEmail } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

const CheckEmailPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);

  const handleResend = async () => {
    if (!email) {
      toast.error("Email tidak ditemukan. Silakan daftar ulang.");
      return;
    }

    setIsResending(true);
    const { error } = await sendVerificationEmail({
      email,
      callbackURL: "/learn",
    });

    setIsResending(false);

    if (error) {
      toast.error(error.message ?? "Gagal mengirim email verifikasi.");
      return;
    }

    setResent(true);
    toast.success("Email verifikasi berhasil dikirim ulang!");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="border-b text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Mail className="h-8 w-8 text-primary" />
          </div>
          <CardTitle>Cek Email Anda</CardTitle>
          <CardDescription>
            Kami telah mengirim link verifikasi ke email Anda
          </CardDescription>
        </CardHeader>

        <CardContent className="py-6">
          <div className="text-center space-y-4">
            {email && (
              <p className="text-sm text-muted-foreground">
                Email verifikasi telah dikirim ke{" "}
                <span className="font-medium text-foreground">{email}</span>
              </p>
            )}
            <p className="text-sm text-muted-foreground">
              Silakan cek inbox email Anda dan klik link verifikasi untuk
              mengaktifkan akun Anda. Jika tidak menemukan email, cek folder
              spam.
            </p>

            {resent && (
              <div className="flex items-center justify-center gap-2 text-green-600">
                <CheckCircle2 className="h-4 w-4" />
                <span className="text-sm">Email berhasil dikirim ulang!</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-3">
          <Button
            onClick={handleResend}
            disabled={isResending || !email}
            variant="outline"
            className="w-full"
          >
            {isResending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Mengirim...
              </>
            ) : (
              "Kirim Ulang Email Verifikasi"
            )}
          </Button>
          <Button asChild variant="ghost" className="w-full">
            <Link href="/login">Kembali ke Login</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CheckEmailPage;
