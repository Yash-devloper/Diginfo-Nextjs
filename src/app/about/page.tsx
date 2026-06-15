import AboutSection from "@/components/AboutSection";
import MissionVision from "@/components/MissionVision";
import OurStory from "@/components/OurStory";
import Team from "@/components/Team";
import LifeAtDiginfo from "@/components/LifeAtDiginfo";
import InternationalClients from "@/components/InternationalClients";
import CtaSection from "@/components/CtaSection";
import LeadershipSection from "@/components/LeadershipSection";

export const metadata = {
  title: "About Diginfo — Digital Agency Founded 2019, Indore",
  description: "Diginfo Expert Services: Indore's growth-focused digital marketing agency since 2019",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <AboutSection />
      <MissionVision />
      <OurStory />
      <LeadershipSection />
      <Team />
      <InternationalClients />
      <LifeAtDiginfo />
      <CtaSection />
    </main>
  );
}
