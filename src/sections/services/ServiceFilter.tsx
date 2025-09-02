"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useServiceCategories } from "@/hooks/useApi";
import { HiMagnifyingGlass, HiXMark, HiSparkles } from "react-icons/hi2";

interface ServiceFilterProps {
  activeCategory: string;
  searchQuery: string;
  onCategoryChange: (categoryId: string) => void;
  onSearchChange: (search: string) => void;
}

const ServiceFilter = ({
  activeCategory,
  searchQuery,
  onCategoryChange,
  onSearchChange,
}: ServiceFilterProps) => {
  const { data: categoriesData, isLoading, error } = useServiceCategories();

  // Show loading skeleton if data is loading
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-8 mb-12"
      >
        {/* Search Skeleton */}
        <div className="max-w-md mx-auto">
          <div className="h-14 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-full" />
        </div>

        {/* Category Buttons Skeleton */}
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-16 w-36 bg-gradient-to-r from-gray-200 to-gray-300 animate-pulse rounded-2xl"
            />
          ))}
        </div>
      </motion.div>
    );
  }

  // Show error message if API call failed
  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center py-8 mb-12"
      >
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 max-w-md mx-auto">
          <div className="text-red-600 mb-2">⚠️</div>
          <p className="text-red-700 font-medium">Unable to load categories</p>
          <p className="text-red-600 text-sm mt-1">Please try again later</p>
        </div>
      </motion.div>
    );
  }

  const categories = categoriesData?.data || [];
  const hasActiveFilters = searchQuery || activeCategory !== "9";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="space-y-8 mb-12"
    >
      {/* Search Bar */}
      <div className="max-w-lg mx-auto">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />
          <div className="relative bg-white/90 backdrop-blur-md rounded-full border border-primary/20 shadow-lg group-focus-within:border-primary/40 transition-all duration-300">
            <HiMagnifyingGlass className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary/70 z-10" />
            <input
              type="text"
              placeholder="Search services, treatments, or keywords..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-14 pr-14 py-4 bg-transparent border-none rounded-full focus:outline-none text-foreground placeholder:text-foreground/60 font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-5 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-foreground/10 hover:bg-foreground/20 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <HiXMark className="w-4 h-4 text-foreground/70" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 px-4">
        {categories.map((category, index) => {
          const categoryId = category.id.toString();
          const isActive = activeCategory === categoryId;

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryChange(categoryId)}
              className={`group relative overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-br from-primary via-primary to-secondary text-white border-primary/30 shadow-lg shadow-primary/25"
                  : "bg-white/80 backdrop-blur-md text-foreground/80 border-primary/20 hover:border-primary/40 hover:bg-white/90 shadow-md hover:shadow-lg"
              }`}
              title={category.description}
            >
              {/* Background Gradient Effect */}
              {!isActive && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}

              {/* Content */}
              <div className="relative flex flex-col items-center gap-3 px-6 py-4">
                {/* Icon */}
                <div
                  className={`relative overflow-hidden rounded-xl shadow-sm ${
                    isActive
                      ? "bg-white/20 shadow-white/25"
                      : "bg-primary/10 group-hover:bg-primary/15 shadow-primary/10"
                  } transition-all duration-300`}
                >
                  {category.icon ? (
                    <div className="w-14 h-14 p-2">
                      <Image
                        src={category.icon}
                        alt={`${category.name} icon`}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover rounded-lg"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="w-14 h-14 flex items-center justify-center">
                      <HiSparkles
                        className={`w-8 h-8 ${
                          isActive ? "text-white" : "text-primary"
                        }`}
                      />
                    </div>
                  )}
                </div>

                {/* Text */}
                <span
                  className={`font-semibold text-sm text-center leading-tight max-w-full ${
                    isActive
                      ? "text-white"
                      : "text-foreground group-hover:text-primary"
                  } transition-colors duration-300`}
                >
                  {category.name}
                </span>
              </div>

              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl"
                  transition={{ type: "spring", duration: 0.6 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium shadow-sm"
            >
              <HiMagnifyingGlass className="w-4 h-4" />
              <span>&quot;{searchQuery}&quot;</span>
              <button
                onClick={() => onSearchChange("")}
                className="w-5 h-5 bg-primary/20 hover:bg-primary/30 rounded-full flex items-center justify-center transition-colors duration-200"
              >
                <HiXMark className="w-3 h-3" />
              </button>
            </motion.div>
          )}

          {activeCategory !== "9" && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-secondary/15 to-primary/15 border border-secondary/30 text-secondary-800 px-5 py-3 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200"
            >
              {/* Larger Image Container */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white/50 shadow-sm">
                {categories.find((c) => c.id.toString() === activeCategory)
                  ?.icon ? (
                  <Image
                    src={
                      categories.find((c) => c.id.toString() === activeCategory)
                        ?.icon || ""
                    }
                    alt="Category"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center">
                    <HiSparkles className="w-5 h-5 text-secondary" />
                  </div>
                )}
              </div>

              {/* Category Name */}
              <span className="text-base font-semibold text-secondary-900">
                {
                  categories.find((c) => c.id.toString() === activeCategory)
                    ?.name
                }
              </span>

              {/* Close Button */}
              <button
                onClick={() => onCategoryChange("9")}
                className="w-7 h-7 bg-secondary/20 hover:bg-secondary/30 rounded-full flex items-center justify-center transition-colors duration-200 ml-1"
                aria-label="Clear selected category"
              >
                <HiXMark className="w-4 h-4 text-secondary-700" />
              </button>
            </motion.div>
          )}

          {/* Clear All Filters */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => {
              onSearchChange("");
              onCategoryChange("9");
            }}
            className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 shadow-sm"
          >
            <HiXMark className="w-4 h-4" />
            Clear All
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ServiceFilter;
