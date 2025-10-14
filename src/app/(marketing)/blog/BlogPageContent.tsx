"use client";

import { useState } from "react";
import { useBlogs } from "@/hooks/useApi";
import { useDebounce } from "@/hooks/useDebounce";
import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";

import { BlogFilters as FilterTypes } from "@/types/blog";
import BlogHero from "@/sections/blog/BlogHero";
import BlogFilters from "@/sections/blog/BlogFilters";
import BlogCard from "@/sections/blog/BlogCard";

export default function BlogPageContent() {
  const [filters, setFilters] = useState<FilterTypes>({
    page: 1,
    per_page: 10,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Combine filters with pagination
  const combinedFilters = { ...filters, page: currentPage };
  const debouncedFilters = useDebounce(combinedFilters, 500);
  const { data, isLoading, error } = useBlogs(debouncedFilters);

  // Fix: Access nested data structure correctly
  const blogs = data?.data?.data ?? [];
  const paginationData = data?.data;

  const handleFiltersChange = (newFilters: FilterTypes) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAllFilters = () => {
    setFilters({ page: 1, per_page: 9 });
    setCurrentPage(1);
  };

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
            className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogHero />

      <section className="py-8">
        <Container>
          <BlogFilters
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </Container>
      </section>

      <section className="pb-20">
        <Container>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 9 }, (_, index) => (
                <div
                  key={index}
                  className="bg-card rounded-3xl overflow-hidden shadow-lg"
                >
                  <div className="h-48 bg-muted animate-pulse" />
                  <div className="p-6">
                    <div className="h-4 bg-muted animate-pulse rounded mb-3" />
                    <div className="h-6 bg-muted animate-pulse rounded mb-3" />
                    <div className="h-4 bg-muted animate-pulse rounded w-3/4" />
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
              <p className="text-foreground/60 mb-6">
                Try adjusting your search or filters.
              </p>
              <button
                onClick={clearAllFilters}
                className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog, index) => (
                  <BlogCard key={blog.id} blog={blog} index={index} />
                ))}
              </div>

              {/* Pagination Component */}
              {paginationData && paginationData.last_page > 1 && (
                <section className="mt-12">
                  <Pagination
                    currentPage={paginationData.current_page}
                    totalPages={paginationData.last_page}
                    onPageChange={handlePageChange}
                    totalItems={paginationData.total}
                    itemsPerPage={paginationData.per_page}
                    showingFrom={paginationData.from}
                    showingTo={paginationData.to}
                  />
                </section>
              )}
            </>
          )}
        </Container>
      </section>
    </div>
  );
}
