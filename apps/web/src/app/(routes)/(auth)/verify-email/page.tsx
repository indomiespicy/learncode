"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { verifyEmail } from "@/lib/auth-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

const VerifyEmailPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("error");
        setErrorMessage("Token verifikasi tidak ditemukan.");
        return;
      }

      const { error } = await verifyEmail({
        query: { token },
      });

      if (error) {
        setStatus("error");
        setErrorMessage(error.message ?? "Gagal memverifikasi email.");
        return;
      }

      setStatus("success");
      // Redirect to learn dashboard after 3 seconds
      setTimeout(() => {
        router.push("/learn");
      }, 3000);
    };

    verify();
  }, [token, router]);

  return (
    <div className="w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="border-b text-center">
          <CardTitle>Verifikasi Email</CardTitle>
          <CardDescription>
            {status === "loading" && "Memverifikasi email Anda..."}
            {status === "success" && "Email berhasil diverifikasi!"}
            {status === "error" && "Verifikasi gagal"}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center justify-center py-8">
          {status === "loading" && (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
              <p className="text-muted-foreground">Mohon tunggu sebentar...</p>
            </div>
          )}

          {status === "success" && (
            <div className="flex flex-col items-center gap-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
              <p className="text-center text-muted-foreground">
                Email Anda telah berhasil diverifikasi. Anda akan dialihkan ke
                dashboard dalam beberapa detik...
              </p>
              <Button asChild className="mt-4">
                <Link href="/learn">Ke Dashboard</Link>
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-4">
              <XCircle className="h-16 w-16 text-destructive" />
              <p className="text-center text-muted-foreground">
                {errorMessage}
              </p>
              <div className="flex gap-2 mt-4">
                <Button asChild variant="outline">
                  <Link href="/login">Ke Login</Link>
                </Button>
                <Button asChild>
                  <Link href="/check-email">Kirim Ulang Email</Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default VerifyEmailPage;
