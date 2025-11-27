"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useServiceCategories } from "@/hooks/useApi";
import { HiMagnifyingGlass, HiXMark, HiSparkles } from "react-icons/hi2";

interface ServiceFilterProps {
  activeCategory: string;
  activeSubCategory:string | null;
  searchQuery: string;
  onCategoryChange: (categoryId: string,subIds?:string[]) => void;
  onSearchChange: (search: string) => void;
  onSubCategoryChange:(categoryId: string) => void;
}

const ServiceFilter = ({
  activeCategory,
  activeSubCategory,
  searchQuery,
  onCategoryChange,
  onSubCategoryChange,
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
        className="bg-card backdrop-blur-md rounded-3xl p-6 shadow-lg border border-border mb-8"
      >
        {/* Search Skeleton */}
        <div className="mb-6">
          <div className="h-12 bg-muted animate-pulse rounded-full" />
        </div>

        {/* Category Buttons Skeleton */}
        <div className="flex flex-wrap gap-3">
          {Array.from({ length: 6 }, (_, index) => (
            <div
              key={index}
              className="h-12 w-28 bg-muted animate-pulse rounded-full"
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
        className="bg-card rounded-3xl p-6 shadow-lg border border-border mb-8"
      >
        <div className="text-center">
          <div className="text-4xl mb-2">⚠️</div>
          <p className="text-foreground font-medium">
            Unable to load categories
          </p>
          <p className="text-foreground/60 text-sm mt-1">
            Please try again later
          </p>
        </div>
      </motion.div>
    );
  }

  const categories = categoriesData?.data || [];
  const hasActiveFilters = searchQuery || activeCategory !== "9";

  const clearAllFilters = () => {
    onSearchChange("");
    onCategoryChange("9");
  };

  const renderActiveFilters = () => {
    if (!hasActiveFilters) return null;
    return (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border"
      >
        <div className="text-sm text-foreground/60 font-medium">
          Active filters:
        </div>

        {searchQuery && (
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
            <HiMagnifyingGlass className="w-3 h-3" />
            &quot;{searchQuery}&quot;
            <button onClick={() => onSearchChange("")}>
              <HiXMark className="w-3 h-3" />
            </button>
          </span>
        )}

        {activeCategory !== "9" && (
          <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-sm font-medium">
            {
              categories.find((c) => c.id.toString() === activeCategory)?.name
            }
            <button
              onClick={() => onCategoryChange("9")}
              className="hover:bg-secondary/20 rounded-full p-0.5 transition-colors"
            >
              <HiXMark className="w-3 h-3" />
            </button>
          </span>
        )}

        <button
          onClick={clearAllFilters}
          className="text-sm text-foreground/60 hover:text-primary transition-colors font-medium underline decoration-dotted underline-offset-2"
        >
          Clear All Filters
        </button>
      </motion.div>
    );
  };
  const selectedCategory = categories.find(
    (c) => c.id.toString() === activeCategory
  );
  const subCategories = selectedCategory?.subcategories || [];
  return (
    <>
      <div className="lg:hidden bg-card backdrop-blur-md rounded-3xl p-4 border border-border mb-8 shadow-lg space-y-4 overflow-x-hidden">
        <div className="relative">
          <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10" />
          <input
            type="text"
            placeholder="Search services, treatments, or keywords..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-foreground/40"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 hover:text-primary transition-colors"
            >
              <HiXMark className="w-full h-full" />
            </button>
          )}
        </div>
        <div className="overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            <button
              onClick={() => onCategoryChange("9")}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                activeCategory === "9"
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              All
            </button>
            {categories.map((category) => {
              const subIds =
                category.subcategories?.map((i: any) => i?.id) || [];
              return (
                <button
                  key={`mobile-cat-${category.id}`}
                  onClick={() =>
                    onCategoryChange(category.id.toString(), subIds)
                  }
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeCategory === category.id.toString()
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
        {subCategories.length > 0 && (
          <div className="overflow-x-auto -mx-4 px-4 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => onSubCategoryChange("")}
                className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                  !activeSubCategory
                    ? "bg-gray-900 text-white border-gray-900"
                    : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                }`}
              >
                All
              </button>
              {subCategories.map((sub: any) => {
                const subId = sub.id.toString();
                const isActive = activeSubCategory === subId;
                return (
                  <button
                    key={`mobile-sub-${sub.id}`}
                    onClick={() => onSubCategoryChange(subId)}
                    className={`px-3 py-2 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                      isActive
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    {sub.name}
                  </button>
                );
              })}
            </div>
          </div>
        )}
        {renderActiveFilters()}
      </div>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="hidden lg:block bg-card backdrop-blur-md rounded-3xl p-6 shadow-lg border border-border mb-8 overflow-x-hidden"
    >
      {/* <div className="grid grid-cols-1 lg:grid-cols-4 gap-6"> */}
      <div className="flex flex-col gap-6">
        {/* Search Bar */}
        <div className="lg:col-span-2">
          <div className="relative group">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10 group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              placeholder="Search services, treatments, or keywords..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-foreground/40"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 hover:text-primary transition-colors"
                style={{ cursor: "pointer" }}
              >
                <HiXMark className="w-full h-full" />
              </button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        <div className="lg:col-span-2">
          <div className="flex flex-wrap gap-2 px-2 pb-1 sm:px-0">
            {categories.map((category, index) => {
              const categoryId = category.id.toString();
              const isActive = activeCategory === categoryId;

              return (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    const cat =  categories.find(
                      (c) => c.id.toString() === categoryId
                    );
                    const subIds= cat?.subcategories?.map((i: any)=> i?.id) || [];
                    onCategoryChange(categoryId, subIds);
                  }}
                  className={`shrink-0 flex items-center gap-3 px-6 py-4 rounded-full text-base font-medium transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25 border border-primary/20"
                      : "bg-background hover:bg-primary/10 text-foreground/80 hover:text-primary border border-border hover:shadow"
                  }`}
                >
                  {/* Category Icon */}
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                    {category.icon ? (
                      <Image
                        src={category.icon}
                        alt={`${category.name} icon`}
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <HiSparkles
                        className={`w-5 h-5 ${isActive ? "text-white" : "text-primary"}`}
                      />
                    )}
                  </div>

                  <span className="whitespace-nowrap">{category.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
      {selectedCategory?.subcategories?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold text-foreground/80">Subcategories</div>
          </div>
          <div className="flex flex-wrap gap-2 px-2 pb-1 sm:px-0">
            {selectedCategory && selectedCategory.subcategories.map((sub: any, index: any) => {
              const subId = sub.id.toString();
              const isActive = activeSubCategory == subId;
              return (
                <motion.button
                  key={sub.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSubCategoryChange(subId);
                  }}
                  className={`shrink-0 flex items-center gap-3 px-6 py-4 rounded-full text-base font-medium transition-all duration-200 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25 border border-primary/20"
                      : "bg-background hover:bg-primary/10 text-foreground/80 hover:text-primary border border-border hover:shadow"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                    {sub.icon ? (
                      <Image
                        src={sub.icon}
                        alt={`${sub.name} icon`}
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <HiSparkles
                        className={`w-5 h-5 ${isActive ? "text-white" : "text-primary"}`}
                      />
                    )}
                  </div>
                  <span className="whitespace-nowrap"> {sub.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
      {renderActiveFilters()}
      </motion.div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default ServiceFilter;
