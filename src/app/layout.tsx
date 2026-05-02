import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "MTD Client Chaser — Document Collection for UK Accountants",
  description:
    "Stop chasing clients for documents. Automate document collection with smart reminders, magic upload links, and deadline tracking for MTD ITSA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={cn("antialiased", inter.className)}>{children}</body>
    </html>
  );
}
