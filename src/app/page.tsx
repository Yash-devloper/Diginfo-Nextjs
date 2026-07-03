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

export const metadata: Metadata = {
  title: "Diginfo — Digital Marketing, AI Search & IT Agency",
  description: "Get found on Google and AI search, turn visibility into customers, and build the tech behind it — digital marketing, AEO/GEO and IT under one roof, for clients worldwide.",
};

export default function Home() {
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
      <DeferredHomeSections />
      <CtaSection />
      <HomeNewsletterSection />
    </>
  );
}
