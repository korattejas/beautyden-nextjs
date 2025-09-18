"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";
import { CityProvider, useCityContext } from "@/contexts/CityContext";
import CitySelectionPopup from "@/components/ui/CitySelectionPopup";
import { City } from "@/types/city";

interface RootWrapperProps {
  children: ReactNode;
}

// Inner component that uses the city context
const RootWrapperInner = ({ children }: { children: ReactNode }) => {
  const {
    showCityPopup,
    setShowCityPopup,
      setSelectedCity,
  } = useCityContext();

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

  // Load WhatsApp widget script
  // useEffect(() => {
  //   const scriptId = "aisensy-wa-widget";

  //   // Check if script is already loaded
  //   if (!document.getElementById(scriptId)) {
  //     const script = document.createElement("script");
  //     script.id = scriptId;
  //     script.type = "text/javascript";
  //     script.src =
  //       "https://d3mkw6s8thqya7.cloudfront.net/integration-plugin.js";
  //     script.setAttribute("widget-id", "aaa45p");
  //     script.async = true;

  //     // Append to body
  //     document.body.appendChild(script);

  //     // Optional: Add error handling
  //     script.onerror = () => {
  //       console.error("Failed to load WhatsApp widget script");
  //     };

  //     script.onload = () => {
  //       console.log("WhatsApp widget script loaded successfully");
  //     };
  //   }

  //   // Cleanup function (optional)
  //   return () => {
  //     const existingScript = document.getElementById(scriptId);
  //     if (existingScript) {
  //       // Only remove if needed (usually not required for persistent widgets)
  //       // existingScript.remove();
  //     }
  //   };
  // }, []);

  return (
    <div className="">
      {/* Add third-party providers here like:
          - React Query
          - Auth providers
          - Theme providers
          - Analytics
      */}
      <QueryClientProvider client={queryClient}>
        <CityProvider>
          <RootWrapperInner>
            {children}
          </RootWrapperInner>
        </CityProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </div>
  );
}
