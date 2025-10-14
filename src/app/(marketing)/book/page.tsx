import type { Metadata } from "next";
import { createSEOMetadata, siteUrl } from "@/lib/seo";
import BookingPageContent from "@/app/(marketing)/book/BookingPageContent";

export const metadata: Metadata = createSEOMetadata({
  titleDefault: "Book Beauty Services Online - Schedule Home Beauty Appointments",
  description: "Book professional beauty services online. Schedule makeup, hair, skincare, and spa treatments at home. Easy booking, certified experts, flexible timing.",
  keywords: [
    "book beauty services online",
    "schedule beauty appointment",
    "home beauty booking",
    "beauty service booking",
    "online beauty appointment",
    "book makeup artist",
    "book hair stylist",
    "beauty service scheduler",
    "at home beauty booking",
    "beauty appointment booking"
  ],
  canonical: `${siteUrl}/book`,
});

export default function BookingPage() {
  return <BookingPageContent />;
}
