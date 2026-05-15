"use client";

import { useState } from "react";
import Link from "next/link";
import EnquiryModal from "@/components/EnquiryModal";

export default function Hero() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <section id="hero" className="hero-sec">
      <div className="wrap hero-inner">
        {/* LEFT */}
        <div className="hero-left">
          {/* BADGE */}
          <div className="hero-badge">
            <span className="dot"></span>
            Indore’s #1 Full-Service Digital Agency • Since 2019
          </div>

          {/* HEADING */}
          <h1 className="hero-title">
<<<<<<< HEAD
            Your Business Deserves to <br />
            <span className="gt">Win Online.</span>
            <br />
=======
            Your Business Deserves to{" "}<br />
            <span className="gt">Win Online.</span>{" "}
>>>>>>> 62e74ce74dfb97ed309486986f8cd6f04234cc90
            We Make That Happen.
          </h1>

          {/* DESC */}
          <p className="hero-desc">
            We’re Diginfo — a team of strategists, developers, and creatives who
            turn ordinary brands into market leaders. Digital marketing, web
            development, and creative design engineered for measurable growth.
          </p>

          {/* CTA */}
          <div className="hero-ctas">
            <button className="btn btn-grad" onClick={() => setOpenModal(true)}>
              Get Your Free Digital Audit →
            </button>
            <EnquiryModal
              open={openModal}
              onClose={() => setOpenModal(false)}
            />

            <Link href="/services">
              <button className="btn btn-ghost">View All Services</button>
            </Link>
          </div>

          {/* TAGS */}
          <div className="hero-tags">
            <span>✔ No lock-in contracts</span>
            <span>✔ Results in 90 days</span>
            <span>✔ Transparent reporting</span>
          </div>

          {/* STATS */}
          <div className="hero-stats">
            <div className="stat-box">
              <h3>100+</h3>
              <p>Brands Grown</p>
            </div>

            <div className="stat-box">
              <h3>₹50CR+</h3>
              <p>Revenue Generated</p>
            </div>

            <div className="stat-box">
              <h3>5+</h3>
              <p>Years of Excellence</p>
            </div>

            <div className="stat-box">
              <h3>18+</h3>
              <p>Services</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        {/* RIGHT */}
        <div className="hero-right">
          {/* MAIN CARD */}
          <div className="hero-card main-card">
            <div className="card-top">
              <span>CLIENT — E-COMMERCE BRAND, INDORE</span>
              <h3>+312%</h3>
            </div>

            <p className="card-sub">Organic Traffic • 6-Month SEO Campaign</p>

            {/* GRAPH */}
            <div className="chart">
              <div style={{ height: "15%" }}></div>
              <div style={{ height: "25%" }}></div>
              <div style={{ height: "40%" }}></div>
              <div style={{ height: "60%" }}></div>
              <div style={{ height: "80%" }}></div>
              <div style={{ height: "100%" }}></div>
            </div>
          </div>

          {/* SMALL CARDS */}
          <div className="small-cards-row">
            <div className="card-small">
              <p>NEW LEADS / MONTH</p>
              <h3>48</h3>
              <span>+34% vs last month</span>
            </div>

            <div className="card-small">
              <p>REVENUE SPLIT</p>
              <span>Dig. Marketing 45%</span>
              <span>IT Services 35%</span>
              <span>Creative 20%</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
