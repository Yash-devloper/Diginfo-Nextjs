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

export default async function Home() {
  // The homepage remains available even if the blog data source is temporarily
  // unavailable; BlogSection receives a safe empty array in that case.
  const blogs = await getLatestBlogs(4).catch((error) => {
    console.error("Failed to load homepage blogs:", error);
    return [];
  });

  return (
    <>
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
