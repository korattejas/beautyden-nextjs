import BlogViewMain from "@/sections/blog/BlogViewMain";

interface PageProps {
  params: { slug: string };
}

export default function BlogPage({ params }: PageProps) {
  return <BlogViewMain identifier={params.slug} />;
}
