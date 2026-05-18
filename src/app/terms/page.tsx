import Link from "next/link";

export const metadata = {
  title: "Terms & Conditions | Diginfo Agency",
  description:
    "Review Diginfo's terms for digital marketing, website development, design, automation, and IT services.",
};

const highlights = [
  "Clear project scope",
  "Transparent payments",
  "Respectful collaboration",
  "Practical service expectations",
];

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: [
      "By accessing our website, submitting an inquiry, approving a proposal, making a payment, or using Diginfo's services, you agree to these Terms & Conditions.",
      "These terms apply to our digital marketing, SEO, paid advertising, social media, branding, design, content, website development, software, automation, consulting, maintenance, and IT services unless a separate written agreement states otherwise.",
    ],
  },
  {
    title: "2. Services and Scope of Work",
    content: [
      "Project deliverables, timelines, pricing, revisions, support terms, and responsibilities will be defined in a proposal, invoice, statement of work, email confirmation, or service plan.",
      "Any work outside the approved scope may require a revised quotation, additional charges, or adjusted timelines. We aim to communicate scope changes clearly before proceeding.",
      "Service availability may depend on timely approvals, access to required accounts, accurate information, third-party platforms, client feedback, and payment status.",
    ],
  },
  {
    title: "3. Client Responsibilities",
    content: [
      "You agree to provide accurate business information, content, brand assets, account access, approvals, feedback, and materials needed to complete the work.",
      "You are responsible for ensuring that supplied content, images, data, trademarks, claims, offers, products, and services are lawful, accurate, and do not infringe third-party rights.",
      "You must keep login credentials secure and notify us immediately if you suspect unauthorized access to any account connected to our services.",
    ],
  },
  {
    title: "4. Payments, Invoices, and Delays",
    content: [
      "Fees, billing cycles, taxes, payment milestones, and due dates will be mentioned in the applicable proposal, plan, or invoice.",
      "Work may be paused, delayed, or withheld if payments are overdue, approvals are pending, required materials are missing, or third-party accounts are not accessible.",
      "Unless expressly stated in writing, setup fees, consultation fees, strategy fees, creative work, development work, ad management fees, and completed milestones are non-refundable.",
    ],
  },
  {
    title: "5. Marketing Performance and Third-Party Platforms",
    content: [
      "We use professional methods and data-led strategy, but we do not guarantee specific rankings, leads, sales, revenue, ad approvals, platform performance, or search engine positions.",
      "Results may vary due to market conditions, competition, budget, website quality, offer strength, platform algorithms, customer behavior, seasonality, client decisions, and other factors outside our control.",
      "Google, Meta, LinkedIn, hosting providers, payment gateways, email platforms, plugins, APIs, and other third-party services may change their features, pricing, policies, or availability at any time.",
    ],
  },
  {
    title: "6. Intellectual Property",
    content: [
      "Upon full payment, final approved deliverables created specifically for you may be assigned or licensed to you as described in the relevant proposal or agreement.",
      "Diginfo retains ownership of pre-existing tools, frameworks, templates, code libraries, concepts, processes, know-how, internal methods, rejected concepts, and materials not specifically transferred in writing.",
      "We may display completed work, campaign results, screenshots, testimonials, logos, or project summaries in our portfolio and marketing materials unless confidentiality has been agreed in writing.",
    ],
  },
  {
    title: "7. Website, Hosting, and Maintenance",
    content: [
      "Websites, software, integrations, and digital assets may rely on third-party hosting, domains, plugins, APIs, themes, fonts, licenses, subscriptions, or external platforms.",
      "Unless included in an active maintenance plan, post-launch updates, backups, security monitoring, bug fixes, plugin renewals, content changes, and platform upgrades may be billed separately.",
      "We are not responsible for issues caused by unauthorized edits, outdated third-party tools, hosting failures, malware, policy changes, expired subscriptions, or changes made by others after handover.",
    ],
  },
  {
    title: "8. Confidentiality and Data",
    content: [
      "Both parties agree to handle confidential business, technical, financial, customer, and project information with reasonable care.",
      "You authorize Diginfo to access and process relevant data, accounts, and platforms as needed to deliver approved services.",
      "Our handling of personal information is described in our Privacy Policy.",
    ],
  },
  {
    title: "9. Termination",
    content: [
      "Either party may end an ongoing service by providing written notice, subject to the terms of the proposal, invoice, subscription, or active agreement.",
      "You remain responsible for fees due for completed work, active billing periods, committed third-party costs, approved expenses, and work performed up to the termination date.",
      "After termination, we may revoke access to unpaid deliverables, pause services, and archive or delete project materials according to our retention practices.",
    ],
  },
  {
    title: "10. Limitation of Liability",
    content: [
      "To the maximum extent permitted by law, Diginfo will not be liable for indirect, incidental, special, consequential, punitive, or business losses, including loss of profits, data, traffic, rankings, leads, goodwill, or revenue.",
      "Our total liability for any claim related to services will be limited to the amount paid by you to Diginfo for the specific service giving rise to the claim during the relevant billing period, unless the law requires otherwise.",
    ],
  },
  {
    title: "11. Governing Law",
    content: [
      "These terms are governed by the laws of India. Subject to applicable law, disputes will be handled by the competent courts having jurisdiction over Indore, Madhya Pradesh, India.",
    ],
  },
  {
    title: "12. Changes to These Terms",
    content: [
      "We may update these Terms & Conditions to reflect changes in our services, operations, pricing, legal requirements, or industry practices. The latest version will be posted on this page with the updated effective date.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="policy-page">
      <section className="policy-hero">
        <div className="wrap policy-hero-inner">
          <div className="policy-kicker">Terms & Conditions</div>
          <h1>
            Clear expectations make better digital partnerships.
          </h1>
          <p>
            These terms explain how Diginfo works with clients across digital
            marketing, web development, creative design, automation, consulting,
            and IT services.
          </p>
          <div className="policy-meta">
            <span>Effective date: May 16, 2026</span>
            <span>Applies to website visitors, leads, clients, and service users</span>
          </div>
        </div>
      </section>

      <section className="policy-content-section">
        <div className="wrap policy-layout">
          <aside className="policy-summary" aria-label="Terms summary">
            <h2>Working with Diginfo</h2>
            <ul>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="policy-contact-card">
              <h3>Have a project question?</h3>
              <p>
                Reach us at <a href="mailto:contact@diginfo.ai">contact@diginfo.ai</a>
                {" "}or <a href="tel:+918889123454">+91 8889123454</a>.
              </p>
            </div>
          </aside>

          <article className="policy-document">
            <p className="policy-intro">
              Diginfo aims to keep every engagement practical, transparent, and
              growth-focused. Please read these terms carefully before using our
              website or engaging our services.
            </p>

            {sections.map((section) => (
              <section key={section.title} className="policy-block">
                <h2>{section.title}</h2>
                {section.content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}

            <section className="policy-block">
              <h2>13. Contact Us</h2>
              <p>
                For questions about these Terms & Conditions, contact Diginfo at
                Vijay Nagar, Indore, Madhya Pradesh, India, email
                <a href="mailto:contact@diginfo.ai"> contact@diginfo.ai</a>, or
                phone <a href="tel:+918889123454">+91 8889123454</a>.
              </p>
              <p>
                You can also read our{" "}
                <Link href="/privacy-policy">Privacy Policy</Link> to understand
                how we handle personal and business information.
              </p>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
