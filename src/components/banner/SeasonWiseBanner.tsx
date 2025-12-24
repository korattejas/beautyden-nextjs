"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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
  const shouldShowBanner =
    getSetting("season_wise_banner_image_show")?.toLowerCase() === "yes";

  useEffect(() => {
    // Check if banner has been shown in this session
    const hasBeenShown = sessionStorage.getItem(SESSION_STORAGE_KEY) === "true";

    // Show banner after 5 seconds if conditions are met
    if (shouldShowBanner && !hasBeenShown) {
      const timerId = setTimeout(() => {
        setIsVisible(true);
      }, 5000); // 5 second delay

      // Cleanup: Clear timeout if component unmounts
      return () => clearTimeout(timerId);
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
          {/* Backdrop with enhanced blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
            onClick={handleClose}
          />

          {/* Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 30 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 400,
              mass: 0.8,
            }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-w-4xl w-full pointer-events-auto">
              {/* Close Button with enhanced styling */}
              <button
                onClick={handleClose}
                className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 
                bg-white rounded-full flex items-center justify-center shadow-xl 
                hover:bg-red-50 hover:scale-110 transition-all duration-200 z-10 
                group border-2 border-gray-100"
                aria-label="Close banner"
              >
                <HiXMark className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700 group-hover:text-red-500 transition-colors" />
              </button>

              {/* Banner Image Container with enhanced shadow and border */}
              <motion.div
                initial={{ rotateX: 10 }}
                animate={{ rotateX: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl 
                ring-1 ring-white/20"
              >
                <Image
                  src="/images/services/offer-banner.jpg"
                  alt="Seasonal Offer Banner"
                  width={1200}
                  height={600}
                  className="w-full h-auto object-contain"
                  priority
                  unoptimized
                />

                {/* Gradient overlay for better button visibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

                {/* Book Now Button */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto">
                  <Link href="/book" onClick={handleClose}>
                    <motion.button
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-black  text-white font-semibold px-8 py-3 sm:px-10 sm:py-4 
                      rounded-full shadow-lg hover:shadow-xl transition-all duration-200
                      text-sm sm:text-base flex items-center gap-2 group"
                    >
                      <span>Book Now</span>
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SeasonWiseBanner;
