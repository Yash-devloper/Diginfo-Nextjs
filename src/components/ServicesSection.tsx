import Link from "next/link";
import { services } from "@/lib/services";

export default function ServicesSection() {
  return (
    <section id="services" className="sec">
      <div className="wrap">
        <div className="sec-head">
          <h2>Services We Offer</h2>
          <p>Everything you need to grow your business online</p>
        </div>

        <div className="svcs-grid">
          {services.slice(0, 3).map((service) => (
            <div className="svc-card" key={service.slug}>
              <h3>{service.shortTitle}</h3>
              <p className="svc-desc">{service.cardDescription}</p>
              <Link className="svc-link" href={`/services/${service.slug}`}>
                View More -&gt;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
