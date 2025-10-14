import type { Metadata } from "next";
import { createSEOMetadata, siteUrl } from "@/lib/seo";
import HiringPageContent from "./HiringPageContent";

export const metadata: Metadata = createSEOMetadata({
  titleDefault: "Beauty Jobs & Careers - Join BeautyDen Team",
  description: "Join BeautyDen's growing team of beauty professionals. Find makeup artist jobs, hair stylist positions, and beauty career opportunities. Competitive packages, flexible schedules.",
  keywords: [
    "beauty jobs",
    "makeup artist jobs",
    "hair stylist jobs",
    "beauty career opportunities",
    "beauty professional jobs",
    "beauty industry careers",
    "beauty service jobs",
    "beauty therapist jobs",
    "beauty consultant jobs",
    "beauty industry employment"
  ],
  canonical: `${siteUrl}/hiring`,
});

export default function HiringPage() {
  return <HiringPageContent />;
}
