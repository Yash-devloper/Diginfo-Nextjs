"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, FileUp, LoaderCircle, Send } from "lucide-react";
import { uploadResumeToCloudinary } from "@/lib/cloudinary";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function JobApplicationForm({
  jobId,
  jobTitle,
}: {
  jobId: string;
  jobTitle: string;
}) {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [feedback, setFeedback] = useState("");
  const [fileName, setFileName] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const resume = formData.get("resume");

    if (!(resume instanceof File) || !resume.size) {
      setStatus("error");
      setFeedback("Please attach your resume.");
      return;
    }

    if (resume.size > 5 * 1024 * 1024) {
      setStatus("error");
      setFeedback("Resume size must be 5 MB or less.");
      return;
    }

    setStatus("submitting");
    setFeedback("");

    try {
      const resumeUrl = await uploadResumeToCloudinary(resume);
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId,
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          portfolioUrl: formData.get("portfolioUrl"),
          message: formData.get("message"),
          website: formData.get("website"),
          resumeUrl,
        }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to submit your application.");
      }

      setStatus("success");
      setFeedback(result.message || "Application submitted successfully.");
      setFileName("");
      form.reset();
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "Unable to submit your application. Please try again."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="job-application-success" role="status">
        <CheckCircle2 size={42} />
        <h3>Application received</h3>
        <p>{feedback}</p>
      </div>
    );
  }

  return (
    <form className="job-application-form" onSubmit={handleSubmit}>
      <div className="job-application-heading">
        <span>Apply now</span>
        <h2>{jobTitle}</h2>
        <p>Share your details and we&apos;ll send your application directly to our hiring team.</p>
      </div>

      <div className="job-application-grid">
        <label>
          Full name
          <input name="name" autoComplete="name" maxLength={100} required />
        </label>
        <label>
          Email address
          <input name="email" type="email" autoComplete="email" maxLength={254} required />
        </label>
        <label>
          Phone number
          <input name="phone" type="tel" autoComplete="tel" maxLength={30} required />
        </label>
        <label>
          Portfolio / showreel URL <small>Optional</small>
          <input name="portfolioUrl" type="url" placeholder="https://" maxLength={500} />
        </label>
        <label className="job-application-file">
          Resume <small>PDF, DOC or DOCX - max 5 MB</small>
          <span>
            <FileUp size={19} /> {fileName || "Choose your resume"}
          </span>
          <input
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={(event) => setFileName(event.target.files?.[0]?.name || "")}
            required
          />
        </label>
        <label className="job-application-message">
          Why are you a good fit? <small>Optional</small>
          <textarea name="message" rows={5} maxLength={2000} />
        </label>
      </div>

      <label className="job-application-honeypot" aria-hidden="true">
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>

      <button className="job-application-submit" type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? <LoaderCircle className="is-spinning" size={19} /> : <Send size={18} />}
        {status === "submitting" ? "Submitting..." : "Submit application"}
      </button>

      <p className={`job-application-feedback ${status === "error" ? "is-error" : ""}`} role="status">
        {feedback}
      </p>
    </form>
  );
}
