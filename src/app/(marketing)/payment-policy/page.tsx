import PolicyContent from "@/sections/policy/PolicyContent";
import PolicyHero from "@/sections/policy/PolicyHero";
import type { Metadata } from "next";
import { createSEOMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = createSEOMetadata({
  titleDefault: "Payment Policy - BeautyDen Payment Terms & Conditions",
  description: "Learn about BeautyDen's payment policy, accepted payment methods, refund policy, and billing terms for home beauty services. Secure and transparent payment processing.",
  keywords: [
    "beauty service payment policy",
    "beauty payment terms",
    "beauty service billing",
    "beauty payment methods",
    "beauty service refund policy",
    "beauty payment security",
    "beauty service payment options",
    "beauty payment conditions",
    "beauty service payment terms",
    "beauty payment guidelines"
  ],
  canonical: `${siteUrl}/payment-policy`,
});

export default function PaymentPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PolicyHero type="payment_policy" />
      <PolicyContent type="payment_policy" />
    </div>
  );
}
