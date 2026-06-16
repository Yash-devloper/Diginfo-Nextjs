import type { Metadata } from "next";
import GrowPageClient from "./GrowPageClient";

export const metadata: Metadata = {
  title: "Grow Your Business | Diginfo",
  description:
    "Share your business details with Diginfo and get a growth consultation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function GrowPage() {
  return <GrowPageClient />;
}
