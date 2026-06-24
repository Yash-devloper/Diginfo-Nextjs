const steps = [
  {
    number: "01",
    title: "Audit & Discovery",
    desc: " your full digital presence, including what AI tools currently say about you",
  },
  {
    number: "02",
    title: "Strategy & Planning",
    desc: "A roadmap built around your revenue goals and KPIs.",
  },
  {
    number: "03",
    title: "Build & Launch",
    desc: " campaigns, sites, and systems shipped with precision.",
  },
  {
    number: "04",
    title: "Optimize & Scale",
    desc: "Continuous improvement against the numbers that matter.",
  },
  {
    number: "05",
    title: "Report & Growth",
    desc: "Transparent reporting, in your currency, every month.",
  },
];

export default function ProcessSection() {
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

            <div
              className="timeline-progress"
              style={{ width: "20%" }}
            />

          </div>

          {/* STEPS */}
          <div className="timeline-steps">

            {steps.map((step, index) => (

              <article
                key={index}
                className={`process-card ${
                  index === 0 ? "active" : ""
                }`}
              >

                <div className="step-circle">
                  {step.number}
                </div>

                <h3>{step.title}</h3>

                <p>{step.desc}</p>

              </article>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}
