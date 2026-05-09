export default function ServicesSection() {
  return (
    <section id="services" className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2>Services We Offer</h2>
          <p>Everything you need to grow your business online</p>
        </div>

        <div className="svcs-grid">
          <div className="svc-card">
            <h3>SEO Optimization</h3>
            <p className="svc-desc">Improve ranking and traffic</p>
          </div>

          <div className="svc-card">
            <h3>Web Development</h3>
            <p className="svc-desc">Fast & modern websites</p>
          </div>

          <div className="svc-card">
            <h3>Social Media Marketing</h3>
            <p className="svc-desc">Boost brand engagement</p>
          </div>
        </div>
      </div>
    </section>
  );
}