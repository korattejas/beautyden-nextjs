"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { City } from "@/types/city";

interface CityContextType {
  selectedCity: City | null;
  setSelectedCity: (city: City | null) => void;
  showCityPopup: boolean;
  setShowCityPopup: (show: boolean) => void;
  isFirstVisit: boolean;
}

const CityContext = createContext<CityContextType | undefined>(undefined);

interface CityProviderProps {
  children: ReactNode;
}

export const CityProvider: React.FC<CityProviderProps> = ({ children }) => {
  const [selectedCity, setSelectedCityState] = useState<City | null>(null);
  const [showCityPopup, setShowCityPopup] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);

  // Check for first visit and stored city on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hasVisited = localStorage.getItem("beautyden_has_visited");
      const storedCity = localStorage.getItem("beautyden_selected_city");

      if (!hasVisited) {
        setIsFirstVisit(true);
        setShowCityPopup(true);
      } else if (storedCity) {
        try {
          const city = JSON.parse(storedCity);
          setSelectedCityState(city);
        } catch (error) {
          console.error("Error parsing stored city:", error);
        }
      }
    }
  }, []);

  const setSelectedCity = (city: City | null) => {
    setSelectedCityState(city);
    if (typeof window !== "undefined") {
      if (city) {
        localStorage.setItem("beautyden_selected_city", JSON.stringify(city));
      } else {
        localStorage.removeItem("beautyden_selected_city");
      }
      // Mark as visited when city is selected or popup is closed
      localStorage.setItem("beautyden_has_visited", "true");
    }
  };

  const value = {
    selectedCity,
    setSelectedCity,
    showCityPopup,
    setShowCityPopup,
    isFirstVisit,
  };

  return (
    <CityContext.Provider value={value}>
      {children}
    </CityContext.Provider>
  );
};

export const useCityContext = (): CityContextType => {
  const context = useContext(CityContext);
  if (context === undefined) {
    throw new Error("useCityContext must be used within a CityProvider");
  }
  return context;
};

export default CityContext;
