import AboutSection from "@/components/AboutSection";
import MissionVision from "@/components/MissionVision";
import OurStory from "@/components/OurStory";
import Team from "@/components/Team";
import LifeAtDiginfo from "@/components/LifeAtDiginfo";

export const metadata = {
  title: "About Diginfo Agency | Digital Marketing & Web Growth",
  description: "Discover Diginfo Agency's mission, team, and full-service digital solutions for growing brands.",
};

export default function AboutPage() {
  return (
    <>
      <AboutSection />
      <MissionVision />
      <OurStory />
      <Team />
      <LifeAtDiginfo />
    </>
  );
}