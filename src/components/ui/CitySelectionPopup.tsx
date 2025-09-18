"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiMapPin, HiXMark, HiSparkles } from "react-icons/hi2";
import { useCities } from "@/hooks/useHiring";
import { City } from "@/types/city";
import { SelectOption } from "./CustomSelect";
import Button from "./Button";
import Container from "./Container";

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

  // Filter cities based on search term and availability
  const availableCities = cities.filter(
    (city) =>
      // !city.launch_quarter && // Only show cities that are available now
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) && city.status == 0
  );

  const popularCities = availableCities.filter(
    (city) => city.is_popular == 1
  );

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  const handleConfirm = () => {
    if (selectedCity) {
      onCitySelect(selectedCity);
      onClose();
    }
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
          display: none;
          width:0px
        }
        .city-popup-scroll {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <AnimatePresence>
        <div className="fixed  scrollbar-hide inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <HiMapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Select Your City</h2>
                    <p className="text-white/80">
                      Choose your city to get started with BeautyDen
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <HiXMark className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 max-h-[60vh] overflow-y-auto city-popup-scroll">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="inline-flex items-center gap-3 text-primary">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <span className="text-lg font-medium">Loading cities...</span>
                  </div>
                </div>
              ) : (
                <>
                  {/* Search */}
                  <div className="mb-6">
                    <div className="relative">
                      <HiMapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Search for your city..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>
                  </div>

                  {/* Popular Cities */}
                  {/* {popularCities.length > 0 && searchTerm === "" && (
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-4">
                        <HiSparkles className="w-5 h-5 text-primary" />
                        <h3 className="text-lg font-semibold text-gray-900">
                          Popular Cities
                        </h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {popularCities.map((city) => (
                          <button
                            key={city.id}
                            onClick={() => handleCitySelect(city)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                              selectedCity?.id === city.id
                                ? "border-primary bg-primary/10 text-primary"
                                : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
                            }`}
                          >
                            <div className="font-semibold">{city.name}</div>
                            <div className="text-sm text-gray-500">
                              {city.area && `${city.area}, `}
                              {city.state}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )} */}

                  {/* All Cities */}
                  <div>
  <h3 className="text-lg font-semibold text-gray-900 mb-4">
    {searchTerm ? "Search Results" : "All Available Cities"}
  </h3>
  {availableCities.length > 0 ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 overflow-y-auto max-h-40 city-popup-scroll">
      {availableCities.map((city) => (
        <button
          key={city.id}
          onClick={() => handleCitySelect(city)}
          className={`py-2  px-3 rounded-xl border-2 transition-all duration-200 text-left ${
            selectedCity?.id === city.id
              ? "border-primary bg-primary/10 text-primary"
              : "border-gray-200 hover:border-primary/50 hover:bg-gray-50"
          }`}
        >
          <div className="font-semibold">{city.name}</div>
          <div className="text-sm text-gray-500">
            {city.area && `${city.area}, `}
            {city.state}
          </div>
        </button>
      ))}
    </div>
  ) : (
    <div className="text-center py-8 text-gray-500">
      {searchTerm
        ? "No cities found matching your search."
        : "No cities available at the moment."}
    </div>
  )}
</div>

                </>
              )}
            </div>

            {/* Footer */}
            <div className="border-t bg-gray-50 p-6">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600">
                  {selectedCity ? (
                    <span>
                      Selected: <strong>{selectedCity.name}</strong>
                    </span>
                  ) : (
                    "Please select a city to continue"
                  )}
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={onClose}
                    className="px-6"
                  >
                    Skip for now
                  </Button>
                  <Button
                    onClick={handleConfirm}
                    disabled={!selectedCity}
                    className="px-8"
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
