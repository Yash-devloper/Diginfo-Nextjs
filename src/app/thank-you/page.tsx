import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | Diginfo",
  description:
    "Thank you for contacting Diginfo. Our experts will contact you within 24 hours.",
};

export default function ThankYouPage() {
  return (
    <main className="thank-you-page">
      <section className="thank-you-hero">
        <div className="wrap thank-you-inner">
          <div className="thank-you-mark" aria-hidden="true">
            <span>&#10003;</span>
          </div>
          <p className="pill-label">REQUEST RECEIVED</p>
          <h1>Thank You! Your Request Has Been Received.</h1>
          <p>
            One of our experts will review your inquiry and contact you within
            24 hours.
          </p>
          <Link href="/" className="btn btn-grad">
            Back to Home
          </Link>
        </div>
      </section>
    </main>
  );
}
