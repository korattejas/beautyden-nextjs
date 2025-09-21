"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { City } from "@/types/city";

interface CityContextType {
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
  showCityPopup: boolean;
  setShowCityPopup: (show: boolean) => void;
  clearSelectedCity: () => void;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

export const CityProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCity, setSelectedCityState] = useState<City | null>(null);
  const [showCityPopup, setShowCityPopup] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load selected city from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCity = localStorage.getItem("beautyden_selected_city");
      if (savedCity) {
        try {
          const cityData = JSON.parse(savedCity);
          setSelectedCityState(cityData);
        } catch (error) {
          console.error("Error parsing saved city:", error);
          localStorage.removeItem("beautyden_selected_city");
        }
      }
      setIsInitialized(true);
    }
  }, []);

  // Check if we should show city popup
  useEffect(() => {
    if (isInitialized && typeof window !== "undefined") {
      const savedCity = localStorage.getItem("beautyden_selected_city");
      const hasVisited = localStorage.getItem("beautyden_has_visited");

      // Show popup if no city is selected and user hasn't visited before
      if (!savedCity && !hasVisited) {
        setShowCityPopup(true);
      }
    }
  }, [isInitialized]);

  const setSelectedCity = (city: City | null) => {
    setSelectedCityState(city);
    if (typeof window !== "undefined") {
      if (city) {
        localStorage.setItem("beautyden_selected_city", JSON.stringify(city));
        localStorage.setItem("beautyden_has_visited", "true");
      } else {
        localStorage.removeItem("beautyden_selected_city");
      }
    }
  };

  const clearSelectedCity = () => {
    setSelectedCityState(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("beautyden_selected_city");
    }
  };

  return (
    <CityContext.Provider
      value={{
        selectedCity,
        setSelectedCity,
        showCityPopup,
        setShowCityPopup,
        clearSelectedCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
};

export const useCityContext = () => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error("useCityContext must be used within a CityProvider");
  }
  return context;
};
