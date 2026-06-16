"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Reveal from "./Reveal";
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

  return (
    <>
      <Reveal />
      <Toaster
        position="top-right"
        containerStyle={{
          top: 92,
          zIndex: 9999,
        }}
      />

      {/* Show Navbar only for public pages */}
      {!isAdmin && !isGrowLanding && <Navbar />}

      {children}

      {/* Show Footer only for public pages */}
      {!isAdmin && !isGrowLanding && <Footer />}
    </>
  );
}
