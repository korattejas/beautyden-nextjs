import type { Metadata } from "next";

type CreateSEOMetadataArgs = {
  titleDefault?: string;
  titleTemplate?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  images?: { url: string; width?: number; height?: number; alt?: string }[];
  robots?: {
    index?: boolean;
    follow?: boolean;
    googleBot?: {
      index?: boolean;
      follow?: boolean;
      "max-video-preview"?: number;
      "max-image-preview"?: "none" | "standard" | "large";
      "max-snippet"?: number;
    };
  };
};

export const siteUrl = "https://beautyden.in";

const defaultDescription =
  "Experience premium beauty services at home. Professional makeup, skincare, hair care, spa treatments delivered by certified experts across India.";

const defaultKeywords: string[] = [
  "beauty services",
  "home beauty service",
  "professional makeup",
  "bridal makeup",
  "skincare",
  "hair care",
  "spa at home",
  "beauty salon at home",
  "beauty parlour at home",
];

const defaultImages = [
  {
    url: `${siteUrl}/logo.png`,
    width: 1200,
    height: 630,
    alt: "BeautyDen Beauty Services",
  },
];

export function createSEOMetadata(args: CreateSEOMetadataArgs = {}): Metadata {
  const {
    titleDefault = "BeautyDen - Professional Beauty Services at Your Doorstep",
    titleTemplate = "%s | BeautyDen",
    description = defaultDescription,
    keywords = defaultKeywords,
    canonical = siteUrl,
    images = defaultImages,
    robots: customRobots,
  } = args;

  const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
      default: titleDefault,
      template: titleTemplate,
    },
    description,
    keywords,
    authors: [{ name: "BeautyDen" }],
    creator: "BeautyDen",
    publisher: "BeautyDen",
    alternates: {
      canonical,
    },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonical,
      title: titleDefault,
      description,
      siteName: "BeautyDen",
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: titleDefault,
      description,
      images: images.map((img) => img.url),
      creator: "@beautyden",
    },
    robots: customRobots || {
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

  return metadata;
}

// Dynamic SEO for blog posts using API data
export function createBlogPostSEOMetadata(blogData: {
  title: string;
  meta_description: string;
  meta_keywords: string;
  slug: string;
  category_name: string;
  author: string;
  publish_date: string;
  icon?: string;
}): Metadata {
  const keywords = blogData.meta_keywords 
    ? blogData.meta_keywords.split(', ').map(k => k.trim())
    : ['beauty tips', 'beauty blog', 'beauty advice'];

  return createSEOMetadata({
    titleDefault: `${blogData.title} | BeautyDen Blog`,
    description: blogData.meta_description || `Read about ${blogData.title} on BeautyDen blog. Expert beauty tips and advice.`,
    keywords: keywords,
    canonical: `${siteUrl}/blog/${blogData.slug}`,
    images: blogData.icon ? [{
      url: blogData.icon,
      width: 1200,
      height: 630,
      alt: blogData.title,
    }] : undefined,
  });
}


