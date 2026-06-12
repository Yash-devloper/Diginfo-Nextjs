import Link from "next/link";

export default function AboutSection() {
  return (
    <section className="sec dark about-sec">
      <div className="wrap about-grid">
        {/* LEFT SIDE */}
        <div className="about-left">
          <div className="pill-label">ABOUT DIGINFO</div>

          <h2 className="h2">
            We Started With One Question:
            <br />
            <span className="gt">
              why do good businesses stay invisible online?
            </span>
          </h2>

          <p className="body-lg">
            In 2019, our founders left corporate roles to answer it. Most
            businesses weren't losing on product they were losing because
            customers couldn't find them, trust them, or understand them online.
            Diginfo was built to fix that.
          </p>

          <p className="body-lg">
            Today we're a digital marketing and IT services agency helping
            businesses in India and abroad turn digital presence into
            measurable revenue, with marketing, creative, and technology under
            one roof.
          </p>

          {/* SMALL FEATURE CARDS */}
          <div className="about-features">
            <div className="about-card">
              <h4>🎯 Results Before Everything</h4>
              <p>We measure success in revenue, not likes.</p>
            </div>

            <div className="about-card">
              <h4>🔍 Radical Transparency</h4>
              <p>You see every spend and every metric.</p>
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
            <h3>25+</h3>
            <p>Clients in india & abroad</p>
          </div>

          <div className="stat-box">
            <h3>100%</h3>
            <p>In-house team</p>
          </div>

          <div className="stat-box">
            <h3>7+ YRS</h3>
            <p>Since 2019</p>
          </div>
        </div>
      </div>
    </section>
  );
}
