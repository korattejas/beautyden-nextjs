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
  description: "Learn about BeautyDen's mission to bring professional beauty services to your home. Discover our story, values, and commitment to quality beauty treatments delivered by certified experts.",
  keywords: [
    "about beauty services",
    "beauty company story",
    "beauty service mission",
    "professional beauty team",
    "beauty service values",
    "home beauty company",
    "beauty service quality",
    "beauty service expertise",
    "beauty service commitment",
    "beauty service vision"
  ],
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
