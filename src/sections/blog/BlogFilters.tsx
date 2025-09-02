"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { HiMagnifyingGlass, HiXMark, HiSparkles } from "react-icons/hi2";
import { useBlogCategories } from "@/hooks/useApi";
import { BlogFilters as FilterTypes } from "@/types/blog";

interface BlogFiltersProps {
  filters: FilterTypes;
  onFiltersChange: (filters: FilterTypes) => void;
}

const BlogFilters = ({ filters, onFiltersChange }: BlogFiltersProps) => {
  const { data: categoriesData, isLoading } = useBlogCategories();

  const categories = categoriesData?.data ?? [];

  const handleFilterChange = (key: keyof FilterTypes, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6 mb-12">
        <div className="h-12 bg-gray-200 animate-pulse rounded-full max-w-md mx-auto" />
        <div className="flex justify-center gap-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div
              key={i}
              className="h-10 w-24 bg-gray-200 animate-pulse rounded-full"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col gap-6 mb-12"
    >
      {/* Search Bar */}
      <div className="max-w-md mx-auto w-full">
        <div className="relative">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
          <input
            type="text"
            placeholder="Search articles..."
            value={filters.search || ""}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-white/80 backdrop-blur-md border border-primary/20 rounded-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
          {filters.search && (
            <button
              onClick={() => handleFilterChange("search", "")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3">
        <button
          onClick={() => handleFilterChange("category_id", "")}
          className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
            !filters.category_id
              ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
              : "bg-white/80 backdrop-blur-md text-foreground/70 hover:text-primary hover:bg-primary/5 border border-primary/10"
          }`}
        >
          <HiSparkles className="w-4 h-4" />
          All Categories
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() =>
              handleFilterChange("category_id", category.id.toString())
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              filters.category_id === category.id.toString()
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                : "bg-white/80 backdrop-blur-md text-foreground/70 hover:text-primary hover:bg-primary/5 border border-primary/10"
            }`}
          >
            {category.icon && (
              <div className="w-4 h-4 rounded-full overflow-hidden">
                <Image
                  src={category.icon}
                  alt={category.name}
                  width={16}
                  height={16}
                  className="object-cover w-full h-full"
                  unoptimized
                />
              </div>
            )}
            {category.name}
          </button>
        ))}
      </div>

      {/* Active Filters */}
      {(filters.search || filters.category_id) && (
        <div className="flex justify-center">
          <button
            onClick={() => onFiltersChange({})}
            className="text-sm text-foreground/60 hover:text-primary transition-colors"
          >
            Clear all filters
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default BlogFilters;
