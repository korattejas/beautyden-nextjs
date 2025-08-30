"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import {
  HiXMark,
  HiChevronLeft,
  HiChevronRight,
  HiStar,
  HiHeart,
} from "react-icons/hi2";
import Image from "next/image";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ReviewMediaModalProps {
  photos: string[];
  video?: string | null;
  isOpen: boolean;
  initialIndex?: number;
  onClose: () => void;
  customerName?: string;
  customerPhoto?: string | null;
  reviewText?: string | null;
  rating?: number;
  reviewDate?: string;
  serviceName?: string | null;
  helpfulCount?: number;
}

const ReviewMediaModal = ({
  photos,
  video,
  isOpen,
  initialIndex = 0,
  onClose,
  customerName,
  customerPhoto,
  reviewText,
  rating,
  reviewDate,
  serviceName,
  helpfulCount = 0,
}: ReviewMediaModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  // Close on Escape key press
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", onEsc);
    }

    return () => document.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  if (!mounted || !isOpen) return null;

  const allMedia = [...photos];
  if (video) allMedia.push(video);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[95vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          aria-label="Close"
          className="absolute top-4 right-4 z-20 w-12 h-12 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-all duration-300"
          onClick={onClose}
        >
          <HiXMark className="w-6 h-6" />
        </button>

        {/* Header with complete review info */}
        <div className="bg-gradient-to-r from-primary/5 to-secondary/5 p-6 border-b border-primary/10">
          <div className="flex items-start gap-4">
            {/* Customer Avatar */}
            <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
              {customerPhoto ? (
                <Image
                  src={customerPhoto}
                  alt={customerName || "Customer"}
                  width={64}
                  height={64}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-xl font-semibold text-primary">
                    {customerName?.charAt(0).toUpperCase() || "?"}
                  </span>
                </div>
              )}
            </div>

            {/* Review Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-xl text-foreground">
                  {customerName || "Anonymous"}
                </h3>
                <div className="text-sm text-foreground/60">{reviewDate}</div>
              </div>

              {/* Rating */}
              {rating && rating > 0 && (
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <HiStar
                        key={i}
                        className={`w-5 h-5 ${
                          i < rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-lg font-medium text-foreground">
                    {rating}.0
                  </span>
                </div>
              )}

              {/* Service Name */}
              {serviceName && (
                <div className="mb-3">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    Service: {serviceName}
                  </span>
                </div>
              )}

              {/* Review Text */}
              {reviewText && (
                <p className="text-foreground/80 leading-relaxed text-lg">
                  {reviewText}
                </p>
              )}

              {/* Media count and helpful info */}
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-primary/10">
                <div className="text-sm text-foreground/60">
                  {allMedia.length} {allMedia.length === 1 ? "item" : "items"} •
                  Use arrow keys to navigate
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <HiHeart className="w-4 h-4" />
                  Helpful ({helpfulCount})
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Swiper container */}
        <div className="relative flex-1 bg-gray-100">
          <Swiper
            modules={[Navigation, Pagination, Keyboard]}
            initialSlide={initialIndex}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            keyboard={{ enabled: true }}
            spaceBetween={0}
            className="h-full"
          >
            {photos.map((src, idx) => (
              <SwiperSlide
                key={idx}
                className="flex items-center justify-center bg-gray-50"
              >
                <div className="w-full h-full flex items-center justify-center p-4">
                  <Image
                    src={src}
                    alt={`Review photo ${idx + 1}`}
                    width={1200}
                    height={800}
                    className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                  />
                </div>
              </SwiperSlide>
            ))}

            {video && (
              <SwiperSlide
                key="video"
                className="flex items-center justify-center bg-gray-900"
              >
                <div className="w-full h-full flex items-center justify-center p-4">
                  <video
                    controls
                    className="max-h-full max-w-full rounded-lg shadow-lg"
                    autoPlay
                    muted
                  >
                    <source src={video} type="video/mp4" />
                    <source src={video} type="video/webm" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </SwiperSlide>
            )}

            {/* Custom Navigation Buttons */}
            {allMedia.length > 1 && (
              <>
                <button className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border-2 border-white/20">
                  <HiChevronLeft className="w-7 h-7" />
                </button>
                <button className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 border-2 border-white/20">
                  <HiChevronRight className="w-7 h-7" />
                </button>
              </>
            )}
          </Swiper>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ReviewMediaModal;
