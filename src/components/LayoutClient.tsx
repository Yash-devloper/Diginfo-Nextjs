"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";

export default function LayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // ✅ Detect admin routes
  const isAdmin = pathname.startsWith("/admin");
  const isGrowLanding = pathname === "/grow";
  const isNewsletterLanding = pathname === "/newsletter";
  const isStandaloneLanding = isGrowLanding || isNewsletterLanding;

  return (
    <>
      <Toaster
        position="top-right"
        containerStyle={{
          top: 92,
          zIndex: 9999,
        }}
      />

      {/* Show Navbar only for public pages */}
      {!isAdmin && !isStandaloneLanding && <Navbar />}

      {children}

      {/* Show Footer only for public pages */}
      {!isAdmin && !isStandaloneLanding && <Footer />}
    </>
  );
}
