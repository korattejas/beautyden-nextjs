"use client";

import { useState, useEffect } from "react";

import Container from "@/components/ui/Container";

import { HiringFilters as FilterTypes } from "@/types/hiring";
import { useHiring } from "@/hooks/useHiring";
import HiringHero from "@/sections/hiring/HiringHero";
import HiringFilters from "@/sections/hiring/HiringFilters";
import HiringCardSkeleton from "@/sections/hiring/loading/HiringCardSkeleton";
import HiringList from "@/sections/hiring/HiringList";
import { useDebounce } from "@/hooks/useDebounce";

export default function HiringPage() {
  const [filters, setFilters] = useState<FilterTypes>({
    search: "",
    city: "",
    experienceLevel: "",
  });

  // Debounce search to avoid too many API calls
  const debouncedFilters = useDebounce(filters, 500);

  const { data, error, isLoading } = useHiring(debouncedFilters);

  const jobs = data?.data ?? [];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💼</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Unable to load job listings
          </h2>
          <p className="text-foreground/60 mb-6">
            We&apos;re having trouble loading our current openings. Please try
            again.
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
      <HiringHero />

      <section className="py-8">
        <Container>
          <HiringFilters filters={filters} onFiltersChange={setFilters} />
        </Container>
      </section>

      {isLoading ? (
        <section className="pb-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }, (_, index) => (
                <HiringCardSkeleton key={index} index={index} />
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <>
          {jobs.length === 0 ? (
            <section className="pb-20">
              <Container>
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    No jobs match your criteria
                  </h3>
                  <p className="text-foreground/60 mb-6">
                    Try adjusting your filters or check back later for new
                    opportunities.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({ search: "", city: "", experienceLevel: "" })
                    }
                    className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Clear All Filters
                  </button>
                </div>
              </Container>
            </section>
          ) : (
            <HiringList jobs={jobs} />
          )}
        </>
      )}
    </div>
  );
}
