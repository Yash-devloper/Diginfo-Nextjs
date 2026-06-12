export default function WhySection() {
  return (
    <section className="sec dark why-sec">
      <div className="wrap why-grid">

        {/* LEFT SIDE */}
        <div className="why-left">

          <div className="pill-label">WHY DIGINFO ?</div>

          <h2 className="h2">
            We’re Not Another Agency.<br />
            <span className="gt">We’re Your Growth Team.</span>
          </h2>

          <p className="body-lg">
            Hundreds of agencies in India will promise you rankings and followers.
            Very few will show you the real, measurable ROI on every decision.
            We will — every single month.
          </p>

          {/* FEATURE CARDS */}
          <div className="why-features">

            <div className="why-card">
              <h4>🏆 Proven, Measurable Results</h4>
              <p>
                Weekly KPI tracking dashboard, not vague promises.
              </p>
            </div>

            <div className="why-card">
              <h4>🔗 Full-Stack, No Outsourcing</h4>
              <p>
                Everything done in-house by our core team.
              </p>
            </div>

            <div className="why-card">
              <h4>🎯 Category Specialists</h4>
              <p>
                Deep understanding of your business industry.
              </p>
            </div>

            <div className="why-card">
              <h4>💬 Direct Access</h4>
              <p>
                Talk directly to the strategist running your campaigns.
              </p>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="why-right">

          <div className="result-card">
            <span>E-COMMERCE • SEO</span>
            <h3>+312%</h3>
            <p>Organic traffic growth in 6 months.</p>
          </div>

          <div className="result-card">
            <span>REAL ESTATE • META ADS</span>
            <h3>65% ↓</h3>
            <p>Cost-per-lead reduction within 90 days.</p>
          </div>

          <div className="result-card">
            <span>EDUCATION • WEBSITE + SEO</span>
            <h3>40+</h3>
            <p>Organic enquiries per month.</p>
          </div>

          <div className="result-card">
            <span>RETAIL • SOCIAL MEDIA</span>
            <h3>2K → 18K</h3>
            <p>Instagram growth in 5 months.</p>
          </div>

        </div>

      </div>
    </section>
  );
}