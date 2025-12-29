import { LoginForm } from "@/components/auth/login-form";
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
        {/* card header */}
        <CardHeader className="border-b">
          <CardTitle>Login ke akunmu</CardTitle>
          <CardDescription>
            Masukkan email dan password dibawah ini untuk masuk
          </CardDescription>
        </CardHeader>

        {/* card content */}
        <CardContent>
          <LoginForm />
        </CardContent>

        {/* card footer */}
        <CardFooter className="block space-y-2">
          <div className="flex items-center gap-4">
            <Separator className="flex-1" />
            <span className="text-muted-foreground text-xs">atau</span>
            <Separator className="flex-1" />
          </div>
          <SocialLogin />
          <CardDescription>
            Belum punya akun?
            <Button asChild variant="link">
              <Link href="/register"> Daftar</Link>
            </Button>
          </CardDescription>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;
