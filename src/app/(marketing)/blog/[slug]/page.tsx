import BlogViewMain from "@/sections/blog/BlogViewMain";
import { getBlogById } from "@/services/blog.service";
import { createBlogPostSEOMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const response = await getBlogById(slug);
    const blogData = response.data;
    
    return createBlogPostSEOMetadata({
      title: blogData.title,
      meta_description: blogData.meta_description || blogData.excerpt || `Read about ${blogData.title} on BeautyDen blog.`,
      meta_keywords: blogData.meta_keywords || "beauty tips, beauty blog, beauty advice",
      slug: blogData.slug || slug,
      category_name: blogData.category_name,
      author: blogData.author || "BeautyDen Team",
      publish_date: blogData.publish_date,
      icon: blogData.icon || undefined,
    });
  } catch (error) {
    console.error("Error generating metadata for blog post:", error);
    // Fallback metadata
    return createBlogPostSEOMetadata({
      title: "Beauty Blog Post | BeautyDen",
      meta_description: "Read our latest beauty tips and advice on BeautyDen blog.",
      meta_keywords: "beauty tips, beauty blog, beauty advice",
      slug: (await params).slug,
      category_name: "Beauty",
      author: "BeautyDen Team",
      publish_date: new Date().toISOString().split('T')[0],
    });
  }
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogViewMain identifier={slug} />;
}
