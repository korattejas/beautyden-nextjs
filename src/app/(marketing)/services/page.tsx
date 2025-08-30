"use client";

import { useState } from "react";
import { useServices } from "@/hooks/useApi";
import { useDebounce } from "@/hooks/useDebounce";

import Container from "@/components/ui/Container";
import ServiceHero from "@/sections/services/ServiceHero";
import ServiceFilter from "@/sections/services/ServiceFilter";
import ServiceGrid from "@/sections/services/ServiceGrid";

// Loading components
import ServiceGridSkeleton from "@/components/loading/ServiceGridSkeleton";
import ServiceFilterSkeleton from "@/components/loading/ServiceFilterSkeleton";

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState("9"); // Default to "All Services"
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce search to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch services with filters
  const { data, error, isLoading } = useServices({
    search: debouncedSearchQuery,
    category_id: activeCategory,
  });

  const services = data?.data ?? [];

  const clearAllFilters = () => {
    setActiveCategory("9");
    setSearchQuery("");
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-foreground/60 mb-6">
            We couldn&apos;t load the services. Please try again.
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
      <ServiceHero />

      <section className="pb-16">
        <Container>
          {isLoading ? (
            <ServiceFilterSkeleton />
          ) : (
            <ServiceFilter
              activeCategory={activeCategory}
              searchQuery={searchQuery}
              onCategoryChange={setActiveCategory}
              onSearchChange={setSearchQuery}
            />
          )}
        </Container>
      </section>

      {isLoading ? (
        <ServiceGridSkeleton />
      ) : (
        <>
          {services.length === 0 ? (
            <section className="pb-20">
              <Container>
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    No services found
                  </h3>
                  <p className="text-foreground/60 mb-6">
                    Try adjusting your search or category filters.
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
                  >
                    Clear All Filters
                  </button>
                </div>
              </Container>
            </section>
          ) : (
            <ServiceGrid services={services} />
          )}
        </>
      )}
    </div>
  );
}
