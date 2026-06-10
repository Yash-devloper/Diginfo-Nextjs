"use client";

import { useState } from "react";
import Link from "next/link";
import EnquiryModal from "@/components/EnquiryModal";
import { services } from "@/lib/services";

export default function ServicesClient() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <section className="services-sec">
      <div className="wrap center">
        <h1 className="services-title">
          Services. One Team. <br />
          <span className="gt">Zero Excuses.</span>
        </h1>

        <p className="services-desc">
          Most businesses need 3-4 agencies. We give everything under one roof.
        </p>
      </div>

      <div className="wrap services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.slug}>
            <h4>{service.title}</h4>
            <ul>
              {service.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="tags">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <Link className="card-link" href={`/services/${service.slug}`}>
              View More -&gt;
            </Link>
          </div>
        ))}
      </div>
        <div className="wrap center" style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
        <button className="btn btn-grad" onClick={() => setOpenModal(true)}>
          Discover All Services -&gt;
        </button>
        <EnquiryModal open={openModal} onClose={() => setOpenModal(false)} />
      </div>
    </section>
  );
}
