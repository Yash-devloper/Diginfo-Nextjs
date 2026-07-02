"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin } from "lucide-react";
import type { Job } from "@/lib/jobs";
import { getActiveJob } from "@/lib/jobClient";
import JobApplicationForm from "./JobApplicationForm";

export default function JobDetailsClient({ jobId }: { jobId: string }) {
  const [job, setJob] = useState<Job | null>(null);
  const [status, setStatus] = useState<"loading" | "not-found" | "error">("loading");
  const [showApplication, setShowApplication] = useState(false);

  useEffect(() => {
    let mounted = true;

    const loadJob = async () => {
      try {
        const activeJob = await getActiveJob(jobId);
        if (!mounted) return;

        if (!activeJob) {
          setStatus("not-found");
          return;
        }

        setJob(activeJob);
      } catch {
        if (mounted) setStatus("error");
      }
    };

    void loadJob();

    return () => {
      mounted = false;
    };
  }, [jobId]);

  useEffect(() => {
    if (window.location.hash === "#apply") setShowApplication(true);
  }, []);

  if (!job) {
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

  const openApplication = () => {
    setShowApplication(true);
    window.setTimeout(() => {
      document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  };

  return (
    <main className="job-details-page">
      <section className="job-details-hero">
        <div className="wrap">
          <Link href="/careers#openings" className="job-back"><ArrowLeft size={17} /> Back to openings</Link>
          <span className="job-details-type">{job.employmentType}</span>
          <h1>{job.title}</h1>
          <div className="job-details-meta">
            <span>{job.team}</span>
            <span>{job.candidateType}</span>
            {job.experienceRequired && <span>{job.experienceRequired}</span>}
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
            <p>Complete the short form and send your resume directly to our hiring team.</p>
            <button className="job-apply-btn" type="button" onClick={openApplication}>
              Apply for this role <span aria-hidden="true">&rarr;</span>
            </button>
          </aside>
        </div>
      </section>

      {showApplication && (
        <section className="job-application-section" id="apply">
          <div className="wrap">
            <JobApplicationForm jobId={job.id} jobTitle={job.title} />
          </div>
        </section>
      )}
    </main>
  );
}
