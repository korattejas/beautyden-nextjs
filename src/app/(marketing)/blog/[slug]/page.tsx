import BlogViewMain from "@/sections/blog/BlogViewMain";

export default function BlogPage({ params }: any) {
  return <BlogViewMain identifier={params.slug} />;
}
