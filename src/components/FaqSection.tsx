"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "What services does Diginfo offer?",
    answer:
      "Diginfo offers a comprehensive suite of digital marketing and IT services including Search Engine Optimization (SEO), Social Media Marketing (SMM), Pay-Per-Click (PPC) advertising, website design and development, ERP & CRM solutions, and creative design & branding.",
  },
  {
    question: "How is Diginfo different from other agencies?",
    answer:
      "We focus on measurable ROI, not just vanity metrics. Our approach is radically transparent, providing you with clear reports on every rupee spent and every metric. We operate as partners, not just vendors, ensuring speed without shortcuts and everything done in-house by our core team.",
  },
  {
    question: "What is your pricing model?",
    answer:
      "We offer flexible pricing plans tailored to your business needs, including packages for SEO, social media, performance marketing, and website/software development. You can view detailed pricing on our dedicated pricing page or contact us for a custom quote.",
  },
  {
    question: "Do you work with international clients?",
    answer:
      "Yes, we proudly serve businesses both in India and overseas. We ensure clear communication in English, schedule meetings in your timezone, offer billing in local currency, and provide NDA protection for your data.",
  },
  {
    question: "How long does it take to see results?",
    answer:
      "While results can vary based on the service and industry, we aim to show tangible results within 90 days for most campaigns. Our transparent reporting keeps you updated on progress and performance every month.",
  },
  {
    question: "What is your process for a new project?",
    answer:
      "Our process typically involves an initial audit & discovery phase, followed by strategy & planning, then building & launching campaigns/systems. We then continuously optimize & scale, and provide transparent reporting & growth insights.",
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
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
          <motion.div
            key={index}
            className="faq-item"
            initial={false}
            animate={{
              backgroundColor: openIndex === index ? "var(--ink2)" : "var(--ink)",
            }}
            style={{ width: "100%" }}
            transition={{ duration: 0.3 }}
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
              <motion.div
                animate={{ rotate: openIndex === index ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={24} />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIndex === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="faq-answer"
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}