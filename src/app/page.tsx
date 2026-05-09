import { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WhySection from "@/components/WhySection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import BlogSection from "@/components/BlogSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";

export const metadata: Metadata = {
  title: "Diginfo - Digital Agency",
  description: "Leading digital solutions for SEO, social media, and web development.",
};

export default function Home() {
  return (
    <>
      <Hero />
      <AboutSection />
      <WhySection />
      {/* <ServicesSection /> */}
      <ProcessSection />
      <TestimonialsSection />
      {/* <PricingSection /> */}
      <BlogSection />
    </>
  );
}