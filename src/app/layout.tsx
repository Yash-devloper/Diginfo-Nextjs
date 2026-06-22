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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];
            w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WRW55GHF');
          `}
        </Script>
      </head>

      <body className={inter.className}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WRW55GHF"
            height="0"
            width="0"
            style={{
              display: "none",
              visibility: "hidden",
            }}
          />
        </noscript>

        <LayoutClient>{children}</LayoutClient>
        <WhatsappFloat />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YJV5LEKNXB"
          strategy="lazyOnload"
        />

        <Script id="google-analytics" strategy="lazyOnload">
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
