import AboutHero from "@/sections/about/AboutHero";
import AboutMission from "@/sections/about/AboutMission";
import AboutStats from "@/sections/about/AboutStats";
// import AboutTeam from "@/sections/about/AboutTeam";
import AboutValues from "@/sections/about/AboutValues";
import WhyChooseUsSection from "@/sections/home/WhyChooseUsSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://beautyden.in"), // Replace with your domain
  title: {
    default: "About BeautyDen - Professional Beauty Services at Your Doorstep",
    template: "%s | BeautyDen",
  },
  description:
    "Experience premium beauty services at home. Professional makeup, skincare, hair care, spa treatments delivered by certified experts across India.",
  keywords: [
    "beauty services",
    "home beauty service",
    "professional makeup",
    "bridal makeup",
    "skincare",
    "hair care",
    "spa at home",
    "beauty salon at home",
    "beauty parlour at home",
  ],
  authors: [{ name: "BeautyDen" }],
  creator: "BeautyDen",
  publisher: "BeautyDen",
  alternates: {
    canonical: "https://beautyden.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://beautyden.in",
    title: "BeautyDen - Professional Beauty Services at Your Doorstep",
    description:
      "Experience premium beauty services at home. Professional makeup, skincare, hair care delivered by certified experts.",
    siteName: "BeautyDen",
    images: [
      {
        url: "https://beautyden.in/logo.png",
        width: 1200,
        height: 630,
        alt: "BeautyDen Beauty Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BeautyDen - Professional Beauty Services at Your Doorstep",
    description:
      "Experience premium beauty services at home delivered by certified experts.",
    images: ["https://beautyden.in/twitter-image.jpg"],
    creator: "@beautyden",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

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
