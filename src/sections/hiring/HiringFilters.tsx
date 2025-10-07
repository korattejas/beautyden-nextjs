"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiMagnifyingGlass,
  HiMapPin,
  HiAcademicCap,
  HiXMark,
} from "react-icons/hi2";

import { HiringFilters as FilterTypes } from "@/types/hiring";
import { useCities } from "@/hooks/useHiring";
import CustomSelect, { SelectOption } from "@/components/ui/CustomSelect";

interface HiringFiltersProps {
  filters: FilterTypes;
  onFiltersChange: (filters: FilterTypes) => void;
}

const HiringFilters = ({ filters, onFiltersChange }: HiringFiltersProps) => {
  const { data: citiesData } = useCities();
  const cities = citiesData?.data ?? [];

  // City options for dropdown
  const cityOptions: SelectOption[] = [
    { value: "", label: "All Cities" },
    ...cities.map((city) => ({
      value: city.name,
      label: `${city.name}`,
    })),
  ];

  // Experience level options with symbols
  const experienceLevels: SelectOption[] = [
    { value: "", label: "All Experience Levels" },
    { value: "1", label: "🌱 Entry Level (0-1 years)" },
    { value: "2", label: "⭐ Mid Level (2-5 years)" },
    { value: "3", label: "👑 Senior Level (5+ years)" },
  ];

  const handleSearchChange = (value: string) => {
    onFiltersChange({ ...filters, search: value });
  };

  const handleCityChange = (value: string) => {
    onFiltersChange({ ...filters, city: value });
  };

  const handleExperienceChange = (value: string) => {
    onFiltersChange({ ...filters, experienceLevel: value });
  };

  const clearFilters = () => {
    onFiltersChange({ search: "", city: "", experienceLevel: "" });
  };

  const hasActiveFilters =
    filters.search || filters.city || filters.experienceLevel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-card backdrop-blur-md rounded-3xl p-6 shadow-lg border border-border mb-8"
    >
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary z-10" />
            <input
              type="text"
              placeholder="Search jobs, skills, or keywords..."
              value={filters.search || ""}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200"
            />
            {filters.search && (
              <button
                onClick={() => handleSearchChange("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 hover:text-primary transition-colors"
              >
                <HiXMark className="w-full h-full" />
              </button>
            )}
          </div>
        </div>

        {/* City Filter - Custom Dropdown */}
        {/* <div className="lg:w-64">
          <CustomSelect
            options={cityOptions}
            value={
              cityOptions.find((option) => option.value === filters.city) ||
              null
            }
            onChange={(value) => handleCityChange(value)}
            placeholder="All Cities"
            // icon={<HiMapPin className="w-5 h-5 text-primary" />}
          />
        </div> */}

        {/* Experience Level Filter - Custom Dropdown */}
        <div className="lg:w-90">
          <CustomSelect
            options={experienceLevels}
            value={filters.experienceLevel || ""}
            onChange={(value) => handleExperienceChange(value)}
            placeholder="All Experience Levels"
            // icon={<HiAcademicCap className="w-5 h-5 text-primary" />}
          />
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={clearFilters}
            className="lg:w-auto w-full px-4 py-3 bg-muted hover:bg-muted/80 text-foreground/70 rounded-full transition-all duration-200 flex items-center justify-center gap-2"
          >
            <HiXMark className="w-4 h-4" />
            Clear
          </motion.button>
        )}
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
          <span className="text-sm text-foreground/60 font-medium">
            Active filters:
          </span>

          {filters.search && (
            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              Search: &quot;{filters.search}&quot;
              <button onClick={() => handleSearchChange("")}>
                <HiXMark className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.city && (
            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              City: {filters.city}
              <button onClick={() => handleCityChange("")}>
                <HiXMark className="w-3 h-3" />
              </button>
            </span>
          )}

          {filters.experienceLevel && (
            <span className="inline-flex items-center gap-1 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
              {
                experienceLevels.find(
                  (l) => l.value === filters.experienceLevel
                )?.label
              }
              <button onClick={() => handleExperienceChange("")}>
                <HiXMark className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default HiringFilters;
