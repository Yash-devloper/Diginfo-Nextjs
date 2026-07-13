"use client";

import { useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// This form brings Firebase into the client bundle. It is only needed after a
// visitor asks to book an audit, so keep it out of the landing page's initial JS.
const EnquiryModal = dynamic(() => import("@/components/EnquiryModal"), {
  ssr: false,
});

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
            Digital marketing & IT · Trusted since 2019
          </div>

          {/* HEADING */}
          <h1 className="hero-title">
            Get Found. Get Chosen <br /><span className="gt">Get Results</span>
            <span className="hero-subtitle">
              
            </span>
          </h1>
          
          <h2>
          <span className="hero-subtitle">
            Indore's trusted digital marketing & IT partner since 2019. 
            </span> </h2>

          {/* DESC */}
          <p className="hero-desc">
            We're a digital marketing company in Indore built for businesses that want more than vanity metrics. From ranking on Google and AI search tools, to turning that visibility into paying customers, to building the websites and systems behind it all — we do it under one roof, accountable to your revenue, not just your reach.
          </p>

          {/* CTA */}
          <div className="hero-ctas">
            <button className="btn btn-grad" onClick={() => setOpenModal(true)}>
              Book a Free Digital Audit →
            </button>
            <EnquiryModal
              open={openModal}
              onClose={() => setOpenModal(false)}
            />

            <Link href="/services">
              <button className="btn btn-ghost">See What We Do</button>
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
              <h3>7+</h3>
              <p>Years of Excellence</p>
            </div>

            <div className="stat-box">
              <h3>18+</h3>
              <p>Services</p>
            </div>

            <div className="stat-box">
              <h3>100%</h3>
              <p> In-house team</p>
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

      <div className="hero-band" aria-label="Diginfo growth promise">
        <div className="marquee">
          <div className="marquee-content">
            {Array.from({ length: 4 }).map((_, index) => (
              <span key={index}>
                As a digital marketing agency near you in Indore, we help local and national businesses get found, get chosen, and get measured — across Google, social platforms, 
                and <strong>the AI tools</strong> customers now ask first.
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
