import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, services } from "@/lib/services";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Diginfo",
    };
  }

  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      type: "website",
      url: `/services/${service.slug}`,
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <section className="services-sec service-detail-sec">
      <div className="wrap service-detail-hero">
        <Link className="card-link service-back-link" href="/services">
          &lt;- Back to Services
        </Link>

        <h1 className="services-title">
          {service.title}
          <br />
          <span className="gt">That Works.</span>
        </h1>

        <p className="services-desc">{service.description}</p>
      </div>

      <div className="wrap service-detail-grid">
        <article className="service-detail-main">
          <div className="service-card service-detail-card">
            <h2>Overview</h2>
            <p>{service.intro}</p>
          </div>

          <div className="service-card service-detail-card">
            <h2>What You Get</h2>
            <ul>
              {service.benefits.map((benefit) => (
                <li key={benefit}>{benefit}</li>
              ))}
            </ul>
          </div>

          <div className="service-card service-detail-card">
            <h2>Our Process</h2>
            <ul>
              {service.process.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ul>
          </div>
        </article>

        <aside className="service-detail-side">
          <div className="service-card service-detail-card">
            <h2>Core Services</h2>
            <ul>
              {service.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>

            <div className="tags">
              {service.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>

            <Link className="btn btn-grad service-detail-cta" href="/contact">
              Get Started
            </Link>
          </div>
        </aside>
      </div>

      <div className="wrap service-related">
        <h2>Explore More Services</h2>

        <div className="services-grid service-related-grid">
          {relatedServices.map((item) => (
            <div className="service-card" key={item.slug}>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
              <Link className="card-link" href={`/services/${item.slug}`}>
                View More -&gt;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
