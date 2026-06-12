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
    slug: "search-engine-optimization",
    title: "Search Engine Optimization (SEO)",
    shortTitle: "SEO Optimization",
    cardDescription: "Improve ranking and traffic",
    description:
      "Build long-term organic visibility with technical SEO, keyword strategy, on-page optimization, and reporting that connects rankings to real business growth.",
    highlights: ["Full technical SEO audit", "Keyword research", "On-page optimization", "Monthly reporting"],
    tags: ["Technical", "Local SEO", "Link Building"],
    intro:
      "Diginfo's SEO service helps your business appear where customers are already searching. We improve site health, align pages with search intent, and build a practical growth plan for organic traffic, leads, and brand trust.",
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
    seoTitle: "SEO Services | Search Engine Optimization Agency | Diginfo",
    seoDescription:
      "Grow organic traffic with Diginfo's SEO services, including technical audits, keyword research, on-page SEO, local SEO, link building, and monthly reporting.",
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
    seoTitle: "AI Search Optimisation Services | AEO & GEO Agency | Diginfo",
    seoDescription:
      "Grow visibility in AI search with Diginfo's AEO and GEO services, including AI-ready content, answer engine optimization, schema, entity signals, and authority building.",
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
    seoTitle: "Social Media Marketing Services | SMM Agency | Diginfo",
    seoDescription:
      "Build your brand with Diginfo's social media marketing services for Instagram, Facebook, LinkedIn, YouTube, WhatsApp, content strategy, reels, and community management.",
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
    seoTitle: "Performance Marketing Services | Google & Meta Ads | Diginfo",
    seoDescription:
      "Run ROI-focused performance marketing campaigns with Diginfo, including Google Ads, Meta Ads, retargeting, conversion tracking, and campaign optimization.",
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
    seoTitle: "Website Design & Development Services | Diginfo",
    seoDescription:
      "Get a modern, responsive, SEO-ready website with Diginfo's website design and development services for business websites, landing pages, CMS builds, and custom technology stacks.",
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
    seoTitle: "Custom ERP & CRM Solutions | Business Automation | Diginfo",
    seoDescription:
      "Digitize operations with Diginfo's custom ERP and CRM solutions for workflow automation, lead management, reporting, dashboards, and business process systems.",
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
      "Create a strong brand identity with Diginfo's creative design and branding services, including logo design, social creatives, packaging design, videos, and campaign assets.",
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}
