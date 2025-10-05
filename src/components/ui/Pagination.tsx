// src/components/ui/Pagination.tsx
"use client";

import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  showingFrom: number;
  showingTo: number;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showingFrom,
  showingTo,
}: PaginationProps) => {
  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      {/* Desktop/Tablet: Results Info */}
      <div className="hidden md:block text-sm text-foreground/60">
        Showing <span className="font-medium text-foreground">{showingFrom}</span> to <span className="font-medium text-foreground">{showingTo}</span> of <span className="font-medium text-foreground">{totalItems}</span> results
      </div>

      {/* Desktop/Tablet Pagination Controls */}
      <div className="hidden md:flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentPage === 1
              ? "bg-muted text-foreground/40 cursor-not-allowed"
              : "bg-card text-foreground hover:bg-primary hover:text-white border border-border"
          }`}
          aria-label="Previous page"
        >
          <HiChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex items-center gap-1">
          {getVisiblePages().map((page, index) =>
            page === "..." ? (
              <span key={`dots-${index}`} className="px-3 py-2 text-foreground/60">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  currentPage === page
                    ? "bg-primary text-white"
                    : "bg-card text-foreground hover:bg-primary/10 border border-border"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
                aria-label={`Go to page ${page}`}
              >
                {page}
              </button>
            )
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentPage === totalPages
              ? "bg-muted text-foreground/40 cursor-not-allowed"
              : "bg-card text-foreground hover:bg-primary hover:text-white border border-border"
          }`}
          aria-label="Next page"
        >
          Next
          <HiChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>

      {/* Mobile Pagination Controls */}
      <div className="md:hidden w-full">
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              currentPage === 1
                ? "bg-muted text-foreground/40 cursor-not-allowed"
                : "bg-card text-foreground hover:bg-primary hover:text-white border border-border"
            }`}
            aria-label="Previous page"
          >
            <HiChevronLeft className="w-5 h-5" />
          </button>

          <div className="text-sm text-foreground/70">
            <span className="font-medium text-foreground">{currentPage}</span> / {totalPages}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
              currentPage === totalPages
                ? "bg-muted text-foreground/40 cursor-not-allowed"
                : "bg-card text-foreground hover:bg-primary hover:text-white border border-border"
            }`}
            aria-label="Next page"
          >
            <HiChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-3 text-center text-xs text-foreground/60">
          {showingFrom}–{showingTo} of {totalItems}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
