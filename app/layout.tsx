import "@/styles/globals.css";

import type { Metadata } from "next";
import { Chivo } from "next/font/google";

import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontSans = Chivo({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "Readx",
  description: "Transformando leituras em experiências compartilhadas!",
  creator: "Leonardo Nicola"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={cn(
          "bg-bg min-h-screen font-sans antialiased",
          fontSans.variable
        )}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
