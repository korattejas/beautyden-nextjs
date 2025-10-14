import type { Metadata } from "next";
import { createSEOMetadata, siteUrl } from "@/lib/seo";
import ReviewsPageContent from "@/app/(marketing)/reviews/ReviewsPageContent";

export const metadata: Metadata = createSEOMetadata({
  titleDefault: "Customer Reviews & Testimonials - BeautyDen Beauty Services",
  description: "Read genuine customer reviews and testimonials for BeautyDen's home beauty services. See real experiences, ratings, and feedback from satisfied customers.",
  keywords: [
    "beauty service reviews",
    "beauty customer testimonials",
    "beauty service ratings",
    "beauty customer feedback",
    "beauty service experiences",
    "beauty service reviews online",
    "beauty customer stories",
    "beauty service testimonials",
    "beauty service feedback",
    "beauty customer reviews"
  ],
  canonical: `${siteUrl}/reviews`,
});

export default function ReviewsPage() {
  return <ReviewsPageContent />;
}
