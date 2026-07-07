"use client";

import { FormEvent, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  FileText,
  FileUp,
  Link2,
  LoaderCircle,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";
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
        <span className="job-application-success-icon">
          <CheckCircle2 size={42} />
        </span>
        <span>Application received</span>
        <h3>Thank you for applying.</h3>
        <p>{feedback}</p>
      </div>
    );
  }

  return (
    <form className="job-application-form" onSubmit={handleSubmit}>
      <div className="job-application-heading">
        <div>
          <span className="job-application-kicker">
            <BriefcaseBusiness size={15} /> Apply now
          </span>
          <h2>{jobTitle}</h2>
          <p>Share your profile and resume with the hiring team.</p>
        </div>
        <span className="job-application-badge">
          <Sparkles size={15} /> Fast review
        </span>
      </div>

      <div className="job-application-grid">
        <label className="job-application-field">
          <span>Full name</span>
          <div className="job-application-control">
            <UserRound size={18} />
            <input name="name" autoComplete="name" maxLength={100} placeholder="Your full name" required />
          </div>
        </label>
        <label className="job-application-field">
          <span>Email address</span>
          <div className="job-application-control">
            <Mail size={18} />
            <input name="email" type="email" autoComplete="email" maxLength={254} placeholder="you@example.com" required />
          </div>
        </label>
        <label className="job-application-field">
          <span>Phone number</span>
          <div className="job-application-control">
            <Phone size={18} />
            <input name="phone" type="tel" autoComplete="tel" maxLength={30} placeholder="+91 98765 43210" required />
          </div>
        </label>
        <label className="job-application-field">
          <span>Portfolio / showreel URL <small>Optional</small></span>
          <div className="job-application-control">
            <Link2 size={18} />
            <input name="portfolioUrl" type="url" placeholder="https://" maxLength={500} />
          </div>
        </label>
        <label className="job-application-file">
          <span>Resume <small>PDF, DOC or DOCX - max 5 MB</small></span>
          <span>
            <FileUp size={20} />
            <strong>{fileName || "Choose your resume"}</strong>
            <small>{fileName ? "Ready to upload" : "Attach your latest CV"}</small>
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
          <span>Why are you a good fit? <small>Optional</small></span>
          <div className="job-application-textarea-wrap">
            <MessageSquareText size={18} />
            <textarea name="message" rows={5} maxLength={2000} placeholder="Tell us about the work you are proud of, your strengths, or why this role fits you." />
          </div>
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
        {status === "error" && <FileText size={16} />}
        {feedback}
      </p>
    </form>
  );
}
