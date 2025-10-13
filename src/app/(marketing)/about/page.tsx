import AboutHero from "@/sections/about/AboutHero";
import AboutMission from "@/sections/about/AboutMission";
import AboutStats from "@/sections/about/AboutStats";
// import AboutTeam from "@/sections/about/AboutTeam";
import AboutValues from "@/sections/about/AboutValues";
import WhyChooseUsSection from "@/sections/home/WhyChooseUsSection";
import { Metadata } from "next";
import { createSEOMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = createSEOMetadata({
  titleDefault: "About BeautyDen - Professional Beauty Services at Your Doorstep",
  canonical: `${siteUrl}/about`,
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 mt-16">
      <AboutHero />
      <AboutMission />
      <AboutStats />
      {/* <AboutTeam /> */}
      <WhyChooseUsSection />
      <AboutValues />
    </div>
  );
}
