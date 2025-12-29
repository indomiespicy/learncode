import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields } from "better-auth/client/plugins";
import { LocalAuth } from "./types";

const authClient = createAuthClient({
  baseURL:
    typeof window === "undefined"
      ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"
      : process.env.NEXT_PUBLIC_APP_URL || undefined,
  plugins: [inferAdditionalFields<LocalAuth>()],
});

export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  sendVerificationEmail,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
} = authClient;
