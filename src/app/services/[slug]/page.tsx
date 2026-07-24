import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BarChart3, Check, FileSearch, Gauge, Globe2, Link2, MapPin, SearchCheck, Settings2, Target } from "lucide-react";
import { getServiceBySlug, services, type ServiceDetail } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceBySlug((await params).slug);
  if (!service) return { title: "Service Not Found | Diginfo" };
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: { title: service.seoTitle, description: service.seoDescription, type: "website", url: `/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const service = getServiceBySlug((await params).slug);
  if (!service) notFound();
  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3);
  if (service.slug === "search-engine-optimization") return <SeoServiceDetailPage relatedServices={relatedServices} />;

  return <GenericServiceDetailPage service={service} relatedServices={relatedServices} />;
}

function GenericServiceDetailPage({ service, relatedServices }: { service: ServiceDetail; relatedServices: ServiceDetail[] }) {
  return <section className="services-sec service-detail-sec">
    <div className="wrap service-detail-hero"><Link className="card-link service-back-link" href="/services">&lt;- Back to Services</Link><h1 className="services-title">{service.title}<br /><span className="gt">That Works.</span></h1><p className="services-desc">{service.description}</p></div>
    <div className="wrap service-detail-grid"><article className="service-detail-main"><div className="service-card service-detail-card"><h2>Overview</h2><p>{service.intro}</p></div><div className="service-card service-detail-card"><h2>What You Get</h2><ul>{service.benefits.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="service-card service-detail-card"><h2>Our Process</h2><ul>{service.process.map((item) => <li key={item}>{item}</li>)}</ul></div></article><aside className="service-detail-side"><div className="service-card service-detail-card"><h2>Core Services</h2><ul>{service.highlights.map((item) => <li key={item}>{item}</li>)}</ul><div className="tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><Link className="btn btn-grad service-detail-cta" href="/contact">Get Started</Link></div></aside></div>
    <RelatedServices services={relatedServices} />
  </section>;
}

const benefits = [
  [Target, "Rankings for high-intent commercial keywords", "The searches buyers make right before they purchase, not just broad traffic terms."],
  [Gauge, "A technically sound website", "Improved speed, crawlability, indexing, and mobile performance."],
  [FileSearch, "Content built for search intent", "Pages that match what a searcher actually wants at each stage."],
  [Link2, "Authority and link building", "Earned backlinks and digital PR, never paid links or link farms."],
  [MapPin, "Local visibility", "For businesses that depend on nearby customers, we handle Google Business Profile, citations, and review strategy so you show up in the Map Pack."],
  [BarChart3, "Transparent monthly reporting", "Rankings, traffic, and conversions reviewed with your consultant every month."],
] as const;
const seoServices = [
  [Settings2, "Technical SEO", "Site audits, crawlability fixes, Core Web Vitals, structured data, and indexing. Audited with Semrush, Screaming Frog, and Google Search Console."],
  [SearchCheck, "On-Page SEO", "Title tags, meta descriptions, header structure, internal linking, and content optimisation across every page."],
  [FileSearch, "Content Strategy & SEO Writing", "Keyword-mapped content built around real search intent: pillar pages, supporting articles, and topic clusters that build authority over time."],
  [Link2, "Off-Page SEO & Link Building", "Earned backlinks and digital PR — never paid links or link farms that put your site at risk."],
  [MapPin, "Local SEO", "Google Business Profile optimisation, local citations, review strategy, and location-based content for businesses that rely on nearby customers."],
  [Globe2, "E-Commerce SEO", "Category and product-page optimisation, structured data for rich snippets, and marketplace visibility — including Amazon listings for sellers who need to be found on-platform. This is where we go deep: product schema, faceted-navigation handling, and the technical fixes generic providers miss on large catalogues."],
  [FileSearch, "SEO Audits & Consulting", "A standalone audit and roadmap for teams that execute in-house but want strategic direction and a second set of eyes."],
] as const;
const industries = [
  ["SaaS", "Software buyers search in stages: broad while defining the problem, then narrowing to feature and comparison searches right before booking a demo. We build content and page structures for every stage, not just top-of-funnel blog traffic that never converts."],
  ["B2B", "Longer sales cycles and multiple decision-makers mean ranking for a keyword is only step one. We optimise for the searches your buyers, influencers, and approvers each make at their stage of the decision."],
  ["Real Estate", "We pair local visibility with content for high-intent property searches — the terms buyers and renters type right before they call an agent, not generic ‘properties in [city]’ pages that rank for nothing."],
  ["E-Commerce", "Large catalogues need catalogue-grade SEO: product schema, faceted navigation, category optimisation, and marketplace visibility."],
  ["Small Businesses & Startups", "Budgets are tighter and every ranking has to earn its keep, so we prioritise the keywords that bring customers fastest rather than vanity terms that take a year to move."],
] as const;

function SeoServiceDetailPage({ relatedServices }: { relatedServices: ServiceDetail[] }) {
  return <section className="services-sec service-detail-sec seo-detail-page">
    <div className="wrap service-detail-hero"><Link className="card-link service-back-link" href="/services">&lt;- Back to Services</Link><h1 className="services-title">The SEO Company That Turns <span className="gt">Rankings Into Revenue</span></h1><p className="services-desc">A full-service SEO agency delivering organic search optimisation — technical SEO, content, and link building — for businesses across industries, from SaaS and B2B to e-commerce. Work directly with a senior SEO consultant from day one: no account managers relaying messages, no junior teams learning on your budget.</p><div className="seo-trust-strip" aria-label="Diginfo SEO commitments"><span><Check aria-hidden="true" />100+ brands ranked <em>Verify</em></span><span><Check aria-hidden="true" />In-house team, zero outsourcing</span><span><Check aria-hidden="true" />Transparent monthly reporting</span><span><Check aria-hidden="true" />No lock-in contracts</span></div></div>
    <div className="wrap seo-content">
      <section className="service-card service-detail-card seo-overview"><h2>Overview</h2><p>Search sends more ready-to-buy traffic than almost any other channel — but only to businesses that show up. Diginfo builds that visibility from the ground up: fixing the technical issues holding your site back, aligning every page with what your buyers actually search for, and building the authority signals that move you up the results — and keep you there.</p><p>Whether you want a full-service agency to own your entire organic strategy or a hands-on consultant to guide an in-house team, our work is judged on one measure: whether rankings turn into leads, sales, and revenue you can point to — across Google, and increasingly the AI tools your customers now ask first. For how we handle AI search specifically, see our <Link href="/services/ai-search-optimisation-aeo-geo">AI Search Optimisation service</Link>.</p></section>
      <ContentSection title="SEO Company vs Agency vs Consultant" intro="These terms get used interchangeably, but they describe different working relationships — and knowing the difference helps you hire the right fit."><div className="seo-card-grid seo-card-grid-three">{[["SEO company", "A business (like Diginfo) that offers search optimisation as a core service, usually alongside content, technical development, and reporting under one roof."], ["SEO agency", "An ongoing, managed relationship: strategy, execution, and reporting handled monthly, with a team accountable for results over time."], ["SEO consultant", "An individual expert brought in for strategy, audits, or to work alongside your existing team rather than running full execution."]].map(([title, body]) => <article className="service-card seo-mini-card" key={title}><h3>{title}</h3><p>{body}</p></article>)}</div><aside className="seo-callout"><strong>Where Diginfo fits:</strong> we operate as a full-service SEO company and agency — but every client also gets direct access to a senior consultant who owns their account personally. You&apos;re not choosing between a company and a consultant. You get both.</aside></ContentSection>
      <ContentSection title="What You Get"><IconCards items={benefits} /></ContentSection>
      <ContentSection title="Our Organic Search Optimisation Services"><IconCards items={seoServices} ecommerceAnchor /></ContentSection>
      <ContentSection title="SEO Built Around Your Industry" intro="A SaaS company, a manufacturer, and a property developer reach completely different buyers, with different search behaviour. Here&apos;s how we adapt."><div className="seo-card-grid seo-card-grid-three">{industries.map(([title, body]) => <article className="service-card seo-mini-card" key={title}><h3>{title}</h3><p>{body} {title === "E-Commerce" && <a href="#e-commerce-seo">See the E-Commerce SEO service above.</a>}</p></article>)}</div></ContentSection>
      <ContentSection title="How We Work"><ol className="seo-process-list">{[["Audit & Discovery", "Full technical and competitive audit: site health, rankings, keyword gaps, and backlinks. No strategy is built until we know where you stand."], ["Strategy & Planning", "A prioritised roadmap tied to your revenue goals, not a generic checklist."], ["Build & Launch", "Technical fixes, on-page work, and content ship in planned sprints, so you see continuous progress."], ["Optimise & Scale", "We double down on what moves the needle and cut what doesn't."], ["Report & Grow", "Monthly reporting in plain language, reviewed live with your consultant."]].map(([title, body], index) => <li className="service-card" key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h3>{title}</h3><p>{body}</p></div></li>)}</ol></ContentSection>
      <ContentSection title="Why Diginfo"><div className="seo-why-list">{["One team, not a vendor chain — strategy, content, technical, and reporting all in-house.", "A named consultant on every account — you always know who's working on your campaign.", "Industry-specific execution — we adapt the strategy to your buyers, whether you're a SaaS platform, a B2B firm, or an early-stage startup.", "No lock-in contracts.", "Real reporting, not vanity dashboards."].map((item) => <div key={item}><Check aria-hidden="true" /><p>{item}</p></div>)}</div></ContentSection>
      <ContentSection title="How Diginfo Compares" intro="A direct comparison of the working relationship you can expect."><div className="seo-comparison-wrap"><div className="seo-comparison-table" role="table" aria-label="Comparison between a typical SEO agency and Diginfo"><div className="seo-comparison-row seo-comparison-head" role="row"><span role="columnheader">What matters</span><span role="columnheader">Typical SEO agency</span><span role="columnheader">Diginfo</span></div>{[["Account handling", "Rotating account managers", "Named senior consultant, same person throughout"], ["Execution", "Often outsourced to freelancers", "Fully in-house team"], ["Industry approach", "One generic strategy", "Adapted per industry: SaaS, B2B, e-commerce, and more"], ["Reporting", "Rankings and traffic only", "Rankings, traffic, and conversions tied to revenue"], ["Contracts", "Often 6–12 month lock-ins", "No lock-in, month to month"], ["AI-search readiness", "Rarely addressed", "Built into every campaign, with a dedicated AEO/GEO service"]].map(([label, agency, diginfo]) => <div className="seo-comparison-row" role="row" key={label}><strong role="rowheader">{label}</strong><span role="cell">{agency}</span><span className="seo-comparison-diginfo" role="cell"><Check aria-hidden="true" />{diginfo}</span></div>)}</div></div></ContentSection>
      <ContentSection title="Frequently Asked Questions"><div className="seo-faq-list">{[["What does an SEO company actually do?", "Improves your site’s visibility in search through technical fixes, content optimisation, and authority building — aimed at qualified organic traffic that converts, not rankings on their own."], ["How do I choose an SEO agency?", "Look for clear, revenue-tied reporting (not just rankings), direct access to the person actually working on your account, and evidence of experience in your specific industry."], ["What questions should I ask before hiring?", "How they report results, who specifically works on your account, whether they’ve worked in your industry, and what the month-to-month process looks like. Vague answers are a red flag."], ["What should I expect in the first few months?", "An audit and strategy first, not instant rankings — most legitimate SEO shows measurable movement around 90 days, building over 6–12 months as authority compounds."], ["Is SEO different for SaaS, B2B, or e-commerce?", "Yes, meaningfully. SaaS buyers research over weeks; B2B purchases involve multiple stakeholders searching at different stages; large e-commerce catalogues need catalogue-grade technical work. A generic approach misses all of this."], ["How much do organic search optimisation services cost?", "It depends on your site’s current state, competition, and goals. We scope every engagement after a free audit rather than quoting blind."]].map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></ContentSection>
      <section className="seo-audit-cta"><div><span>Free SEO audit</span><h2>Ready to see exactly where your SEO stands?</h2><p>Get a free, no-obligation audit from a senior SEO consultant — not a sales rep.</p></div><Link className="btn btn-grad" href="/contact">Get Started</Link></section>
    </div><RelatedServices services={relatedServices} />
  </section>;
}

function ContentSection({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) { return <section className="seo-section"><div className="seo-section-head"><h2>{title}</h2>{intro && <p>{intro}</p>}</div>{children}</section>; }
function IconCards({ items, ecommerceAnchor = false }: { items: readonly (readonly [typeof Target, string, string])[]; ecommerceAnchor?: boolean }) { return <div className="seo-card-grid seo-card-grid-three">{items.map(([Icon, title, body]) => <article className="service-card seo-icon-card" id={ecommerceAnchor && title === "E-Commerce SEO" ? "e-commerce-seo" : undefined} key={title}><Icon aria-hidden="true" /><h3>{title}</h3><p>{body}</p></article>)}</div>; }
function RelatedServices({ services: relatedServices }: { services: ServiceDetail[] }) { return <div className="wrap service-related"><h2>Explore More Services</h2><div className="services-grid service-related-grid">{relatedServices.map((item) => <div className="service-card" key={item.slug}><h3>{item.title}</h3><p>{item.description}</p><Link className="card-link" href={`/services/${item.slug}`}>View More -&gt;</Link></div>)}</div></div>; }
