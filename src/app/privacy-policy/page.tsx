import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Diginfo",
  description:
    "How Diginfo collects, uses and protects your data, in line with India's DPDP Act and GDPR.",
};

const highlights = [
  "Transparent data collection",
  "Secure project communication",
  "Responsible marketing practices",
  "Clear user choice and control",
];

const sections = [
  {
    title: "1. Information We Collect",
    content: [
      "We may collect personal and business information when you contact us, request a quote, fill out a form, subscribe to updates, or work with us on a digital marketing, design, development, automation, or IT project.",
      "This information may include your name, company name, email address, phone number, website URL, billing details, project requirements, marketing goals, analytics access, ad account information, CRM details, and communication history.",
      "We may also collect technical information such as device type, browser, IP address, pages visited, form interactions, referral source, and cookie-based data to improve our website experience and marketing performance.",
    ],
  },
  {
    title: "2. How We Use Your Information",
    content: [
      "We use information to respond to inquiries, prepare proposals, deliver services, manage projects, process payments, provide customer support, send relevant updates, and improve our website, campaigns, and internal operations.",
      "For digital marketing services, we may use approved data to plan campaigns, measure performance, create audiences, optimize ads, analyze traffic, improve conversion rates, and prepare reports.",
      "We do not sell your personal information. We use your data only for legitimate business purposes, service delivery, compliance, security, and communication with you.",
    ],
  },
  {
    title: "3. Cookies, Analytics, and Marketing Tools",
    content: [
      "Our website may use cookies, pixels, analytics scripts, and similar technologies to understand visitor behavior, measure campaigns, remember preferences, and improve content.",
      "We may use third-party platforms such as Google Analytics, Google Ads, Meta Ads, LinkedIn, CRM tools, email platforms, hosting providers, payment gateways, and project management tools where required for our services.",
      "You can control cookies through your browser settings. Some parts of the website may not work as expected if cookies are disabled.",
    ],
  },
  {
    title: "4. Sharing of Information",
    content: [
      "We may share information with trusted service providers, employees, consultants, hosting partners, analytics providers, advertising platforms, payment processors, legal advisors, or technology vendors who help us deliver services.",
      "We may also disclose information if required by law, regulation, court order, government request, business transfer, fraud prevention, or to protect the rights, property, and safety of Diginfo, our clients, and users.",
      "Where third-party tools are used, their own privacy policies and terms may also apply.",
    ],
  },
  {
    title: "5. Data Security and Retention",
    content: [
      "We use reasonable administrative, technical, and organizational safeguards to protect information from unauthorized access, misuse, alteration, loss, or disclosure.",
      "No internet-based service can be guaranteed completely secure. You are responsible for keeping account credentials, access permissions, and passwords confidential.",
      "We retain information only as long as necessary for the purpose collected, active service delivery, legal obligations, accounting records, dispute resolution, security, and legitimate business needs.",
    ],
  },
  {
    title: "6. Your Rights and Choices",
    content: [
      "You may request access, correction, update, deletion, restriction, or withdrawal of consent for personal information, subject to legal, contractual, and operational requirements.",
      "You may unsubscribe from promotional emails or request that we stop sending non-essential marketing communications. Service-related messages may still be sent where necessary.",
      "For requests related to data held in third-party advertising, analytics, hosting, or CRM platforms, we may guide you to the relevant platform settings or support process.",
    ],
  },
  {
    title: "7. Children's Privacy",
    content: [
      "Our services are intended for businesses, professionals, and organizations. We do not knowingly collect personal information from children. If you believe a child has provided information to us, please contact us so we can review and remove it where appropriate.",
    ],
  },
  {
    title: "8. Updates to This Policy",
    content: [
      "We may update this Privacy Policy from time to time to reflect changes in our services, technology, legal requirements, or business practices. The latest version will be posted on this page with the updated effective date.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="policy-page">
      <section className="policy-hero">
        <div className="wrap policy-hero-inner">
          <div className="policy-kicker">Privacy Policy</div>
          <h1>
            Your data deserves the same care as your brand.
          </h1>
          <p>
            This policy explains how Diginfo collects, uses, protects, and
            manages information while providing digital marketing, website
            development, design, automation, and IT solutions.
          </p>
          <div className="policy-meta">
            <span>Effective date: May 16, 2026</span>
            <span>Applies to Diginfo website, leads, clients, and service users</span>
          </div>
        </div>
      </section>

      <section className="policy-content-section">
        <div className="wrap policy-layout">
          <aside className="policy-summary" aria-label="Policy summary">
            <h2>At a glance</h2>
            <ul>
              {highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="policy-contact-card">
              <h3>Need help with your data?</h3>
              <p>
                Email us at <a href="mailto:contact@diginfo.ai">contact@diginfo.ai</a>
                {" "}or call <a href="tel:+918889123454">+91 8889123454</a>.
              </p>
            </div>
          </aside>

          <article className="policy-document">
            <p className="policy-intro">
              Diginfo respects your privacy and is committed to handling
              information responsibly. This policy is written for website
              visitors, leads, clients, vendors, and partners who interact with
              Diginfo online or through our services.
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
              <h2>9. Contact Us</h2>
              <p>
                For privacy questions, data requests, or concerns, contact
                Diginfo at Vijay Nagar, Indore, Madhya Pradesh, India, email
                <a href="mailto:contact@diginfo.ai"> contact@diginfo.ai</a>, or
                phone <a href="tel:+918889123454">+91 8889123454</a>.
              </p>
              <p>
                You can also review our{" "}
                <Link href="/terms">Terms & Conditions</Link> to understand the
                service rules that apply when working with us.
              </p>
            </section>
          </article>
        </div>
      </section>
    </main>
  );
}
