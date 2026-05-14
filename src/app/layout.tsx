import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import WhatsappFloat from "@/components/WhatsappFloat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diginfo - Digital Information Hub",
  description: "Your go-to source for digital information and services.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutClient>{children}</LayoutClient>
        <WhatsappFloat />
      </body>
    </html>
  );
}