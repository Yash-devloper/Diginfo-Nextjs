"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does Diginfo offer?",
    answer:
      "Diginfo is a digital marketing and IT services agency providing a unified strategy for growth. Our core offerings include:",
    points: [
      "Digital Marketing: SEO, AI Search Optimisation (AEO/GEO), Google & Meta Ads, and Social Media.",
      "IT Services: Website development (React/WordPress), ERP & CRM systems, and Workflow Automation.",
      "Creative & Branding: Identity design and creative strategy that earns trust.",
    ],
  },
{
    question: "Do you work with small and mid-sized businesses?",
    answer:
      "Yes — we work with small, mid-sized, and growing businesses across industries, scoping our approach and pricing to fit where you are, not a one-size-fits-all package.",
  },
  {
    question: "How is Diginfo different from other agencies?",
    answer:
      "We measure success in revenue and qualified leads, not vanity metrics. We focus on three key pillars:",
    points: [
      "In-House Expertise: Senior specialists do the work in-house with no outsourcing.",
      "Radical Transparency: Fully transparent reporting on every spend and every metric.",
      "AI-First Strategy: Specialising in AEO/GEO to ensure tools like ChatGPT recommend your business.",
    ],
  },
  {
    question: "Can I see examples of your work before I sign up?",
    answer:
      "Yes — we're happy to share relevant case studies and, where confidentiality allows, live examples from businesses in your industry during your free audit call.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "Transparent, tiered pricing with no lock-in contracts. Plans start from a clear monthly minimum, and custom scopes are quoted after a free consultation. We support billing in local currencies for international clients.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes. We support businesses globally with clear English communication on your schedule, reporting in your local currency, and NDA-protected workflows.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "Results vary by service: Paid ads can show leads within days, while SEO and AI-search visibility typically compound over 2–4 months. We set clear KPIs from Day 1.",
  },
  {
    question: "What is your process for a new project?",
    answer: "We follow a structured 5-step growth process:",
    points: [
      "Audit & Discovery: A free audit of your digital presence and AI-search visibility.",
      "Strategy & Planning: A roadmap built around your specific revenue goals.",
      "Build & Launch: Precision execution of campaigns, sites, or systems.",
      "Optimise & Scale: Continuous improvement based on data that matters.",
      "Report & Growth: Transparent monthly reporting and strategy refinement.",
    ],
  },
];


const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: [
        faq.answer,
        ...(faq.points || [])
      ].join(" ")
    }
  }))
};

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>  
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema),
      }}
    />

    <section className="sec hero-sec faq-sec">
      <div className="wrap center">
        <div className="pill-label" style={{ marginBottom: "1.5rem" }}>
          GOT QUESTIONS?
        </div>
        <h2 className="h2">
          Frequently Asked <span className="gt">Questions</span>
        </h2>
        <p className="body-lg">
          Find answers to the most common questions about our services and
          approach.
        </p>
      </div>

      <div className="wrap faq-container" style={{ width: "100%" }}>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "is-open" : ""}`}
            style={{ width: "100%" }}
          >
            <button
              className="faq-question"
              onClick={() => toggleFaq(index)}
              aria-expanded={openIndex === index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
                textAlign: "left",
              }}
            >
              <h3>{faq.question}</h3>
              <span className="faq-chevron" aria-hidden="true">
                <ChevronDown size={24} />
              </span>
            </button>
            {openIndex === index && (
              <div className="faq-answer">
                <p>{faq.answer}</p>
                {faq.points && (
                  <ul style={{ marginTop: "0.8rem", paddingLeft: "1.2rem", listStyleType: "disc" }}>
                    {faq.points.map((point, i) => (
                      <li key={i} style={{ marginBottom: "0.5rem", opacity: 0.85 }}>
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
    </>
  );
}
