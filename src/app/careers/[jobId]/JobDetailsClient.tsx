"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { Job } from "@/lib/jobs";
import { getActiveJob } from "@/lib/jobClient";

type JobResponse = {
  job: Job;
  applicationEmail: string;
};

const jobApplicationEmail = "yash.sharma@diginfoexpert.com";

export default function JobDetailsClient({ jobId }: { jobId: string }) {
  const [data, setData] = useState<JobResponse | null>(null);
  const [status, setStatus] = useState<"loading" | "not-found" | "error">("loading");

  useEffect(() => {
    let mounted = true;

    const loadJob = async () => {
      try {
        const job = await getActiveJob(jobId);
        if (!mounted) return;

        if (!job) {
          setStatus("not-found");
          return;
        }

        setData({ job, applicationEmail: jobApplicationEmail });
      } catch {
        if (mounted) setStatus("error");
      }
    };

    void loadJob();

    return () => {
      mounted = false;
    };
  }, [jobId]);

  if (!data) {
    return (
      <main className="job-details-page">
        <section className="job-details-status wrap">
          <Link href="/careers" className="job-back"><ArrowLeft size={17} /> Back to careers</Link>
          <h1>{status === "loading" ? "Loading job opening..." : status === "not-found" ? "This job is no longer available." : "We could not load this job opening."}</h1>
          {status !== "loading" && <p>Please return to the careers page to view the current openings.</p>}
        </section>
      </main>
    );
  }

  const { job, applicationEmail: applyToEmail } = data;
  const subject = encodeURIComponent(`Application for ${job.title}`);
  const body = encodeURIComponent(
    `Hello Diginfo Team,\n\nI would like to apply for the ${job.title} role. Please find my resume attached.\n\nRegards,`
  );
  const applyLink = `mailto:${applyToEmail}?subject=${subject}&body=${body}`;

  return (
    <main className="job-details-page">
      <section className="job-details-hero">
        <div className="wrap">
          <Link href="/careers#openings" className="job-back"><ArrowLeft size={17} /> Back to openings</Link>
          <span className="job-details-type">{job.employmentType}</span>
          <h1>{job.title}</h1>
          <div className="job-details-meta">
            <span>{job.candidateType}</span>
            {/* <span>{formatExperience(job.experienceRequired)}</span> */}
            <span><MapPin size={18} /> {job.location}</span>
          </div>
        </div>
      </section>

      <section className="job-details-content">
        <div className="wrap job-details-content-inner">
          <div>
            <span className="job-details-label">About the role</span>
            <h2>Make your next move count.</h2>
            <p className="job-description">{job.description}</p>
          </div>
          <aside className="job-apply-card">
            <h2>Ready to apply?</h2>
            <p>Send your resume to our hiring team and mention the role in your application.</p>
            <a className="job-apply-btn" href={applyLink}>Apply by email <span aria-hidden="true">→</span></a>
          </aside>
        </div>
      </section>
    </main>
  );
}
