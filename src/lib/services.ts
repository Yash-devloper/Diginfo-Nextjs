export type ServiceDetail = {
  slug: string;
  title: string;
  shortTitle: string;
  cardDescription: string;
  description: string;
  highlights: string[];
  tags: string[];
  intro: string;
  benefits: string[];
  process: string[];
  seoTitle: string;
  seoDescription: string;
};

export const services: ServiceDetail[] = [
  {
    slug: "search-engine-optimisation",
    title: "SEO Optimisation",
    shortTitle: "SEO Optimisation",
    cardDescription: "Improve ranking and traffic",
    description:
      "A full-service SEO agency delivering organic search optimisation — technical SEO, content, and link building — for businesses across industries, from SaaS and B2B to e-commerce. Work directly with a senior SEO consultant from day one: no account managers relaying messages, no junior teams learning on your budget.",
    highlights: ["Full technical SEO audit", "Keyword research", "On-page optimization", "Monthly reporting"],
    tags: ["Technical", "Local SEO", "Link Building"],
    intro:
      "Search sends more ready-to-buy traffic than almost any other channel — but only to businesses that show up. Diginfo builds that visibility from the ground up: fixing the technical issues holding your site back, aligning every page with what your buyers actually search for, and building the authority signals that move you up the results — and keep you there.",
    benefits: [
      "Higher visibility for high-intent commercial keywords",
      "Better website structure, speed, indexing, and crawlability",
      "Local SEO improvements for location-based searches",
      "Clear monthly insights on rankings, traffic, and conversions",
    ],
    process: [
      "Audit your website, competitors, keywords, and current search performance",
      "Fix technical issues and improve page structure, metadata, and content",
      "Create SEO content opportunities and strengthen internal linking",
      "Track progress monthly and refine the strategy based on search data",
    ],
    seoTitle: "SEO Company & Agency — Organic Search That Drives Revenue | Diginfo",
    seoDescription:
      "A full-service SEO company and agency delivering organic search optimisation for SaaS, B2B, e-commerce and growth brands. Work directly with a senior SEO consultant — free audit inside.",
  },
  {
    slug: "ai-search-optimisation-aeo-geo",
    title: "AI Search Optimisation (AEO/GEO)",
    shortTitle: "AI Search Optimisation",
    cardDescription: "Win visibility in AI answers",
    description:
      "Prepare your brand for AI-powered discovery with answer engine optimization, generative engine optimization, structured content, and authority signals that help your business appear in AI search results.",
    highlights: ["AEO & GEO strategy", "AI-ready content", "Schema & entity signals", "Brand authority building"],
    tags: ["AEO", "GEO", "AI Search"],
    intro:
      "Diginfo's AI Search Optimisation service helps your business show up when customers ask ChatGPT, Gemini, Perplexity, Google AI Overviews, and other answer engines for recommendations. We structure your website, content, and brand signals so AI systems can understand, trust, and cite your business more confidently.",
    benefits: [
      "Better visibility in AI answers, summaries, and recommendation-style searches",
      "Content built around direct questions, entities, comparisons, and buyer intent",
      "Improved structured data, internal linking, and topical authority",
      "A future-ready search strategy that works alongside traditional SEO",
    ],
    process: [
      "Audit your current SEO, content depth, entity clarity, and AI search visibility",
      "Map the questions, prompts, and topics your ideal customers ask AI tools",
      "Create answer-focused pages, FAQs, schema, and authority-building content",
      "Track mentions, rankings, traffic signals, and refine content for better discovery",
    ],
    seoTitle: "AI SEO Services - AEO, GEO & AI Search Optimization | Diginfo",
    seoDescription:
      "Diginfo builds AI SEO, AEO and GEO strategies that get ChatGPT, Gemini, Perplexity and AI Overviews to recommend your brand. Get a free AI search audit.",
  },
  {
    slug: "social-media-marketing",
    title: "Social Media Marketing (SMM)",
    shortTitle: "Social Media Marketing",
    cardDescription: "Boost brand engagement",
    description:
      "Grow your brand on Instagram, Facebook, LinkedIn, YouTube, and WhatsApp with content strategy, creative production, and consistent community management.",
    highlights: ["Content strategy", "Reels & creatives", "Community management", "YouTube marketing", "WhatsApp marketing"],
    tags: ["Instagram", "Facebook", "LinkedIn"],
    intro:
      "Our social media marketing service turns your brand into a consistent, recognizable presence across the platforms your audience uses every day. We plan content, create visuals, manage posting, and help convert attention into enquiries.",
    benefits: [
      "Platform-specific content that matches your audience and goals",
      "Stronger brand recall through consistent creative direction",
      "More engagement from reels, carousels, campaigns, and stories",
      "Community management that keeps conversations active and useful",
    ],
    process: [
      "Study your audience, competitors, offers, and current social presence",
      "Build a monthly content calendar with campaign themes and formats",
      "Create posts, reels, captions, and platform-ready creatives",
      "Review performance and adjust content based on engagement and leads",
    ],
    seoTitle: "Social Media Marketing Services | Diginfo",
    seoDescription:
      "Content, creative and community that build durable demand across Instagram, LinkedIn, Facebook and YouTube.",
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing",
    shortTitle: "Performance Marketing",
    cardDescription: "Google, Meta, and retargeting ads",
    description:
      "Launch measurable ad campaigns across Google Ads, Meta Ads, and retargeting funnels focused on leads, sales, and return on ad spend.",
    highlights: ["Google Ads", "Meta Ads", "Retargeting"],
    tags: ["Google Ads", "Meta Ads"],
    intro:
      "Diginfo's performance marketing service is built for businesses that need accountable growth. We plan campaigns around clear conversion goals, test messaging and audiences, and optimize spend toward the channels that produce results.",
    benefits: [
      "Campaigns structured around leads, purchases, calls, or enquiries",
      "Better budget control through testing and conversion tracking",
      "Retargeting funnels that bring warm audiences back",
      "Transparent reporting on spend, conversions, and performance trends",
    ],
    process: [
      "Define campaign goals, target audiences, offers, and tracking needs",
      "Set up ad accounts, conversion events, landing pages, and creatives",
      "Launch Google, Meta, and retargeting campaigns with controlled tests",
      "Optimize bids, budgets, audiences, and creatives based on results",
    ],
    seoTitle: "Performance Marketing Agency — Google & Meta Ads | Diginfo",
    seoDescription:
      "Diginfo is a performance marketing agency running Google Ads, Meta Ads and retargeting funnels built for ROAS. Free ad account audit — work with a senior consultant.",
  },
  {
    slug: "website-design-development",
    title: "Website Design & Development",
    shortTitle: "Web Development",
    cardDescription: "Fast & modern websites",
    description:
      "Design and develop fast, modern, SEO-ready websites using user-focused UI/UX, flexible technology choices, and scalable development practices.",
    highlights: ["UI/UX website design", "Custom website development", "SEO-ready build"],
    tags: ["Responsive Design", "Custom Development", "Scalable Tech"],
    intro:
      "Your website is often the first serious proof of your business. Diginfo designs and develops websites that look sharp, load fast, explain your offer clearly, and support search visibility from day one.",
    benefits: [
      "Responsive website design for mobile, tablet, and desktop users",
      "Clear user journeys that guide visitors toward enquiries and sales",
      "SEO-ready structure, metadata, speed, and content foundations",
      "Flexible builds for business websites, landing pages, CMS needs, and custom development stacks",
    ],
    process: [
      "Map your goals, pages, users, content needs, and conversion actions",
      "Create UI/UX direction with layouts that fit your brand and audience",
      "Develop the website with the right technology stack for your goals, budget, and growth plans",
      "Test responsiveness, speed, forms, SEO basics, and launch readiness",
    ],
    seoTitle: "Website Design & Development — React & WordPress | Diginfo",
    seoDescription:
      "Fast, secure, conversion-focused websites and platforms — custom React or WordPress, SEO-ready, with analytics and integrations.",
  },
  {
    slug: "app-development",
    title: "APP Development",
    shortTitle: "APP Development",
    cardDescription: "Custom mobile and web apps",
    description:
      "Plan, design, and develop scalable mobile and web applications with smooth user experiences, secure architecture, and business-ready features.",
    highlights: ["Android & iOS apps", "Web app development", "UI/UX app design", "API integrations"],
    tags: ["Mobile Apps", "Web Apps", "UI/UX"],
    intro:
      "Diginfo's APP Development service helps businesses turn ideas, workflows, and customer journeys into reliable digital products. We build apps that are easy to use, simple to manage, and ready to grow with your business.",
    benefits: [
      "Custom app experiences designed around your users and business goals",
      "Responsive mobile and web interfaces with clear navigation and fast performance",
      "Secure backend integrations for payments, forms, dashboards, APIs, and notifications",
      "Scalable development approach for MVPs, business tools, and customer-facing platforms",
    ],
    process: [
      "Understand your app idea, users, features, workflows, and success goals",
      "Create app architecture, user flows, wireframes, and UI direction",
      "Develop frontend, backend, integrations, and admin features in planned milestones",
      "Test usability, performance, security, and launch readiness before release",
    ],
    seoTitle: "App Development Services | Diginfo",
    seoDescription:
      "Mobile apps built for smooth, scalable customer experiences — from concept to launch and beyond.",
  },
  {
    slug: "erp-crm-solutions",
    title: "ERP & CRM Solutions",
    shortTitle: "ERP & CRM Solutions",
    cardDescription: "Automate teams and workflows",
    description:
      "Create custom ERP and CRM systems that organize leads, customers, teams, workflows, reporting, and business operations in one place.",
    highlights: ["Custom ERP", "CRM automation", "Workflow systems"],
    tags: ["ERP", "CRM"],
    intro:
      "Diginfo builds ERP and CRM solutions for businesses that are ready to reduce manual work and manage operations with better clarity. We design systems around your actual workflows instead of forcing your team into generic software.",
    benefits: [
      "Centralized lead, customer, team, and workflow management",
      "Automation for repeated tasks, follow-ups, reminders, and reporting",
      "Role-based dashboards that help teams see the right information",
      "Custom modules that match your business process and scale over time",
    ],
    process: [
      "Understand your departments, workflows, data, roles, and pain points",
      "Plan modules, dashboards, automations, and permissions",
      "Develop the ERP or CRM system with testing at each workflow stage",
      "Train users, collect feedback, and improve the system after launch",
    ],
    seoTitle: "ERP & CRM Solutions and Automation | Diginfo",
    seoDescription:
      "Custom ERP, CRM and workflow automation that run your operations at scale — built and integrated in-house.",
  },
  {
    slug: "creative-design-branding",
    title: "Creative Design & Branding",
    shortTitle: "Creative Design & Branding",
    cardDescription: "Brand identity and visual creatives",
    description:
      "Build a memorable brand identity with logo design, visual systems, social creatives, packaging design, videos, and campaign-ready brand assets.",
    highlights: ["Logo & identity", "Social creatives", "Packaging design"],
    tags: ["Branding", "Video"],
    intro:
      "Diginfo's creative design and branding service helps your business look consistent, credible, and memorable. From logo identity to social creatives and packaging, we create visuals that support recognition and trust.",
    benefits: [
      "A clear brand identity that looks consistent across every touchpoint",
      "Professional social creatives for campaigns, posts, and ads",
      "Packaging and marketing assets designed for recall and conversion",
      "Creative direction that keeps your visuals aligned with your message",
    ],
    process: [
      "Discover your brand positioning, audience, competitors, and style needs",
      "Create identity directions, color systems, typography, and visual rules",
      "Design campaign assets, social creatives, packaging, and brand material",
      "Refine final assets and prepare usable files for digital and print",
    ],
    seoTitle: "Creative Design & Branding Services | Diginfo",
    seoDescription:
      "Brand identity, social creative and design that earns trust at first impression.",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
