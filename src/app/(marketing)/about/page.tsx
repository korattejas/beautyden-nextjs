import AboutHero from "@/sections/about/AboutHero";
import AboutMission from "@/sections/about/AboutMission";
import AboutStats from "@/sections/about/AboutStats";
import AboutTeam from "@/sections/about/AboutTeam";
import AboutValues from "@/sections/about/AboutValues";
import WhyChooseUsSection from "@/sections/home/WhyChooseUsSection";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <AboutHero />
      <AboutMission />
      <AboutStats />
      {/* <AboutTeam /> */}
      <WhyChooseUsSection />
      <AboutValues />
    </div>
  );
}
