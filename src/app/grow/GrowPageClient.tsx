"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { saveLead } from "@/lib/leads";

const serviceOptions = [
  "SEO",
  "AEO/GEO",
  "Social Media",
  "Ads / PPC",
  "Website",
  "App Development",
  "ERP/CRM",
  "Branding",
];

export default function GrowPageClient() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((current) => ({
      ...current,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.service) {
      toast.error("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await saveLead({
        ...form,
        source: "Grow landing page",
      });

      toast.success("Enquiry submitted successfully");
      setForm({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
      router.push("/thank-you");
    } catch (error) {
      console.error("Grow form error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grow-page">
      <section className="grow-shell">
        <div className="grow-copy">
          <Image
            src="/logo.png"
            width={150}
            height={44}
            className="grow-logo"
            alt="Diginfo logo"
            priority
          />

          <p className="grow-kicker">Free growth consultation</p>
          <h1>
            Let&apos;s grow your <span>business.</span>
          </h1>
          <p className="grow-desc">
            Tell us what you want to improve. Our team will review your current
            digital presence and connect with practical next steps.
          </p>

          <div className="grow-points" aria-label="What you get">
            <span>Digital audit</span>
            <span>Growth roadmap</span>
            <span>Clear next steps</span>
          </div>
        </div>

        <div className="grow-form-card">
          <h2>Start the Conversation</h2>
          <p>Fill this form and our experts will connect with you shortly.</p>

          <form className="enquiry-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name *"
              value={form.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Business Email *"
              value={form.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Mobile / WhatsApp *"
              value={form.phone}
              onChange={handleChange}
              required
            />

            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              required
            >
              <option value="">Choose a service...</option>
              {serviceOptions.map((service) => (
                <option key={service} value={service}>
                  {service}
                </option>
              ))}
            </select>

            <textarea
              rows={4}
              name="message"
              placeholder="Tell us about your business and goals"
              value={form.message}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="btn btn-grad submit-btn"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Enquiry ->"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
