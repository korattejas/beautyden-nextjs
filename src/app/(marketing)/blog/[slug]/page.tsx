import BlogViewMain from "@/sections/blog/BlogViewMain";

type PageProps = {
  params: {
    slug: string;
  };
};

export default async function BlogPage({ params }: PageProps) {
  return <BlogViewMain identifier={params.slug} />;
}
