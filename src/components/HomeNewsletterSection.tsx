"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function HomeNewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus("submitting");
    setMessage("");

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          website: formData.get("website"),
        }),
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "Unable to subscribe right now.");
      }

      setStatus("success");
      setMessage(
        result.message || "Welcome aboard! Check your inbox for the assessment."
      );
      setEmail("");
      form.reset();
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to subscribe right now. Please try again."
      );
    }
  }

  return (
    <section className="home-newsletter" aria-labelledby="newsletter-heading">
      <div className="home-newsletter-glow home-newsletter-glow-one" />
      <div className="home-newsletter-glow home-newsletter-glow-two" />

      <div className="wrap home-newsletter-inner">
        <div className="home-newsletter-copy">
          <span className="home-newsletter-kicker">AI BizBytes · Weekly</span>
          <h2 id="newsletter-heading">
            Be the brand <span className="gt">AI recommends.</span>
          </h2>
          <p>
            Sharp, practical playbooks for SEO, performance, and AI-search
            visibility—delivered in a three-minute weekly read.
          </p>

          <div className="home-newsletter-benefits" aria-label="Newsletter benefits">
            <span>One email a week</span>
            <span>No fluff</span>
            <span>Unsubscribe anytime</span>
          </div>
        </div>

        <div className="home-newsletter-card">
          <span className="home-newsletter-free">Free subscriber bonus</span>
          <h3>Get your AI-Search Readiness Assessment</h3>
          <p>
            Subscribe and we&apos;ll immediately email you the 20-point assessment
            used to evaluate whether AI can find and cite your brand.
          </p>

          <form className="home-newsletter-form" onSubmit={handleSubmit}>
            <label htmlFor="home-newsletter-email">Business email</label>
            <div className="home-newsletter-fields">
              <input
                id="home-newsletter-email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                disabled={status === "submitting"}
                required
              />
              <button type="submit" disabled={status === "submitting"}>
                {status === "submitting" ? "Sending…" : "Subscribe free →"}
              </button>
            </div>

            <div className="home-newsletter-honeypot" aria-hidden="true">
              <label htmlFor="home-newsletter-website">Website</label>
              <input
                id="home-newsletter-website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <p
              className={`home-newsletter-status ${
                status === "error" ? "is-error" : ""
              }`}
              role="status"
              aria-live="polite"
            >
              {message}
            </p>
          </form>

          <p className="home-newsletter-privacy">
            By subscribing, you agree to our{" "}
            <Link href="/privacy-policy">Privacy Policy</Link>.
          </p>
        </div>
      </div>
    </section>
  );
}
