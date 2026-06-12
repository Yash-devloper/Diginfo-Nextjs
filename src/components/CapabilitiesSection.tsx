import {
  CircleDot,
  Code2,
  Megaphone,
  Palette,
  Search,
  Settings,
  Smartphone,
  Sparkles,
  Workflow,
} from "lucide-react";
import type { ComponentType } from "react";

type CapabilityItem = {
  icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  description: string;
  badge?: string;
};

const marketingItems: CapabilityItem[] = [
  {
    icon: Search,
    title: "SEO",
    description: "Get found on Google by buyers ready to act.",
  },
  {
    icon: Sparkles,
    title: "AI Search Optimisation (AEO/GEO)",
    description: "Be the business AI tools recommend.",
    // badge: "FLAGSHIP",
  },
  {
    icon: CircleDot,
    title: "Performance Ads (PPC)",
    description: "Google & Meta ads engineered for ROI.",
  },
  {
    icon: Megaphone,
    title: "Social Media Marketing",
    description: "Content and community that builds demand.",
  },
  {
    icon: Palette,
    title: "Creative & Branding",
    description: "Identity and creative that earns trust on sight.",
  },
];

const itItems: CapabilityItem[] = [
  {
    icon: Code2,
    title: "Web Design & Development",
    description: "Fast, high-converting React or WordPress sites.",
  },
  {
    icon: Settings,
    title: "ERP & CRM Solutions",
    description: "Custom systems and automation for your operations.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Mobile apps built for smooth, scalable customer experiences.",
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Connect your tools and remove manual work.",
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="capabilities-sec" id="capabilities">
      <div className="wrap">
        <div className="capabilities-head">
          <div className="pill-label capabilities-pill">WHAT WE DO</div>
          <h2 className="h2">
            Two Capabilities. <span className="gt">One Team.</span>
          </h2>
          <p>
            Most businesses juggle a marketing agency and a separate IT vendor.
            We give you both - strategy, execution, and the technical build -
            under one roof.
          </p>
        </div>

        <div className="capabilities-grid">
          <article className="capability-card capability-card-marketing">
            <p className="capability-kicker">DIGITAL MARKETING</p>
            <h3>Get found and chosen</h3>

            <div className="capability-list">
              {marketingItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="capability-item" key={item.title}>
                    <div className="capability-icon capability-icon-warm">
                      <Icon size={15} strokeWidth={2.4} />
                    </div>
                    <div className="capability-copy">
                      <div className="capability-title-row">
                        <h4>{item.title}</h4>
                        {item.badge ? (
                          <span className="capability-badge">{item.badge}</span>
                        ) : null}
                      </div>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className="capability-card capability-card-it">
            <p className="capability-kicker">IT SERVICES</p>
            <h3>Build what runs it</h3>

            <div className="capability-list">
              {itItems.map((item) => {
                const Icon = item.icon;

                return (
                  <div className="capability-item" key={item.title}>
                    <div className="capability-icon capability-icon-cool">
                      <Icon size={15} strokeWidth={2.4} />
                    </div>
                    <div className="capability-copy">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
