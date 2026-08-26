"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { saveLead } from "@/lib/leads";
import toast from "react-hot-toast";

export default function ContactPageClient() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.name || !form.phone || !form.email) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      setLoading(true);

      await saveLead({
        name: form.name,
        phone: form.phone,
        email: form.email,
        service: form.service,
        message: form.message,
      });

      toast.success("Enquiry submitted successfully");

      setForm({
        name: "",
        phone: "",
        email: "",
        service: "",
        message: "",
      });

      router.push("/thank-you");
    } catch (error) {
      console.error("Firestore Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="contact-sec">
      <div className="wrap contact-grid">
        <div className="contact-left">
          <div className="pill-label">GET IN TOUCH</div>
          <h1 className="contact-title">
            Let&apos;s Have an Honest <br />
            <span className="gt">30–Minute</span>
            <br />
            Conversation.
          </h1>
          <p className="contact-desc">
            No pitch. No pressure. We’ll audit your current digital presence live,
            show you exactly what’s working and what isn’t, and tell you what we’d do differently —
            whether you hire us or not.
          </p>
          <div className="contact-info">
            <div className="info-item">
              <span>📍</span>
              <div>
                <h4>Our Office</h4>
                <p>
                  214, B Zone, Business Space, Above Reliance Mart,
                  Nipania Road, Indore, Madhya Pradesh 452010
                </p>
              </div>
            </div>
            <div className="info-item">
              <span>📞</span>
              <div>
                <h4>Call / WhatsApp</h4>
                <p>+91 88891 23454</p>
              </div>
            </div>
            <div className="info-item">
              <span>✉️</span>
              <div>
                <h4>Email</h4>
                <p> contact@diginfo.ai</p>
              </div>
            </div>
            <div className="info-item">
              <span>⏱</span>
              <div>
                <h4>Response Time</h4>
                <p>We respond within 4 business hours — guaranteed</p>
              </div>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <h3>Start the Conversation</h3>
          <p className="form-sub">
            Fill this in and we’ll send you a personalised pre-audit report before your first call — for free.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Your Name *"
                value={form.name}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Mobile / WhatsApp *"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
            <input
              type="email"
              name="email"
                placeholder="Business Email *"
                value={form.email}
                onChange={handleChange}
              />
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
            >
              <option value="">Choose a service...</option>
              <option>SEO</option>
              <option>AEO/GEO</option>
              <option>Social Media</option>
              <option>Ads / PPC</option>
              <option>Website Development</option>
              <option>App Development</option>
            </select>
            <textarea
              name="message"
              placeholder="Tell us about your business & goals"
              value={form.message}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn btn-grad full"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message & Get My Free Pre-Audit →"}
            </button>
            <p className="note">
              We respond within 4 hours. No spam, ever. 100% confidential.
            </p>
          </form>
        </div>
      </div>

      <div className="wrap contact-map-wrap">
        <div className="contact-map-head">
          <div>
            <div className="pill-label">OUR LOCATION</div>
            <h2>Visit Diginfo in Indore</h2>
          </div>
          <p>
            Find us on Nipania Road, Indore. Use the map for quick directions
            before your meeting.
          </p>
        </div>

        <div className="contact-map-card">
          <iframe
            src="https://www.google.com/maps?q=Office%20No.%20214%2C%20B%20Zone%2C%20Business%20Space%2C%20Above%20Reliance%20Mart%2C%20Nipania%20Road%2C%20Indore%2C%20Madhya%20Pradesh%20452010%2C%20India&output=embed"
            title="Diginfo office location on Nipania Road, Indore"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          {/* <div className="contact-map-panel">
            <span className="map-pin">Location Pin</span>
            <h3>Diginfo</h3>
            <p>Vijay Nagar, Indore, Madhya Pradesh, India - 452001</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Diginfo%20Vijay%20Nagar%20Indore%20Madhya%20Pradesh%20India"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open directions
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
}
