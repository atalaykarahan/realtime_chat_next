import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "./redux/provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Realtime Chat App",
  description: "Alper ve Atalay tarafından yapıldı",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="tr">
        <body className={inter.className}>
          <ReduxProvider>{children}</ReduxProvider>
          <Toaster richColors />
        </body>
      </html>
    </SessionProvider>
  );
}
