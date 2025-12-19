"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { HiXMark } from "react-icons/hi2";
import { useSettings } from "@/hooks/useApi";

const SESSION_STORAGE_KEY = "season_wise_banner_shown";

const SeasonWiseBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { data: settingsData } = useSettings();
  const settings = settingsData?.data || [];

  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    return settings.find((setting: any) => setting.key === key)?.value || "";
  };

  // Check if banner should be shown
  const shouldShowBanner = getSetting("season_wise_banner_image_show")?.toLowerCase() === "yes";

  useEffect(() => {
    // Check if banner has been shown in this session
    const hasBeenShown = sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";
    
    // Show banner if:
    // 1. Setting is enabled (shouldShowBanner is true)
    // 2. Banner hasn't been shown in this session
    if (shouldShowBanner && !hasBeenShown) {
      setIsVisible(true);
    }
  }, [shouldShowBanner]);

  const handleClose = () => {
    setIsVisible(false);
    // Mark as shown in session storage
    sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
  };

  if (!shouldShowBanner) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100]"
            onClick={handleClose}
          />
          
          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-4xl w-full pointer-events-auto">
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute -top-4 -right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100 transition-colors z-10"
                aria-label="Close banner"
              >
                <HiXMark className="w-6 h-6 text-gray-700" />
              </button>

              {/* Banner Image */}
              <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/services/offer-banner.jpg"
                  alt="Seasonal Offer Banner"
                  width={1200}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                  unoptimized
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SeasonWiseBanner;

