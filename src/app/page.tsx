import { Metadata } from "next";
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import WhySection from "@/components/WhySection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import BlogSection from "@/components/BlogSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection from "@/components/FaqSection";
import CtaSection from "@/components/CtaSection";

export const metadata: Metadata = {
  title: "Diginfo — Digital Marketing Agency Indore",
  description: "Leading digital marketing agency in Indore offering SEO, SMM, PPC and web development since 2019.",
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
      <FaqSection />
      {/* <PricingSection /> */}
      <BlogSection />
      <CtaSection />
    </>
  );
}