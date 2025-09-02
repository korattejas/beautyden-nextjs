"use client";

import { useState } from "react";
import { useBlogs } from "@/hooks/useApi";
import { useDebounce } from "@/hooks/useDebounce";
import Container from "@/components/ui/Container";

import { BlogFilters as FilterTypes } from "@/types/blog";
import BlogHero from "@/sections/blog/BlogHero";
import BlogFilters from "@/sections/blog/BlogFilters";
import BlogCard from "@/sections/blog/BlogCard";

export default function BlogPage() {
  const [filters, setFilters] = useState<FilterTypes>({});

  const debouncedFilters = useDebounce(filters, 500);
  const { data, isLoading, error } = useBlogs(debouncedFilters);

  const blogs = data?.data ?? [];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Unable to load blog posts
          </h2>
          <p className="text-foreground/60 mb-6">
            We&apos;re having trouble loading our blog. Please try again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <BlogHero />

      <section className="py-8">
        <Container>
          <BlogFilters filters={filters} onFiltersChange={setFilters} />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }, (_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-3xl overflow-hidden shadow-lg"
                >
                  <div className="h-48 bg-gray-200 animate-pulse" />
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 animate-pulse rounded mb-3" />
                    <div className="h-6 bg-gray-200 animate-pulse rounded mb-3" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">
                No articles found
              </h3>
              <p className="text-foreground/60">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog, index) => (
                <BlogCard key={blog.id} blog={blog} index={index} />
              ))}
            </div>
          )}
        </Container>
      </section>
    </div>
  );
}
