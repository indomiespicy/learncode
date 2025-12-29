import { RegisterForm } from "@/components/auth/register-form";
import { SocialLogin } from "@/components/auth/social-login";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
const LoginPage = () => {
  return (
    <div className=" w-full min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-md">
        {/* header */}
        <CardHeader className="border-b">
          <CardTitle>Buat akun baru untuk memulai</CardTitle>
          <CardDescription>
            Isi form dibawah ini untuk mulai gratis
          </CardDescription>
        </CardHeader>

        {/* content */}
        <CardContent>
          <RegisterForm />
        </CardContent>

        {/* footer */}
        <CardFooter className="block space-y-2">
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-xs">atau</span>
            <Separator className="flex-1" />
          </div>
          <SocialLogin />
          <CardDescription>
            Sudah punya akun?
            <Button asChild variant="link">
              <Link href="/login">Login</Link>
            </Button>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
