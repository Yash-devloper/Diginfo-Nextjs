import { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WhySection from "@/components/WhySection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import AISearchSection from "@/components/AISearchSection";
import ProcessSection from "@/components/ProcessSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";
import DeferredHomeSections from "@/components/DeferredHomeSections";
import HomeNewsletterSection from "@/components/HomeNewsletterSection";
import { getLatestBlogs } from "@/lib/blogServer";

// The homepage includes the latest blog cards, so it must not serve a stale
// pre-rendered version after an editor publishes a new post.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Diginfo — Digital Marketing, AI Search & IT Agency",
  description:
    "Get found on Google and AI search, then turn that visibility into customers — SEO, AEO/GEO, ads, social, and the IT behind it, all under one in-house team.",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AdvertisingAgency",
  "@id": "https://diginfo.ai/#business",
  name: "Diginfo",
  url: "https://diginfo.ai/",
  logo: "https://diginfo.ai/logo.png",
  image: "https://diginfo.ai/logo.png",
  description:
    "Diginfo is a Digital Marketing and IT Services agency based in Indore, India, offering SEO, AI Search Optimisation, PPC, Social Media Marketing, Website Development, App Development, ERP & CRM Solutions, Creative Branding and Workflow Automation.",
  telephone: "+91-8889123454",
  email: "contact@diginfo.ai",
  address: {
    "@type": "PostalAddress",
    streetAddress:
      "204, Antares Princes' Business Skypark, Scheme No. 54, PU-3 Commercial, Agra Bombay Road, Opposite Orbit Mall",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "452001",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 22.7463,
    longitude: 75.8973,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Indore" },
    { "@type": "State", name: "Madhya Pradesh" },
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Australia" },
  ],
  sameAs: ["https://www.linkedin.com/company/diginfo-ai"],
  priceRange: "$$",
  foundingDate: "2019",
  knowsAbout: [
    "SEO",
    "AI Search Optimisation",
    "Generative Engine Optimisation",
    "Google Ads",
    "Meta Ads",
    "Social Media Marketing",
    "Website Development",
    "App Development",
    "Content Marketing",
    "Branding",
    "ERP Development",
    "CRM Development",
  ],
};

export default async function Home() {
  // The homepage remains available even if the blog data source is temporarily
  // unavailable; BlogSection receives a safe empty array in that case.
  const blogs = await getLatestBlogs(4).catch((error) => {
    console.error("Failed to load homepage blogs:", error);
    return [];
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <CapabilitiesSection />
      <AboutSection />
      <WhySection />
      <AISearchSection />
      <ProcessSection />
      <FaqSection />
      {/* <PricingSection /> */}
      <DeferredHomeSections blogs={blogs} />
      <CtaSection />
      <HomeNewsletterSection />
    </>
  );
}
