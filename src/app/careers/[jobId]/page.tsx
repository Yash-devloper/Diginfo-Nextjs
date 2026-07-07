import type { Metadata } from "next";
import JobDetailsClient from "./JobDetailsClient";
import "./job-details.css";

export const metadata: Metadata = {
  title: "Job Opening | Diginfo Careers",
  description: "Review this Diginfo career opportunity and apply online.",
};

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  return <JobDetailsClient jobId={jobId} />;
}
