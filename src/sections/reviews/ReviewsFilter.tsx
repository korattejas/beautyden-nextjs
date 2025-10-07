"use client";

import { motion } from "framer-motion";
import {
  HiMagnifyingGlass,
  HiXMark,
  HiPhoto,
  HiVideoCamera,
} from "react-icons/hi2";
import CustomSelect, { SelectOption } from "@/components/ui/CustomSelect";
import { useServices, useServiceCategories } from "@/hooks/useApi";
import { ReviewsFilters } from "@/types/reviews";

interface ReviewsFilterProps {
  filters: ReviewsFilters;
  onFiltersChange: (filters: ReviewsFilters) => void;
}

const ReviewsFilter = ({ filters, onFiltersChange }: ReviewsFilterProps) => {
  const { data: categoriesData } = useServiceCategories();
  const categories = categoriesData?.data ?? [];

  // Rating options with star icons
  const ratingOptions: SelectOption[] = [
    { value: "5", label: "5 Stars Only" },
    { value: "4", label: "4+ Stars" },
    { value: "3", label: "3+ Stars" },
    { value: "2", label: "2+ Stars" },
    { value: "1", label: "1+ Stars" },
  ];

  // Category options
  const categoryOptions: SelectOption[] = [
    ...categories.map((category: any) => ({
      value: category.id.toString(),
      label: category.name,
    })),
  ];

  const handleFilterChange = (key: keyof ReviewsFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const clearFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.values(filters).some((value) => value);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card backdrop-blur-md rounded-3xl p-6 shadow-lg border border-border mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-3">
          <div className="relative group">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search reviews by customer name or content..."
              value={filters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-foreground/40"
            />
            {filters.search && (
              <button
                onClick={() => handleFilterChange("search", "")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 hover:text-primary transition-colors"
              >
                <HiXMark className="w-full h-full" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <CustomSelect
            options={categoryOptions}
            value={filters.category_id || ""}
            onChange={(value) => handleFilterChange("category_id", value)}
            placeholder="All Categories"
          />
        </div>

        {/* Rating Filter */}
        <div>
          <CustomSelect
            options={ratingOptions}
            value={filters.rating || ""}
            onChange={(value) => handleFilterChange("rating", value)}
            placeholder="All Ratings"
          />
        </div>

        {/* Media Filters */}
        {/* <div className="flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              handleFilterChange(
                "with_photos",
                filters.with_photos === "1" ? "" : "1"
              )
            }
            className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-200 font-medium ${
              filters.with_photos === "1"
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "bg-background text-foreground/70 hover:bg-primary/5 border border-border"
            }`}
          >
            <HiPhoto className="w-4 h-4" />
            <span className="hidden sm:inline">Photos</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              handleFilterChange(
                "with_video",
                filters.with_video === "1" ? "" : "1"
              )
            }
            className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-200 font-medium ${
              filters.with_video === "1"
                ? "bg-primary text-white shadow-md shadow-primary/25"
                : "bg-background text-foreground/70 hover:bg-primary/5 border border-border"
            }`}
          >
            <HiVideoCamera className="w-4 h-4" />
            <span className="hidden sm:inline">Videos</span>
          </motion.button>
        </div> */}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border"
        >
          <div className="flex items-center gap-2 text-sm text-foreground/60 font-medium">
            Active filters:
          </div>

          {filters.search && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
            >
              <HiMagnifyingGlass className="w-3 h-3" />
              &quot;{filters.search}&quot;
              <button
                onClick={() => handleFilterChange("search", "")}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <HiXMark className="w-3 h-3" />
              </button>
            </motion.span>
          )}

          {filters.category_id && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-sm font-medium"
            >
              Category:{" "}
              {categoryOptions.find((c) => c.value === filters.category_id)?.label}
              <button
                onClick={() => handleFilterChange("category_id", "")}
                className="hover:bg-secondary/20 rounded-full p-0.5 transition-colors"
              >
                <HiXMark className="w-3 h-3" />
              </button>
            </motion.span>
          )}

          {filters.rating && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-warning/10 text-warning px-3 py-1.5 rounded-full text-sm font-medium"
            >
              {Array.from(
                { length: parseInt(filters.rating) },
                () => "⭐"
              ).join("")}{" "}
              {filters.rating}+ Stars
              <button
                onClick={() => handleFilterChange("rating", "")}
                className="hover:bg-warning/20 rounded-full p-0.5 transition-colors"
              >
                <HiXMark className="w-3 h-3" />
              </button>
            </motion.span>
          )}

          {/* {filters.with_photos === "1" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium"
            >
              <HiPhoto className="w-3 h-3" />
              With Photos
              <button
                onClick={() => handleFilterChange("with_photos", "")}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <HiXMark className="w-3 h-3" />
              </button>
            </motion.span>
          )}

          {filters.with_video === "1" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-sm font-medium"
            >
              <HiVideoCamera className="w-3 h-3" />
              With Videos
              <button
                onClick={() => handleFilterChange("with_video", "")}
                className="hover:bg-secondary/20 rounded-full p-0.5 transition-colors"
              >
                <HiXMark className="w-3 h-3" />
              </button>
            </motion.span>
          )} */}

          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={clearFilters}
            className="text-sm text-foreground/60 hover:text-primary transition-colors font-medium underline decoration-dotted underline-offset-2"
          >
            Clear All Filters
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ReviewsFilter;
