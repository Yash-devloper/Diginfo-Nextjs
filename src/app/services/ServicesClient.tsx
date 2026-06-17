import Link from "next/link";
import { services, type ServiceDetail } from "@/lib/services";

const marketingOrder = [
  "search-engine-optimization",
  "ai-search-optimisation-aeo-geo",
  "performance-marketing",
  "social-media-marketing",
  "creative-design-branding",
];

const technologyOrder = ["website-design-development", "app-development", "erp-crm-solutions"];

const cardDescriptions: Record<string, string> = {
  "search-engine-optimization": "Sustained organic visibility for the searches that bring qualified buyers.",
  "ai-search-optimisation-aeo-geo": "Be the business AI engines recommend when buyers ask for a solution.",
  "performance-marketing": "Paid acquisition engineered around return on spend, not impressions.",
  "social-media-marketing": "Content and community that build durable demand for your brand.",
  "creative-design-branding": "Brand identity and creative that earn trust at first impression.",
  "website-design-development": "Fast, secure, conversion-focused websites and platforms.",
  "app-development": "Custom mobile and web apps built around your workflows and users.",
  "erp-crm-solutions": "Custom systems and automation that run your operations at scale.",
};

const cardTags: Record<string, string[]> = {
  "performance-marketing": ["PPC", "ROAS", "Retargeting"],
  "website-design-development": ["Responsive", "Custom Build", "Scalable Tech"],
  "app-development": ["Mobile Apps", "Web Apps", "API Integration"],
  "erp-crm-solutions": ["ERP", "CRM", "Automation"],
};

function isService(service: ServiceDetail | undefined): service is ServiceDetail {
  return Boolean(service);
}

const marketingServices = marketingOrder
  .map((slug) => services.find((service) => service.slug === slug))
  .filter(isService);

const technologyServices = technologyOrder
  .map((slug) => services.find((service) => service.slug === slug))
  .filter(isService);

export default function ServicesClient() {
  return (
    <section className="services-sec services-overview">
      <div className="wrap services-overview-wrap">
        <header className="services-overview-hero">
          <h1>
            Marketing and technology, <span>under one roof.</span>
          </h1>
          <p>
            Most organisations coordinate three or four vendors to grow online.
            Diginfo brings strategy, execution, creative, and engineering into a
            single accountable team so your marketing and the systems behind it
            move together, not in silos.
          </p>
        </header>

        <div className="services-overview-note">
          Two capabilities. One team. We help businesses get found, get chosen,
          and get measured across Google, social platforms, and the AI engines
          buyers now consult first.
        </div>

        <ServicePillar
          accent="orange"
          kicker="Digital Marketing"
          ribbon="Digital marketing leads first"
          services={marketingServices}
          placeholder="5 marketing services grouped under one pillar."
        />

        <ServicePillar
          accent="teal"
          kicker="IT Services"
          ribbon="IT services grouped second"
          services={technologyServices}
          placeholder={'"View More" links point to real pages, not #.'}
        />
      </div>
    </section>
  );
}

function ServicePillar({
  accent,
  kicker,
  ribbon,
  services,
  placeholder,
}: {
  accent: "orange" | "teal";
  kicker: string;
  ribbon: string;
  services: ServiceDetail[];
  placeholder: string;
}) {
  return (
    <section className={`service-pillar service-pillar-${accent}`}>
      <div className="service-pillar-head">
        <span>{kicker}</span>
        <div className="service-pillar-line" />
        {/* <strong>{ribbon}</strong> */}
      </div>

      <div className="services-board-grid">
        {services.map((service) => (
          <article className="services-board-card" key={service.slug}>
            <h2>{service.title}</h2>
            <p>{cardDescriptions[service.slug] ?? service.cardDescription}</p>

            <ul>
              {service.highlights.slice(0, 4).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="services-board-tags">
              {(cardTags[service.slug] ?? service.tags).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <Link className="services-board-link" href={`/services/${service.slug}`}>
              View More <span aria-hidden="true">-&gt;</span>
            </Link>
          </article>
        ))}

        {/* <div className="services-board-empty" aria-hidden="true">
          <span>{placeholder}</span>
        </div> */}
      </div>
    </section>
  );
}
