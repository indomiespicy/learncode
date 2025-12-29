"use client";

import { GoogleIcon } from "@/components/icons/google";
import { Button } from "../ui/button";
import { signIn } from "@/lib/auth-client";

// import { FacebookIcon } from "@/components/icons/facebook";
// import { TwitterIcon } from "../icons/twitter";

export const SocialLogin = () => {
  return (
    <div className="flex flex-col gap-2 text-muted-foreground">
      <Button
        onClick={() => signIn.social({ provider: "google" })}
        variant="outline"
        className="w-full gap-2"
      >
        <GoogleIcon />
        Masuk dengan Google
      </Button>
      {/* <Button variant="outline" className="w-full gap-2">
        <FacebookIcon />
        Masuk dengan Facebook
      </Button>
      <Button variant="outline" className="w-full gap-2">
        <TwitterIcon />
        Masuk dengan Twitter
      </Button> */}
    </div>
  );
};
