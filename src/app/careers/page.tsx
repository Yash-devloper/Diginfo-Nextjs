import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers at Diginfo | Graduate & Experienced Openings",
  description:
    "Explore graduate and experienced career openings at Diginfo and apply directly by email.",
};

export default function CareersPage() {
  return <CareersClient />;
}
