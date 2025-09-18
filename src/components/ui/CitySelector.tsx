"use client";

import React from "react";
import { HiMapPin, HiChevronDown } from "react-icons/hi2";
import { useCity } from "@/hooks/useCity";

interface CitySelectorProps {
  className?: string;
  variant?: "default" | "compact";
}

const CitySelector: React.FC<CitySelectorProps> = ({
  className = "",
  variant = "default",
}) => {
  const { selectedCity, reopenCityPopup } = useCity();

  const handleClick = () => {
    reopenCityPopup();
  };

  if (variant === "compact") {
    return (
      <button
        onClick={handleClick}
        className={`inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary transition-colors `}
      >
        <HiMapPin className="w-4 h-4" />
        <span className="hidden sm:inline">
          {selectedCity ? selectedCity.name : "Select City"}
        </span>
        <HiChevronDown className="w-3 h-3" />
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center gap-3 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-full hover:border-primary/50 hover:bg-gray-50 transition-all duration-200 `}
    >
      <div className="p-1 bg-primary/10 rounded-full">
        <HiMapPin className="w-4 h-4 text-primary" />
      </div>
      <div className="text-left">
        <div className="text-sm font-semibold text-gray-900">
          {selectedCity ? selectedCity.name : "Select City"}
        </div>
        {selectedCity && (
          <div className="text-xs text-gray-500">
            {selectedCity.area && `${selectedCity.area}` }
            {selectedCity.state}
          </div>
        )}
      </div>
      <HiChevronDown className="w-4 h-4 text-gray-400" />
    </button>
  );
};

export default CitySelector;
