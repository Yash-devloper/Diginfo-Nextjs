"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const steps = [
  {
    number: "01",
    title: "Discovery & Audit",
    desc: "We audit your digital presence and identify growth gaps.",
  },
  {
    number: "02",
    title: "Strategy & Planning",
    desc: "A custom roadmap built around KPIs and growth goals.",
  },
  {
    number: "03",
    title: "Build & Launch",
    desc: "Campaigns, funnels, and systems launched with precision.",
  },
  {
    number: "04",
    title: "Optimize & Scale",
    desc: "Continuous optimization to maximize ROI and performance.",
  },
  {
    number: "05",
    title: "Report & Growth",
    desc: "Transparent reporting and long-term scaling strategy.",
  },
];

export default function ProcessSection() {

  const [active, setActive] = useState(0);

  return (
    <section className="process-sec">

      <div className="wrap">

        {/* HEADING */}
        <div className="process-head">

          <div className="pill-label">
            HOW WE WORK
          </div>

          <h2 className="process-title">
            From Your First Call to
            <span> Compounding Results</span>
          </h2>

          <p>
            A structured growth system refined across
            100+ client engagements.
          </p>

        </div>

        {/* TIMELINE */}
        <div className="timeline-wrap">

          {/* PROGRESS LINE */}
          <div className="timeline-line">

            <motion.div
              className="timeline-progress"
              animate={{
                width: `${((active + 1) / steps.length) * 100}%`,
              }}
              transition={{
                duration: 0.5,
              }}
            />

          </div>

          {/* STEPS */}
          <div className="timeline-steps">

            {steps.map((step, index) => (

              <motion.div
                key={index}
                className={`process-card ${
                  active === index ? "active" : ""
                }`}
                onMouseEnter={() => setActive(index)}
                onFocus={() => setActive(index)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -14,
                  scale: 1.015,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                tabIndex={0}
              >

                <div className="step-circle">
                  {step.number}
                </div>

                <h3>{step.title}</h3>

                <p>{step.desc}</p>

              </motion.div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
