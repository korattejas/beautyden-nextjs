import type { Metadata } from "next";
import { createSEOMetadata, siteUrl } from "@/lib/seo";
import BlogPageContent from "@/app/(marketing)/blog/BlogPageContent";

export const metadata: Metadata = createSEOMetadata({
  titleDefault: "Beauty Blog - Expert Tips & Beauty Guides | BeautyDen",
  description: "Read our beauty blog for expert tips, guides, and tutorials on skincare, makeup, hair care, and nail care. Get professional beauty advice and home remedies from BeautyDen experts.",
  keywords: [
    "beauty blog",
    "beauty tips",
    "beauty guides",
    "skincare tips",
    "makeup tutorials",
    "hair care tips",
    "beauty advice",
    "beauty tutorials",
    "beauty articles",
    "beauty knowledge"
  ],
  canonical: `${siteUrl}/blog`,
});

export default function BlogPage() {
  return <BlogPageContent />;
}
