"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useServices } from "@/hooks/useApi";
import { useCityContext } from "@/contexts/CityContext";
import { useDebounce } from "@/hooks/useDebounce";

import Container from "@/components/ui/Container";
import ServiceHero from "@/sections/services/ServiceHero";
import ServiceFilter from "@/sections/services/ServiceFilter";
import ServiceGrid from "@/sections/services/ServiceGrid";
import Pagination from "@/components/ui/Pagination";

// Loading components
import ServiceGridSkeleton from "@/components/loading/ServiceGridSkeleton";
import ServiceFilterSkeleton from "@/components/loading/ServiceFilterSkeleton";

// Separate component for the main content that uses searchParams
function ServicesContent() {
  const { selectedCity, setShowCityPopup } = useCityContext();
  const searchParams = useSearchParams();

  // Initialize state with URL parameters
  const [activeCategory, setActiveCategory] = useState("9"); // Default to "All Services"
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Set initial category and subcategory from URL parameters
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const subcategoryParam = searchParams.get("subcategory");
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
    if (subcategoryParam) {
      setActiveSubCategory(subcategoryParam);
    }
  }, [searchParams]);

  // Debounce search to avoid too many API calls
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  // Fetch services with filters (will include city in hook via context)
  const { data, error, isLoading } = useServices({
    search: debouncedSearchQuery,
    category_id: activeCategory,
    subcategory_id: activeSubCategory,
    page: currentPage,
  });

  const services = data?.data?.data ?? ([] as any[]);
  const paginationData = data?.data as any;

  const clearAllFilters = () => {
    setActiveCategory("9");
    setActiveSubCategory(null);
    setSearchQuery("");
    setCurrentPage(1);
    // Update URL to remove all filters
    const url = new URL(window.location.href);
    url.searchParams.delete("category");
    url.searchParams.delete("subcategory");
    window.history.pushState({}, "", url.toString());
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to top when changing pages
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (categoryId: string, subcategories: string[] | any) => {
    setActiveCategory(categoryId);
    // Reset subcategory when changing category
    setActiveSubCategory(null);
    // Update URL: set category to the new one (or remove when "All Services"), and drop subcategory
    const url = new URL(window.location.href);
    if (categoryId === "9") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", categoryId);
    }
    url.searchParams.delete("subcategory");
    window.history.pushState({}, "", url.toString());
    setCurrentPage(1); // Reset to first page when changing category
  };

  const handleSubCategoryChange = (subCategoryId: string | null) => {
    // Only update subcategory, don't touch category
    setActiveSubCategory(subCategoryId);
    setCurrentPage(1); // Reset to first page when changing subcategory
    // Update URL to include subcategory - preserve existing category
    const url = new URL(window.location.href);
    if (subCategoryId) {
      url.searchParams.set("subcategory", subCategoryId);
      // Ensure category is preserved in URL
      if (activeCategory && activeCategory !== "9") {
        url.searchParams.set("category", activeCategory);
      }
    } else {
      url.searchParams.delete("subcategory");
    }
    window.history.pushState({}, "", url.toString());
  };

  const handleSearchChange = (search: string) => {
    setSearchQuery(search);
    setCurrentPage(1); // Reset to first page when searching
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
            className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // If no city selected, show select-city callout and stop here
  if (!selectedCity) {
    return (
      <div className="min-h-screen bg-background">
        <ServiceHero />
        <section className="pt-0 pb-16">
          <Container>
            <div className="max-w-3xl mx-auto text-center bg-white/80 backdrop-blur-md border border-primary/10 rounded-2xl p-8 shadow-sm">
              <div className="text-4xl mb-4">📍</div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Select your city to view services
              </h2>
              <p className="text-foreground/60 mb-6">
                We personalize available services based on your location.
              </p>
              <button
                onClick={() => setShowCityPopup(true)}
                className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300"
              >
                Select City
              </button>
            </div>
          </Container>
        </section>
      </div>
    );
  }

  const isInitialLoading = !data && isLoading;

  return (
    <div className="min-h-screen bg-background">
      <ServiceHero />

      <section className="pb-12 md:pb-16">
        <Container>
          {isInitialLoading ? (
            <ServiceFilterSkeleton />
          ) : (
            <ServiceFilter
              activeCategory={activeCategory}
              activeSubCategory={activeSubCategory}
              searchQuery={searchQuery}
              onCategoryChange={handleCategoryChange}
              onSubCategoryChange={handleSubCategoryChange}
              onSearchChange={handleSearchChange}
            />
          )}
        </Container>
      </section>

      {isInitialLoading ? (
        <ServiceGridSkeleton />
      ) : (
        <>
          {services.length === 0 ? (
            <section className="pb-16 md:pb-20">
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
                    className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300"
                  >
                    Clear All Filters
                  </button>
                </div>
              </Container>
            </section>
          ) : (
            <>
              <ServiceGrid services={services} />

              {/* Pagination Component */}
              {paginationData && paginationData.last_page > 1 && (
                <section className="pb-16 md:pb-20">
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

// Export the main content component
export default function ServicesPageContent() {
  return <ServicesContent />;
}
