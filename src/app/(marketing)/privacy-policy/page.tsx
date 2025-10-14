import PolicyContent from "@/sections/policy/PolicyContent";
import PolicyHero from "@/sections/policy/PolicyHero";
import type { Metadata } from "next";
import { createSEOMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = createSEOMetadata({
  titleDefault: "Privacy Policy - BeautyDen Data Protection & Privacy",
  description: "Read BeautyDen's privacy policy to understand how we collect, use, and protect your personal information. Learn about data security and your privacy rights.",
  keywords: [
    "beauty service privacy policy",
    "beauty data protection",
    "beauty service privacy",
    "beauty personal information",
    "beauty data security",
    "beauty privacy rights",
    "beauty service data policy",
    "beauty information security",
    "beauty privacy terms",
    "beauty data privacy"
  ],
  canonical: `${siteUrl}/privacy-policy`,
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PolicyHero type="privacy_policy" />
      <PolicyContent type="privacy_policy" />
    </div>
  );
}
