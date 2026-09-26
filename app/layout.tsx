import type { Metadata } from "next";
import { AuthRecoveryHandler } from "@/components/auth/auth-recovery-handler";
import "./globals.css";

export const metadata: Metadata = {
  title: "Somprasong Thunnok | Portfolio",
  description: "รวมผลงานของ Somprasong Thunnok",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="th" className="h-full antialiased">
      <body suppressHydrationWarning className="min-h-full flex flex-col">
        <AuthRecoveryHandler />
        {children}
      </body>
    </html>
  );
}
