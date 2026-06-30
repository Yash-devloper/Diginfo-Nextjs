"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

type NewsletterSignupFormProps = {
  id: string;
};

export default function NewsletterSignupForm({ id }: NewsletterSignupFormProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitting(true);
    setMessage("");
    setIsError(false);

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

      setEmail("");
      form.reset();
      setMessage(
        result.message || "Welcome aboard! Check your inbox for the assessment."
      );
    } catch (error) {
      setIsError(true);
      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to subscribe right now. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.signupBlock}>
      <form className={styles.signup} onSubmit={handleSubmit}>
        <label className={styles.srOnly} htmlFor={id}>
          Email address
        </label>
        <input
          id={id}
          type="email"
          name="email"
          autoComplete="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={submitting}
          required
        />
        <button type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Subscribe free →"}
        </button>

        <div className={styles.honeypot} aria-hidden="true">
          <label htmlFor={`${id}-website`}>Website</label>
          <input
            id={`${id}-website`}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>
      </form>

      <p
        className={`${styles.signupStatus} ${isError ? styles.signupError : ""}`}
        role="status"
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
}
