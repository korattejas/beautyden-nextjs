"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { HiStar, HiClock, HiArrowRight, HiSparkles, HiXMark } from "react-icons/hi2";
import Image from "next/image";
// import { formatPrice } from "@/data";
import { Service } from "@/services/services.service";
import { useState } from "react";
import { useSettings } from "@/hooks/useApi";
import { useSearchParams } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { BookingService } from "@/types/booking";

interface ServiceCardProps {
  service: Service;
  index: number;
  animated?: boolean;
  priorityImage?: boolean;
}

const FALLBACK_IMAGE = "/images/services/beauty-default.jpg";

const ServiceModal = ({
  service,
  onClose,
  subcategoryParam,
}: {
  service: Service;
  onClose: () => void;
  subcategoryParam?: string | null;
}) => {
  const [imgError, setImgError] = useState(false);
  const { data: settingsData } = useSettings();
  const settings = settingsData?.data || [];

  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    return settings.find((setting) => setting.key === key)?.value || "";
  };

  const hasDiscount = service.discount_price;
  const displayPrice = service.price;
  const originalPrice = parseFloat(service.price);

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl max-w-lg w-full max-h-[90vh] flex flex-col relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/50 hover:bg-white/70 rounded-full cursor-pointer transition-colors z-50"
        >
          <HiXMark className="w-5 h-5 text-foreground" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Service Image */}
          <div className="relative w-full h-64 rounded-xl overflow-hidden">
            <Image
              src={imgError ? FALLBACK_IMAGE : (service.icon || defaultImageForCategory(service.category_name) || FALLBACK_IMAGE)}
              alt={service.name}
              fill
              className="object-cover"
              unoptimized
              onError={() => setImgError(true)}
            />
          </div>

          <h3 className="text-2xl font-bold text-foreground">
            {service.name}
          </h3>

          <div className="flex items-center gap-4 text-sm text-foreground/60">
            <div className="flex items-center gap-1">
              <HiClock className="w-4 h-4" />
              <span>{service.duration}</span>
            </div>
            <span>{service.reviews || 0} reviews</span>
          </div>

          {/* Pricing Section */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-baseline gap-2" style={{alignItems:"center"}}>
              <span className="text-sm font-medium text-foreground/70">{getSetting("service_price_start_text")}</span>
              <span className="text-2xl font-bold text-primary">
                ₹{displayPrice.toLocaleString()}
              </span>
            </div>
            {hasDiscount && (
              <div className="flex items-center gap-2 mt-2">
               
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                  {hasDiscount}
                </span>
              </div>
            )}
          </div>

          {/* Description with fixed height */}
          <p className="text-foreground/80 leading-relaxed text-sm sm:text-base max-h-32 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
            {service.description}
          </p>

          {/* Includes with fixed height */}
          {service.includes && service.includes.length > 0 && (
            <div>
              <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">Includes:</h4>
              <div className="flex flex-wrap gap-2 max-h-24 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {service.includes.map((inc, idx) => (
                  <span
                    key={idx}
                    className="bg-primary/10 text-primary text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full font-medium"
                  >
                    {inc}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Book Button - fixed bottom */}
        <div className="p-4 border-t border-gray-100">
          <InstantBookButton service={service} subcategoryParam={subcategoryParam} onDone={onClose} />
        </div>
      </motion.div>
    </motion.div>
  );
};



