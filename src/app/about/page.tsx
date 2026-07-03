import AboutSection from "@/components/AboutSection";
import MissionVision from "@/components/MissionVision";
import OurStory from "@/components/OurStory";
import Team from "@/components/Team";
import LifeAtDiginfo from "@/components/LifeAtDiginfo";
import InternationalClients from "@/components/InternationalClients";
import CtaSection from "@/components/CtaSection";
import LeadershipSection from "@/components/LeadershipSection";

export const metadata = {
  title: "About Diginfo — Our Story, Founders & Team",
  description: "A digital marketing and IT services agency since 2019, working with clients in India and abroad. Meet the founders and how we work.",
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
