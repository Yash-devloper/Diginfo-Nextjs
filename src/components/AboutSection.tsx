import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="sec dark about-sec">
      <div className="wrap about-grid">

        {/* LEFT SIDE */}
        <div className="about-left">

          <div className="pill-label">ABOUT DIGINFO</div>

          <h2 className="h2">
            We Started With One Question:<br />
            <span className="gt">
              Why Do Good Businesses Fail Online?
            </span>
          </h2>

          <p className="body-lg">
            In 2019, our founders walked away from corporate jobs to answer that question.
            What they found: most businesses weren’t failing because of their product —
            they were failing because no one could find them, trust them, or understand them online.
          </p>

          <p className="body-lg">
            Diginfo was built to change that. We are Indore’s most complete digital partner —
            strategy, execution, and creative, all under one roof, all accountable to one number:
            your growth.
          </p>

          <p className="body-lg">
            We don’t believe in vanity metrics. We track revenue, qualified leads, and ROI.
            Every campaign we run, every website we build, every piece of content we create
            is designed to do one thing — <b>make your business more money.</b>
          </p>

          {/* SMALL FEATURE CARDS */}
          <div className="about-features">

            <div className="about-card">
              <h4>🎯 Results Before Everything</h4>
              <p>We measure success in revenue, not likes.</p>
            </div>

            <div className="about-card">
              <h4>🔍 Radical Transparency</h4>
              <p>You see every rupee spent and every metric.</p>
            </div>

            <div className="about-card">
              <h4>⚡ Speed Without Shortcuts</h4>
              <p>We move fast but never sacrifice quality.</p>
            </div>

            <div className="about-card">
              <h4>🤝 Partners, Not Vendors</h4>
              <p>We treat your business like our own.</p>
            </div>

          </div>

          {/* CTA */}
          <div className="hero-ctas">
            <Link href="/contact">
              <button className="btn btn-grad">
                Start Your Growth Journey →
              </button>
            </Link>
          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="about-right">

          <div className="stat-box">
            <h3>100+</h3>
            <p>Brands Served Across India</p>
          </div>

          <div className="stat-box">
            <h3>₹50CR+</h3>
            <p>Revenue Generated for Clients</p>
          </div>

          <div className="stat-box">
            <h3>98%</h3>
            <p>Client Retention Rate</p>
          </div>

          <div className="stat-box">
            <h3>7+ YRS</h3>
            <p>Of Digital Excellence Since 2019</p>
          </div>

        </div>

      </div>
    </section>
  );
}