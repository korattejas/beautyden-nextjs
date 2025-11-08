"use client";

import { useState } from "react";
import { useReviews } from "@/hooks/useApi";
import { useDebounce } from "@/hooks/useDebounce";

import Container from "@/components/ui/Container";
import Pagination from "@/components/ui/Pagination";

import { ReviewsFilters } from "@/types/reviews";
import ReviewsHero from "@/sections/reviews/ReviewsHero";
import ReviewsFilter from "@/sections/reviews/ReviewsFilter";
import ReviewCardSkeleton from "@/sections/reviews/loading/ReviewCardSkeleton";
import ReviewList from "@/sections/reviews/ReviewList";

export default function ReviewsPageContent() {
  const [filters, setFilters] = useState<ReviewsFilters>({});
  const [currentPage, setCurrentPage] = useState(1);

  // Combine filters with pagination
  const combinedFilters = { ...filters, page: currentPage };

  // Debounce search to avoid too many API calls
  const debouncedFilters = useDebounce(combinedFilters, 500);

  const { data, error, isLoading } = useReviews(debouncedFilters);

  const reviews = data?.data?.data ?? [];
  const paginationData = data?.data;

  const handleFiltersChange = (newFilters: ReviewsFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearAllFilters = () => {
    setFilters({});
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Unable to load reviews
          </h2>
          <p className="text-foreground/60 mb-6">
            We&apos;re having trouble loading customer reviews. Please try
            again.
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
      <ReviewsHero />

      <section className="py-8">
        <Container>
          <ReviewsFilter
            filters={filters}
            onFiltersChange={handleFiltersChange}
          />
        </Container>
      </section>

      {isLoading ? (
        <section className="pb-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }, (_, index) => (
                <ReviewCardSkeleton key={index} index={index} />
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <>
          {reviews.length === 0 ? (
            <section className="pb-20">
              <Container>
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    No reviews found
                  </h3>
                  <p className="text-foreground/60 mb-6">
                    Try adjusting your filters to see more reviews.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300"
                  >
                    Clear All Filters
                  </button>
                </div>
              </Container>
            </section>
          ) : (
            <>
              <ReviewList reviews={reviews} />

              {/* Pagination Component */}
              {paginationData && paginationData?.last_page > 1 && (
                <section className="pb-20">
                  <Container>
                    <Pagination
                      currentPage={paginationData.current_page}
                      totalPages={paginationData.last_page}
                      onPageChange={handlePageChange}
                      totalItems={paginationData.total}
                      itemsPerPage={paginationData.per_page}
                      showingFrom={paginationData.from}
                      showingTo={paginationData.to}
                    />
                  </Container>
                </section>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}
