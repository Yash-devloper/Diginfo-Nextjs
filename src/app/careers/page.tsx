import type { Metadata } from "next";
import CareersClient from "./CareersClient";

export const metadata: Metadata = {
  title: "Careers at Diginfo — Join Our Team",
  description:
    "Build your career across digital marketing, AI search, technology and creative at Diginfo. See current openings and apply.",
};

export default function CareersPage() {
  return <CareersClient />;
}
