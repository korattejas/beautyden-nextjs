"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CityProvider, useCityContext } from "@/contexts/CityContext";
import CitySelectionPopup from "@/components/ui/CitySelectionPopup";
import SplashScreen from "@/components/SplashScreen";
import { City } from "@/types/city";

interface RootWrapperProps {
  children: ReactNode;
}

// Inner component that uses the city context
const RootWrapperInner = ({ children }: { children: ReactNode }) => {
  const { showCityPopup, setShowCityPopup, setSelectedCity } = useCityContext();

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
    setShowCityPopup(false);
  };

  const handleClosePopup = () => {
    setShowCityPopup(false);
    // Mark as visited even if no city is selected
    if (typeof window !== "undefined") {
      localStorage.setItem("beautyden_has_visited", "true");
    }
  };

  return (
    <>
      {children}
      <CitySelectionPopup
        isOpen={showCityPopup}
        onClose={handleClosePopup}
        onCitySelect={handleCitySelect}
      />
    </>
  );
};

export default function RootWrapper({ children }: RootWrapperProps) {
  const [queryClient] = useState(() => new QueryClient());
  const [showSplash, setShowSplash] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Splash screen logic
  useEffect(() => {
    // Check if user has already seen splash screen in this session
    const hasSeenSplash = sessionStorage.getItem("beautyden_has_seen_splash");

    if (hasSeenSplash) {
      setShowSplash(false);
      setIsLoaded(true);
    } else {
      // Minimum splash time of 2.5 seconds
      const minTime = setTimeout(() => {
        setIsLoaded(true);
      }, 2500);

      return () => clearTimeout(minTime);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("beautyden_has_seen_splash", "true");
    }
  };

  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <CityProvider>
          {/* Splash Screen */}
          <AnimatePresence mode="wait">
            {showSplash && isLoaded && (
              <SplashScreen key="splash" onComplete={handleSplashComplete} />
            )}
          </AnimatePresence>

          {/* Main Content */}
          <AnimatePresence mode="wait">
            {!showSplash && (
              <div key="content">
                <RootWrapperInner>{children}</RootWrapperInner>
              </div>
            )}
          </AnimatePresence>
        </CityProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
