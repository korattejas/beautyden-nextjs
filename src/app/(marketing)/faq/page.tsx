import FAQHero from "@/sections/faq/FAQHero";
import FAQList from "@/sections/faq/FAQList";
import type { Metadata } from "next";
import { createSEOMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = createSEOMetadata({
  titleDefault: "Frequently Asked Questions - BeautyDen Beauty Services FAQ",
  description: "Find answers to common questions about BeautyDen's home beauty services. Learn about booking, pricing, services, and more. Get instant help and support.",
  keywords: [
    "beauty services FAQ",
    "home beauty questions",
    "beauty service help",
    "beauty booking FAQ",
    "beauty service support",
    "beauty appointment questions",
    "beauty service information",
    "beauty service guide",
    "beauty service help center",
    "beauty service customer support"
  ],
  canonical: `${siteUrl}/faq`,
});

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <FAQHero />
      <FAQList />
    </div>
  );
}