const ServiceCard = ({ service, index, animated = true, priorityImage = false }: ServiceCardProps) => {
  const searchParams = useSearchParams();
  const subcategoryParam = searchParams.get('subcategory');
  
  // Calculate pricing display
  const hasDiscount =
    service.discount_price 
   
  const displayPrice = service.price

  const originalPrice = parseFloat(service.price);
  const [showFull, setShowFull] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [cardImgError, setCardImgError] = useState(false);
  const { data: settingsData, isLoading: settingsLoading } = useSettings();
  const settings = settingsData?.data || [];

  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    return settings.find((setting) => setting.key === key)?.value || "";
  };


  return (
    <>
    <motion.div
      initial={animated ? { opacity: 0, y: 30 } : undefined}
      whileInView={animated ? { opacity: 1, y: 0 } : undefined}
      animate={!animated ? { opacity: 1, y: 0 } : undefined}
      transition={animated ? { duration: 0.6, delay: Math.min(index * 0.05, 0.4) } : undefined}
      viewport={animated ? { once: true } : undefined}
      whileHover={{ y: -5 }}
      className="group bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-primary/10 hover:border-primary/20 h-full flex flex-col"
    >
      {/* Service Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={cardImgError ? FALLBACK_IMAGE : (service.icon || defaultImageForCategory(service.category_name) || FALLBACK_IMAGE)}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          priority={priorityImage}
          onError={() => setCardImgError(true)}
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold text-primary">
          {service.category_name}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 text-sm font-medium">
          <HiStar className="text-yellow-400 w-3 h-3" />
          <span className="text-xs">{service.rating || "N/A"}</span>
        </div>

        {/* Popular Badge */}
        {service?.is_popular === 1 && (
          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <HiSparkles className="w-3 h-3" />
            Popular
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {service.name}
        </h3>

        {/* Description */}

        <div className="mb-3 text-sm text-foreground/70 leading-relaxed">
  {showFull || (service.description?.length ?? 0) < 100 ? (
    <span>{service.description}</span>
  ) : (
    <>
      <span>{service.description?.slice(0, 100)}...</span>{" "}
      <button
        // onClick={() => setShowFull(true)}
        onClick={() => setShowModal(true)}
        className="text-primary text-xs font-semibold hover:underline ml-1"
      >
        Read More
      </button>
    </>
  )}
</div>


        {/* Duration and Reviews */}
        <div className="flex items-center justify-between mb-3 text-xs text-foreground/60">
          <div className="flex items-center gap-1">
            <HiClock className="w-3 h-3" />
            <span>{service.duration}</span>
          </div>
          <span>{service.reviews || 0} reviews</span>
        </div>

        {/* Includes - Show max 3 */}
       {/* Included Items */}
{/* {service.includes && service.includes.length > 0 && (
  <div className="flex flex-wrap gap-1 mb-4">
    {(showFull ? service.includes : service.includes.slice(0, 3)).map((feature, i) => (
      <span
        key={i}
        className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium"
      >
        {feature}
      </span>
    ))}
    {service.includes.length > 3 && !showFull && (
      <button
        // onClick={() => setShowFull(true)}
        onClick={() => setShowModal(true)}
        className="text-xs text-primary font-semibold hover:underline"
      >
        +{service.includes.length - 3} more
      </button>
    )}
  </div>
)} */}


        {/* Pricing and Book Button */}
        <div className="mt-auto">
          {/* Price Display */}
          {/* <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-foreground/70">
                Starts at
              </span>
              <span className="text-xl font-bold text-primary">
                ₹{displayPrice.toLocaleString()}
              </span>
            </div>

            {hasDiscount && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-foreground/50 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                  Save ₹{(originalPrice - displayPrice).toLocaleString()}
                </span>
              </div>
            )}
          </div> */}

{/* Pricing Display - Improved Layout */}
<div className="mb-4">
  <div className="flex items-baseline gap-2 mb-1" style={{alignItems:"center"}}>
    <span className="text-sm font-medium text-foreground/70">{getSetting("service_price_start_text")}</span>
    <span className="text-xl font-bold text-primary">
      ₹{displayPrice.toLocaleString()}
    </span>
  </div>
  {hasDiscount && (
    <div className="flex items-center gap-2">
      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
        {hasDiscount}
      </span>
    </div>
  )}
</div>

          {/* Action Buttons */}
          <div className="space-y-2">
            {/* View Service Button */}
            <Button
              onClick={() => setShowModal(true)}
              size="sm"
              variant="outline"
              className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-all duration-300 border border-gray-200"
            >
              <HiSparkles className="w-4 h-4" />
              View Service
            </Button>
            
            {/* Book Button */}
            <InstantBookButton service={service} subcategoryParam={subcategoryParam} />
          </div>
        </div>
      </div>
    </motion.div>
     {/* Modal */}
     {showModal && <ServiceModal service={service} onClose={() => setShowModal(false)} subcategoryParam={subcategoryParam} />}
     </>
  );
};

function InstantBookButton({ service, subcategoryParam, onDone }: { service: Service; subcategoryParam?: string | null; onDone?: () => void; }) {
  const router = useRouter();
  const { addItem, items } = useCart();

  const handleClick = () => {
    const bookingService: BookingService = {
      id: service.id.toString(),
      name: service.name,
      price: service.price || "0",
      duration: service.duration || "60 min",
      category_id: service.category_id?.toString?.() || "",
      category_name: service.category_name,
      description: service.description,
      discount_price: service?.discount_price,
      icon: service.icon || undefined,
    };
    // Add instantly if not in cart
    if (!items.find((i) => i.id === bookingService.id)) {
      addItem(bookingService);
    }
    // Navigate
    const target = `/book?service=${service.id}${service.category_id ? `&category=${service.category_id}` : ''}${subcategoryParam ? `&subcategory=${subcategoryParam}` : ''}`;
    if (onDone) onDone();
    router.push(target);
  };

  return (
    <Button
      onClick={handleClick}
      size="sm"
      className="w-full flex items-center justify-center gap-2 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      Book Now
      <HiArrowRight className="w-4 h-4" />
    </Button>
  );
}

// Default fallback images based on category
function defaultImageForCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    "Hair Services": "/images/services/hair-default.jpg",
    "Face & Skin": "/images/services/facial-default.jpg",
    "Nail Care": "/images/services/nails-default.jpg",
    Makeup: "/images/services/makeup-default.jpg",
    Massage: "/images/services/massage-default.jpg",
    Wellness: "/images/services/wellness-default.jpg",
  };

  return categoryMap[category] || "/images/services/beauty-default.jpg";
}

import React from "react";

export default React.memo(ServiceCard);
