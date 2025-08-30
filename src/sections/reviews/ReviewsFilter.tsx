"use client";

import { motion } from "framer-motion";
import {
  HiMagnifyingGlass,
  HiXMark,
  HiPhoto,
  HiVideoCamera,
} from "react-icons/hi2";
import { useServices } from "@/hooks/useApi";
import { ReviewsFilters } from "@/types/reviews";

interface ReviewsFilterProps {
  filters: ReviewsFilters;
  onFiltersChange: (filters: ReviewsFilters) => void;
}

const ReviewsFilter = ({ filters, onFiltersChange }: ReviewsFilterProps) => {
  const { data: servicesData } = useServices();
  const services = servicesData?.data ?? [];

  const ratings = [
    { value: "", label: "All Ratings" },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4+ Stars" },
    { value: "3", label: "3+ Stars" },
    { value: "2", label: "2+ Stars" },
    { value: "1", label: "1+ Stars" },
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
      className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-primary/10 mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Search Input */}
        <div className="lg:col-span-2">
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={filters.search || ""}
              onChange={(e) => handleFilterChange("search", e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border border-primary/20 rounded-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
          </div>
        </div>

        {/* Service Filter */}
        <div>
          <select
            value={filters.service_id || ""}
            onChange={(e) => handleFilterChange("service_id", e.target.value)}
            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-primary/20 rounded-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer"
          >
            <option value="">All Services</option>
            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <select
            value={filters.rating || ""}
            onChange={(e) => handleFilterChange("rating", e.target.value)}
            className="w-full px-4 py-3 bg-white/60 backdrop-blur-sm border border-primary/20 rounded-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer"
          >
            {ratings.map((rating) => (
              <option key={rating.value} value={rating.value}>
                {rating.label}
              </option>
            ))}
          </select>
        </div>

        {/* Media Filters */}
        <div className="flex gap-2">
          <button
            onClick={() =>
              handleFilterChange(
                "with_photos",
                filters.with_photos === "1" ? "" : "1"
              )
            }
            className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-200 ${
              filters.with_photos === "1"
                ? "bg-primary text-white"
                : "bg-white/60 text-foreground/70 hover:bg-primary/5"
            }`}
          >
            <HiPhoto className="w-4 h-4" />
            Photos
          </button>
          <button
            onClick={() =>
              handleFilterChange(
                "with_video",
                filters.with_video === "1" ? "" : "1"
              )
            }
            className={`flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-200 ${
              filters.with_video === "1"
                ? "bg-primary text-white"
                : "bg-white/60 text-foreground/70 hover:bg-primary/5"
            }`}
          >
            <HiVideoCamera className="w-4 h-4" />
            Videos
          </button>
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-primary/10">
          {Object.entries(filters).map(([key, value]) => {
            if (!value) return null;
            return (
              <span
                key={key}
                className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {key}: {value}
                <button
                  onClick={() =>
                    handleFilterChange(key as keyof ReviewsFilters, "")
                  }
                >
                  <HiXMark className="w-3 h-3" />
                </button>
              </span>
            );
          })}
          <button
            onClick={clearFilters}
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            Clear All
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default ReviewsFilter;
