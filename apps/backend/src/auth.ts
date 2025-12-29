import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { PrismaService } from './prisma.service';
import { admin } from 'better-auth/plugins';
import { sendEmail } from './email';

const prisma = new PrismaService();

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, token }) => {
      const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
      const resetUrl = `${frontendUrl}/reset-password?token=${token}`;
      void sendEmail({
        to: user.email,
        subject: 'Reset Password Anda',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Reset Password</h2>
            <p>Halo ${user.name},</p>
            <p>Kami menerima permintaan untuk mereset password akun Anda.</p>
            <p>Klik tombol di bawah ini untuk mereset password Anda:</p>
            <a href="${resetUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Reset Password</a>
            <p>Jika Anda tidak meminta reset password, abaikan email ini.</p>
            <p>Link ini akan kedaluwarsa dalam 1 jam.</p>
          </div>
        `,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    sendVerificationEmail: async ({ user, token }) => {
      const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:3000';
      const verificationUrl = `${frontendUrl}/verify-email?token=${token}`;

      void sendEmail({
        to: user.email,
        subject: 'Verifikasi Email Anda',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2>Verifikasi Email</h2>
            <p>Halo ${user.name},</p>
            <p>Terima kasih telah mendaftar! Silakan verifikasi alamat email Anda dengan mengklik tombol di bawah ini:</p>
            <a href="${verificationUrl}" style="display: inline-block; background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 16px 0;">Verifikasi Email</a>
            <p>Jika Anda tidak membuat akun ini, abaikan email ini.</p>
          </div>
        `,
      });
    },
    autoSignInAfterVerification: true,
  },
  plugins: [admin()],
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        defaultValue: 'user',
      },
    },
  },
  baseURL: process.env.BETTER_AUTH_URL,

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      redirectURI: `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
  trustedOrigins: ['http://localhost:3000'],
});
