import type { Metadata } from "next";
import { createSEOMetadata, siteUrl } from "@/lib/seo";
import ServicesPageContent from "@/app/(marketing)/services/ServicesPageContent";

export const metadata: Metadata = createSEOMetadata({
  titleDefault: "Beauty Services - Professional Home Beauty Treatments",
  description: "Explore our complete range of beauty services including makeup, hair styling, skincare, spa treatments, and more. Professional beauty services delivered to your home.",
  keywords: [
    "beauty services",
    "home beauty treatments",
    "makeup services",
    "hair styling services",
    "skincare treatments",
    "spa at home",
    "beauty parlour services",
    "beauty salon services",
    "professional beauty services",
    "beauty treatments at home"
  ],
  canonical: `${siteUrl}/services`,
});

export default function ServicesPage() {
  return <ServicesPageContent />;
}
