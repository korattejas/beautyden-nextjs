import { getBlogById } from "@/services/blog.service";
import BlogViewMainServer from "@/sections/blog/BlogViewMainServer";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface BlogPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const blogResponse = await getBlogById(slug);

    if (!blogResponse.status || !blogResponse.data) {
      return {
        title: "Blog Post Not Found",
        description: "The requested blog post could not be found.",
      };
    }

    const blog = blogResponse.data;

    return {
      title: blog.title,
      description: blog.excerpt || `Read ${blog.title} on our beauty blog`,
      openGraph: {
        title: blog.title,
        description: blog.excerpt || `Read ${blog.title} on our beauty blog`,
        images: blog.icon ? [{ url: blog.icon, alt: blog.title }] : [],
        type: "article",
        publishedTime: blog.publish_date,
        authors: blog.author ? [blog.author] : [],
        tags: blog.tags || [],
      },
      twitter: {
        card: "summary_large_image",
        title: blog.title,
        description: blog.excerpt || `Read ${blog.title} on our beauty blog`,
        images: blog.icon ? [blog.icon] : [],
      },
    };
  } catch (error) {
    return {
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;

  try {
    // Fetch blog data on the server
    const blogResponse = await getBlogById(slug);

    // If blog not found or request failed, show 404
    if (!blogResponse.status || !blogResponse.data) {
      notFound();
    }

    return <BlogViewMainServer blog={blogResponse.data} slug={slug} />;
  } catch (error) {
    console.error("Error fetching blog:", error);
    notFound();
  }
}
