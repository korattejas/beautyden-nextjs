import PolicyContent from "@/sections/policy/PolicyContent";
import PolicyHero from "@/sections/policy/PolicyHero";
import type { Metadata } from "next";
import { createSEOMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = createSEOMetadata({
  titleDefault: "Terms & Conditions - BeautyDen Service Terms",
  description: "Read BeautyDen's terms and conditions for home beauty services. Understand service terms, booking policies, cancellation rules, and user responsibilities.",
  keywords: [
    "beauty service terms and conditions",
    "beauty service terms",
    "beauty booking terms",
    "beauty service conditions",
    "beauty service agreement",
    "beauty service rules",
    "beauty service policies",
    "beauty service terms of use",
    "beauty service legal terms",
    "beauty service user agreement"
  ],
  canonical: `${siteUrl}/terms-conditions`,
});

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PolicyHero type="terms_conditions" />
      <PolicyContent type="terms_conditions" />
    </div>
  );
}
