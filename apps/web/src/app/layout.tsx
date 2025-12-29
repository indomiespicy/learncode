import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/providers/theme-providers";
import TanstackQueryProvider from "@/providers/tanstack-query-provider";
import { ModalProviders } from "@/providers/modal-providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans-alt",
  display: "swap",
});
export const metadata: Metadata = {
  title: "LearnCode",
  description:
    "Platform coding berbahasa Indonesia untuk belajar dan berlatih pemrograman dengan mudah.",
};

//TODO: use english maybe for programming and indo for ui
// TODO: add back navigation
// TODO: add skeleton lazy loading
// TODO: edit slug to auto for lessons and modules
// TODO: make a order func

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={`${dmSans.variable} ${inter.variable} antialiased`}
      >
        <TanstackQueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
            <Toaster position="top-right" />
            <ModalProviders />
          </ThemeProvider>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
