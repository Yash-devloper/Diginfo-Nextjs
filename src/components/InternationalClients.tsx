export default function InternationalClients() {
  return (
    <section className="sec dark about-sec">
      <div className="wrap intl-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
        
        <div className="intl-left">
          <div className="pill-label" style={{ marginBottom: '1.5rem' }}>GLOBAL COLLABORATION</div>

          <h2 className="h2" style={{ marginBottom: '1.5rem' }}>
            Working with <span className="gt">International Clients</span>
          </h2>

          <p className="body-lg" style={{ maxWidth: "850px" }}>
            We work with businesses in India and overseas. Communication is in
            clear English, on your schedule; reporting is in your currency; and
            contracts are simple, with NDAs available on request. You get a
            senior, accountable team — and a sensible investment for the quality
            of work.
          </p>
        </div>

        <div className="intl-right" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div className="about-card" style={{ margin: 0 }}>
            <h4>🗣️ Clear English</h4>
            <p>Fluent communication for seamless workflows.</p>
          </div>
          <div className="about-card" style={{ margin: 0 }}>
            <h4>📅 Your Timezone</h4>
            <p>Meetings scheduled when it suits you.</p>
          </div>
          <div className="about-card" style={{ margin: 0 }}>
            <h4>💵 Local Currency</h4>
            <p>Easy billing and transparent reporting.</p>
          </div>
          <div className="about-card" style={{ margin: 0 }}>
            <h4>🔒 NDA Protected</h4>
            <p>Strict data privacy and legal safety.</p>
          </div>
        </div>

      </div>
    </section>
  );
}