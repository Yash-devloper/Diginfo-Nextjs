import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutClient from "@/components/LayoutClient";
import WhatsappFloat from "@/components/WhatsappFloat";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Diginfo - Digital Information Hub",
  description: "Your go-to source for digital information and services.",

  verification: {
    google: "Hjo-LbzSb-tyZu6EpL-yQ9olCXBx8jNmHheFbB60Chw",
  },

};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LayoutClient>{children}</LayoutClient>
        <WhatsappFloat />
         
          {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YJV5LEKNXB"
          strategy="afterInteractive"
        />

        <Script
          id="google-analytics"
          strategy="afterInteractive"
        >
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());

            gtag('config', 'G-YJV5LEKNXB');
          `}
        </Script>


      </body>
    </html>
  );
}