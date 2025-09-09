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
    <div className="flex flex-col items-center space-y-4">
      {/* Results Info */}
      <div className="text-sm text-foreground/60">
        Showing{" "}
        <span className="font-medium text-foreground">{showingFrom}</span> to{" "}
        <span className="font-medium text-foreground">{showingTo}</span> of{" "}
        <span className="font-medium text-foreground">{totalItems}</span>{" "}
        results
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
            currentPage === 1
              ? "bg-muted text-foreground/40 cursor-not-allowed"
              : "bg-card text-foreground hover:bg-primary hover:text-white border border-border"
          }`}
        >
          <HiChevronLeft className="w-4 h-4 mr-1" />
          Previous
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {getVisiblePages().map((page, index) =>
            page === "..." ? (
              <span
                key={`dots-${index}`}
                className="px-3 py-2 text-foreground/60"
              >
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
        >
          Next
          <HiChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
