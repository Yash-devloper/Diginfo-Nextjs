export default function PricingSection() {
  return (
    <section id="plans" className="sec">
      <div className="wrap">

        <div className="sec-head">
          <h2>Our Pricing</h2>
          <p>Flexible plans for every business</p>
        </div>

        <div className="pgrid">

          <div className="pcard">
            <h3>Starter</h3>
            <div className="pcard-price">₹9,999</div>
            <p>Basic SEO & Marketing</p>
            <button className="btn btn-dark">Get Started</button>
          </div>

          <div className="pcard featured">
            <h3>Growth</h3>
            <div className="pcard-price">₹19,999</div>
            <p>SEO + Ads + Development</p>
            <button className="btn btn-grad">Best Choice</button>
          </div>

          <div className="pcard">
            <h3>Enterprise</h3>
            <div className="pcard-price">₹39,999</div>
            <p>Full Digital Solution</p>
            <button className="btn btn-dark">Contact Us</button>
          </div>

        </div>

      </div>
    </section>
  );
}