"use client";

import { motion } from "framer-motion";
import { useServiceCategories } from "@/hooks/useApi";
import { HiMagnifyingGlass, HiXMark } from "react-icons/hi2";
import {
  HiSparkles,
  HiOutlineScissors,
  HiOutlineHeart,
  HiOutlineStar,
} from "react-icons/hi2";

interface ServiceFilterProps {
  activeCategory: string;
  searchQuery: string;
  onCategoryChange: (categoryId: string) => void;
  onSearchChange: (search: string) => void;
}

// Default icons mapping for categories
const getCategoryIcon = (categoryName: string) => {
  const iconMap: {
    [key: string]: React.ComponentType<{ className?: string }>;
  } = {
    "all services": HiSparkles,
    "hair services": HiOutlineScissors,
    "face & skin": HiSparkles,
    "nail care": HiOutlineHeart,
    makeup: HiOutlineStar,
    wellness: HiOutlineStar,
  };

  const key = categoryName.toLowerCase();
  return iconMap[key] || HiSparkles;
};

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
        className="space-y-6 mb-12"
      >
        {/* Search Skeleton */}
        <div className="h-12 bg-gray-200 animate-pulse rounded-full max-w-md mx-auto" />

        {/* Category Buttons Skeleton */}
        <div className="flex flex-wrap justify-center gap-4">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-12 w-32 bg-gray-200 animate-pulse rounded-full"
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
        className="text-center text-red-500 mb-12"
      >
        <p>Unable to load categories. Please try again.</p>
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
      className="space-y-6 mb-12"
    >
      {/* Search Bar */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary z-10" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-12 py-3 bg-white/80 backdrop-blur-md border border-primary/20 rounded-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-foreground/40 hover:text-foreground transition-colors"
            >
              <HiXMark className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((category, index) => {
          const IconComponent = getCategoryIcon(category.name);
          const categoryId = category.id.toString();

          return (
            <motion.button
              key={category.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              onClick={() => onCategoryChange(categoryId)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === categoryId
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                  : "bg-white/80 backdrop-blur-md text-foreground/70 hover:text-primary hover:bg-primary/5 border border-primary/10"
              }`}
              title={category.description}
            >
              <IconComponent className="w-4 h-4" />
              {category.name}
            </motion.button>
          );
        })}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-center gap-2"
        >
          {searchQuery && (
            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              Search: &quot;{searchQuery}&quot;
              <button onClick={() => onSearchChange("")}>
                <HiXMark className="w-3 h-3" />
              </button>
            </span>
          )}
          {activeCategory !== "9" && (
            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              Category:{" "}
              {categories.find((c) => c.id.toString() === activeCategory)?.name}
              <button onClick={() => onCategoryChange("9")}>
                <HiXMark className="w-3 h-3" />
              </button>
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default ServiceFilter;
