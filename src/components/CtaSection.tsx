"use client";

import Link from "next/link";
import EnquiryModal from "@/components/EnquiryModal";
import { useState } from "react";

export default function CtaSection() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section
      className="sec dark cta-band"
      style={{ background: "var(--ink2)", textAlign: "center" }}
    >
      <div className="wrap">
        <h2 className="h2" style={{ marginBottom: "1rem" }}>
          Ready to Transform Your <span className="gt">Digital Presence?</span>
        </h2>
        <p
          className="body-lg"
          style={{ maxWidth: "700px", margin: "0 auto 2rem" }}
        >
          No pitch, no pressure. We'll audit your digital presence live —
          including your AI-search visibility — and tell you exactly what we'd
          do, whether you hire us or not.
        </p>
        {/* <Link href="#"> */}
          <button
            className="btn btn-grad btn-lg"
            onClick={() => setOpenModal(true)}
          >
            Book Your Free Digital Audit →
          </button>
          <EnquiryModal open={openModal} onClose={() => setOpenModal(false)} />
        {/* </Link> */}
      </div>
    </section>
  );
}
