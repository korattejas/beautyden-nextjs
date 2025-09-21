"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiMapPin,
  HiXMark,
  HiSparkles,
  HiMagnifyingGlass,
} from "react-icons/hi2";
import { useCities } from "@/hooks/useHiring";
import { City } from "@/types/city";
import Button from "./Button";

interface CitySelectionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onCitySelect: (city: City) => void;
}

const CitySelectionPopup: React.FC<CitySelectionPopupProps> = ({
  isOpen,
  onClose,
  onCitySelect,
}) => {
  const { data: citiesData, isLoading } = useCities();
  const cities = citiesData?.data ?? [];
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter cities based on search term and availability (status = 0 means available)
  const availableCities = cities.filter(
    (city: City) =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      city.status == 0
  );

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  const handleConfirm = () => {
    if (selectedCity) {
      // Save to localStorage and context
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "beautyden_selected_city",
          JSON.stringify(selectedCity)
        );
        localStorage.setItem("beautyden_has_visited", "true");
      }
      onCitySelect(selectedCity);
    }
  };

  const handleSkip = () => {
    // Mark as visited but don't save city
    if (typeof window !== "undefined") {
      localStorage.setItem("beautyden_has_visited", "true");
    }
    onClose();
  };

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <style jsx global>{`
        .city-popup-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .city-popup-scroll::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 2px;
        }
        .city-popup-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 2px;
        }
        .city-popup-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <AnimatePresence>
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleSkip}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-gray-800 p-4 sm:p-6 text-white">
              <div className="flex items-start sm:items-center justify-between gap-3">
                <div className="flex items-start sm:items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full flex-shrink-0">
                    <HiMapPin className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-lg sm:text-xl font-bold">
                      Select Your City
                    </h2>
                    <p className="text-sm sm:text-base text-white/80 leading-tight">
                      Choose your city to get personalized services
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleSkip}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors flex-shrink-0"
                >
                  <HiXMark className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col h-full max-h-[calc(95vh-140px)] sm:max-h-[calc(90vh-160px)]">
              <div className="p-4 sm:p-6 pb-4">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-flex items-center gap-3 text-primary">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                      <span className="text-base sm:text-lg font-medium">
                        Loading cities...
                      </span>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Search */}
                    <div className="mb-4 sm:mb-6">
                      <div className="relative">
                        <HiMagnifyingGlass className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <input
                          type="text"
                          placeholder="Search for your city..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-3.5 text-sm sm:text-base border border-gray-200 rounded-xl sm:rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Cities List - Scrollable */}
              {!isLoading && (
                <div className="flex-1 overflow-hidden">
                  <div className="px-4 sm:px-6 pb-2">
                    <div className="flex items-center gap-2 mb-3 sm:mb-4">
                      <HiSparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                        {searchTerm ? "Search Results" : "Available Cities"}
                      </h3>
                      <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {availableCities.length}
                      </span>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto city-popup-scroll px-4 sm:px-6">
                    {availableCities.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-4">
                        {availableCities.map((city) => (
                          <motion.button
                            key={city.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => handleCitySelect(city)}
                            className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all duration-200 text-left hover:scale-[1.02] ${
                              selectedCity?.id === city.id
                                ? "border-primary bg-primary/10 text-primary shadow-lg"
                                : "border-gray-200 hover:border-primary/50 hover:bg-gray-50 hover:shadow-md"
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  selectedCity?.id === city.id
                                    ? "bg-primary/20"
                                    : "bg-gray-100"
                                }`}
                              >
                                <HiMapPin
                                  className={`w-4 h-4 sm:w-5 sm:h-5 ${
                                    selectedCity?.id === city.id
                                      ? "text-primary"
                                      : "text-gray-500"
                                  }`}
                                />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="font-semibold text-sm sm:text-base truncate">
                                  {city.name}
                                </div>
                                <div className="text-xs sm:text-sm text-gray-500 truncate">
                                  {city.area && `${city.area}, `}
                                  {city.state}
                                </div>
                              </div>
                              {selectedCity?.id === city.id && (
                                <div className="w-4 h-4 sm:w-5 sm:h-5 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                                  <div className="w-2 h-2 bg-white rounded-full" />
                                </div>
                              )}
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                          <HiMapPin className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                        </div>
                        <p className="text-gray-500 text-sm sm:text-base">
                          {searchTerm
                            ? "No cities found matching your search."
                            : "No cities available at the moment."}
                        </p>
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="mt-3 text-primary hover:text-primary/80 text-sm font-medium"
                          >
                            Clear search
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="text-xs sm:text-sm text-gray-600 min-w-0">
                  {selectedCity ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="truncate">
                        Selected:{" "}
                        <strong className="text-foreground">
                          {selectedCity.name}
                        </strong>
                      </span>
                    </div>
                  ) : (
                    <span>Please select a city to continue</span>
                  )}
                </div>

                <div className="flex gap-3 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    onClick={handleSkip}
                    className="flex-1 sm:flex-none px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
                  >
                    Skip for now
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={!selectedCity}
                    className="flex-1 sm:flex-none px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default CitySelectionPopup;
