"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CityProvider, useCityContext } from "@/contexts/CityContext";
import { CartProvider } from "@/contexts/CartContext";
import CitySelectionPopup from "@/components/ui/CitySelectionPopup";
import SplashScreen from "@/components/SplashScreen";
import { City } from "@/types/city";
import WhatsAppWidget from "./WhatsAppWidget";

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
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setIsClient(true);
    // Check if user has already seen splash screen in this session
    const hasSeenSplash = sessionStorage.getItem("beautyden_has_seen_splash");

    if (hasSeenSplash) {
      setShowSplash(false);
    }
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("beautyden_has_seen_splash", "true");
    }
  };

  // Don't render splash screen until client-side to prevent hydration mismatch
  if (!isClient) {
    return (
      <div className="">
        <QueryClientProvider client={queryClient}>
          <CityProvider>
            <CartProvider>
              <RootWrapperInner>{children}</RootWrapperInner>
            </CartProvider>
          </CityProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </div>
    );
  }

  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <CityProvider>
          <CartProvider>
          {/* Splash Screen */}
          <AnimatePresence mode="wait">
            {showSplash && (
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
          </CartProvider>
        </CityProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        <WhatsAppWidget />
      </QueryClientProvider>
    </div>
  );
}
