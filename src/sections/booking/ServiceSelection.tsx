"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  HiPlus,
  HiMinus,
  HiArrowRight,
  HiSparkles,
  HiClock,
  HiTag,
  HiShoppingBag,
  HiXMark,
  HiChevronLeft,
  HiChevronRight,
  HiPhoto,
  HiSquares2X2,
  HiStar,
  HiPhone,
} from "react-icons/hi2";
import { useServices, useServiceCategories, useSettings, useService } from "@/hooks/useApi";
import { BookingService } from "@/types/booking";
import Button from "@/components/ui/Button";
import AuthModal from "@/components/ui/AuthModal";
import MobileCartHeader from "./MobileCardHeader";
import { useCart } from "@/contexts/CartContext";

interface ServiceSelectionProps {
  selectedServices: BookingService[];
  onServicesChange: (services: BookingService[]) => void;
  onNext: () => void;
  preSelectedServiceId?: string | null;
  preSelectedCategoryId?: string | null;
  preSelectedSubCategoryId?: string | null;
}

const FALLBACK_IMAGE = "/images/services/beauty-default.jpg";

const ServiceModal = ({
  service,
  onClose,
  addItem,
}: {
  service: any;
  onClose: () => void;
  addItem: (service: BookingService) => void;
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
          <div className="relative w-full h-96 rounded-xl overflow-hidden">
            <Image
              src={imgError ? FALLBACK_IMAGE : (service.icon || FALLBACK_IMAGE)}
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
            <div className="flex items-baseline gap-2 align-middle" style={{alignItems:"center"}}>
              <span className="text-sm font-medium text-foreground/70">{getSetting("service_price_start_text")}</span>
              {hasDiscount ? (
                <>
                  <span className="text-2xl font-bold text-primary">
                    ₹{displayPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-foreground/50 line-through">
                    ₹{hasDiscount.toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-primary">
                  ₹{displayPrice.toLocaleString()}
                </span>
              )}
            </div>
            {hasDiscount && (() => {
              const originalPrice = parseFloat(hasDiscount);
              const discountedPrice = parseFloat(displayPrice);
              // Calculate discount percentage based on what % of original price you're paying
              const discountPercent = originalPrice > 0 && originalPrice > discountedPrice
                ? Math.floor((discountedPrice / originalPrice) * 100)
                : 0;
              return discountPercent > 0 ? (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                    <HiTag className="w-3 h-3" />
                    {discountPercent}% OFF
                  </span>
                </div>
              ) : null;
            })()}
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
                {service.includes.map((inc: any, idx: number) => (
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
          <Button
            onClick={() => {
              const bookingService: BookingService = {
                id: service.id.toString(),
                name: service.name,
                price: service.price || "0",
                duration: service.duration || "60 min",
                category_id: service.category_id.toString(),
                category_name: service.category_name,
                description: service.description,
                icon: service.icon,
                discount_price: service?.discount_price
              };
              addItem(bookingService);
              onClose();
            }}
            className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 font-semibold rounded-xl"
          >
            Add to Cart
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServiceSelection = ({
  selectedServices,
  onServicesChange,
  onNext,
  preSelectedServiceId,
  preSelectedCategoryId,
  preSelectedSubCategoryId,
}: ServiceSelectionProps) => {
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedSubCategories,setSelectedSubCategory]= useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [hasProcessedPreSelected, setHasProcessedPreSelected] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  
  // Use cart context for localStorage management
  const { items: cartItems, addItem, removeItem, totalItems, totalPrice } = useCart();
  
  // Initialize category and subcategory from URL params
  useEffect(() => {
    if (preSelectedCategoryId) {
      setSelectedCategories([preSelectedCategoryId]);
    }
    if (preSelectedSubCategoryId) {
      setSelectedSubCategory(preSelectedSubCategoryId);
    }
  }, [preSelectedCategoryId, preSelectedSubCategoryId]);

  // Listen to auth change events (for safety)
  useEffect(() => {
    const onAuthChanged = () => {};
    window.addEventListener("bd-auth-changed", onAuthChanged as EventListener);
    return () => window.removeEventListener("bd-auth-changed", onAuthChanged as EventListener);
  }, []);

  // Sync selectedServices with cartItems when cart changes externally (e.g., from header)
  // This ensures that when items are removed from header cart, selectedServices also updates
  // Use a ref to track if we're currently updating from within this component
  const isInternalUpdate = useRef(false);
  
  useEffect(() => {
    // Skip sync if this is an internal update (from toggleService or removeService)
    if (isInternalUpdate.current) {
      isInternalUpdate.current = false;
      return;
    }
    
    // Only sync if cart and selectedServices are out of sync
    const cartItemIds = new Set(cartItems.map(item => item.id));
    const selectedServiceIds = new Set(selectedServices.map(item => item.id));
    
    const hasMissingInSelected = cartItems.some(item => !selectedServiceIds.has(item.id));
    const hasExtraInSelected = selectedServices.some(item => !cartItemIds.has(item.id));
    
    // Only sync if cart was modified externally (items removed or added outside this component)
    if (hasMissingInSelected || hasExtraInSelected) {
      // Update selectedServices to match cartItems
      onServicesChange([...cartItems]);
    }
  }, [cartItems, selectedServices, onServicesChange]);

  // Build filters for API call
  const filters = {
    page: currentPage,
    ...(selectedCategories.length > 0 &&
      selectedCategories[0] !== "all" && {
        category_id: selectedCategories[0], // API might expect single category
        subcategory_id:selectedSubCategories
      }),
    ...(searchQuery && { search: searchQuery }),
  };
console.log("selectedServices----",selectedServices)
  const { data: servicesData, isLoading: servicesLoading } =
    useServices(filters);
  const { data: categoriesData, isLoading: categoriesLoading } =
    useServiceCategories();

  const { data: settingsData, isLoading: settingsLoading } = useSettings();
  const settings = settingsData?.data || [];

  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    return settings.find((setting) => setting.key === key)?.value || "";
  };

  const parseNumberFromSetting = (value: string | number | undefined, fallback = 0) => {
    if (value === undefined || value === null) return fallback;
    const cleaned = value.toString().replace(/[^\d.]/g, "");
    const parsed = parseFloat(cleaned);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  const advanceBookingDays = (() => {
    const parsed = parseInt(
      (getSetting("advance_book_day") || "").toString().replace(/[^\d]/g, ""),
      10
    );
    return Number.isNaN(parsed) ? 2 : parsed;
  })();

  const specialOfferPercentageSetting = getSetting("special_offer_percentage");
  const specialOfferThresholdSetting = getSetting(
    "special_offer_above_order_discount_amount"
  );
  const specialOfferPercentage = parseNumberFromSetting(
    specialOfferPercentageSetting,
    0
  );
  const specialOfferThreshold = parseNumberFromSetting(
    specialOfferThresholdSetting,
    0
  );

  const getSpecialOfferDiscount = (amount: number) => {
    if (!specialOfferPercentage || !specialOfferThreshold) return 0;
    if (amount < specialOfferThreshold) return 0;
    return Math.round((amount * specialOfferPercentage) / 100);
  };
  

  // Fix: Access nested data structure correctly
  const services = servicesData?.data?.data ?? [];
  const paginationData = servicesData?.data;
  const categories = categoriesData?.data ?? [];

  const selectedCategory = categories.find(
    (c) => c.id.toString() === selectedCategories[0]
  ) ;

  // Pre-select service if coming from service page - fetch directly if not on current page
  const { data: preSelectedServiceData, isLoading: isServiceLoading } = useService(preSelectedServiceId || "");
  
  useEffect(() => {
    if (!preSelectedServiceId || isServiceLoading || hasProcessedPreSelected) return;

    // Mark as processed to avoid re-adding on user removal
    setHasProcessedPreSelected(true);

    // Mark as internal update to prevent sync effect from running
    isInternalUpdate.current = true;

    // If already in cart, sync to selected and exit
    const alreadyInCart = cartItems.find((s) => s.id === preSelectedServiceId);
    if (alreadyInCart) {
      const isInSelected = selectedServices.find((s) => s.id === preSelectedServiceId);
      if (!isInSelected) {
        onServicesChange([...selectedServices, alreadyInCart]);
      }
      return;
    }

    // Try to use currently loaded services first
    const preSelectedService = services.find(
      (s) => s.id.toString() === preSelectedServiceId
    );

    let serviceToUse = preSelectedService;
    if (!serviceToUse && preSelectedServiceData) {
      serviceToUse = (preSelectedServiceData as any)?.data || preSelectedServiceData;
    }

    if (serviceToUse && serviceToUse.id) {
      const bookingService: BookingService = {
        id: serviceToUse.id.toString(),
        name: serviceToUse.name,
        price: serviceToUse.price || "0",
        duration: serviceToUse.duration || "60 min",
        category_id: serviceToUse.category_id.toString(),
        category_name: serviceToUse.category_name,
        description: serviceToUse.description,
        discount_price: serviceToUse?.discount_price,
        icon: serviceToUse.icon || undefined,
      };
      addItem(bookingService);
      const isInSelected = selectedServices.find((s) => s.id === bookingService.id);
      if (!isInSelected) {
        onServicesChange([...selectedServices, bookingService]);
      }
    }
  }, [preSelectedServiceId, preSelectedServiceData, isServiceLoading, hasProcessedPreSelected, cartItems, selectedServices, onServicesChange, addItem, services]);

  const toggleCategory = (categoryId: string,subcategories?: any) => {
    setSelectedCategories([categoryId]); // Single category selection for API
    if (subcategories && subcategories.length > 0) {
      // Auto-select first subcategory
      setSelectedSubCategory(subcategories[0]);
    } else {
      // Reset subcategory if none exist
      setSelectedSubCategory(null);
    }
    setCurrentPage(1); // Reset to first page when changing category
  };

  const toggleSubCategory = (subCatId:string)=>{
    setSelectedSubCategory(subCatId);
    setCurrentPage(1);
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Smooth scroll to services section
    document.getElementById("services-section")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleService = (service: any) => {
    const bookingService: BookingService = {
      id: service.id.toString(),
      name: service.name,
      price: service.price || "0",
      duration: service.duration || "60 min",
      category_id: service.category_id.toString(),
      category_name: service.category_name,
      description: service.description,
      icon: service.icon,
      discount_price: service?.discount_price
    };

    const isSelected = cartItems.find((s) => s.id === bookingService.id);

    // Mark as internal update to prevent sync effect from running
    isInternalUpdate.current = true;

    if (isSelected) {
      // Remove from cart immediately
      removeItem(bookingService.id);
      // Remove from selected services - ensure state is synced immediately
      const updatedServices = selectedServices.filter((s) => s.id !== bookingService.id);
      onServicesChange(updatedServices);
    } else {
      // Add to cart immediately
      addItem(bookingService);
      // Add to selected services - ensure state is synced immediately
      const updatedServices = [...selectedServices, bookingService];
      onServicesChange(updatedServices);
    }
  };

  const removeService = (serviceId: string) => {
    // Mark as internal update to prevent sync effect from running
    isInternalUpdate.current = true;
    // Remove from cart first
    removeItem(serviceId);
    // Remove from selected services
    const updatedServices = selectedServices.filter((s) => s.id !== serviceId);
    // Update selected services state - this will also sync with cart via onServicesChange
    onServicesChange(updatedServices);
  };

  // Helper function to extract minimum price from price string (e.g., "20-50" -> 20)
  const getMinPrice = (priceString: string): number => {
    if (!priceString) return 0;
    const priceMatch = priceString.match(/(\d+)/);
    return priceMatch ? parseInt(priceMatch[1]) : 0;
  };

  // Helper function to get display price (use current price if available, otherwise fallback to discount/original price)
  const getDisplayPrice = (service: BookingService): string => {
    return service.price || service.discount_price || "0";
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, service) => {
      const displayPrice = getDisplayPrice(service);
      return total + getMinPrice(displayPrice);
    }, 0);
  };

  const getTotalDuration = () => {
    return cartItems.reduce((total, service) => {
      const durationMatch = service.duration?.toString().match(/(\d+)/);
      const duration = durationMatch ? parseInt(durationMatch[1]) : 60;
      return total + duration;
    }, 0);
  };

  const formatDuration = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours && minutes) return `${hours} h ${minutes} min`;
    if (hours) return `${hours} h`;
    return `${minutes} min`;
  };

  const cartTotal = getTotalPrice();
  const specialOfferDiscountAmount = getSpecialOfferDiscount(cartTotal);
  const payableAfterSpecialOffer = Math.max(
    cartTotal - specialOfferDiscountAmount,
    0
  );
  const specialOfferLabel =
    specialOfferPercentageSetting ||
    (specialOfferPercentage ? `${specialOfferPercentage}%` : "");

  if (servicesLoading || categoriesLoading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center py-20">
          <div className="inline-flex items-center gap-3 text-primary">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
            <span className="text-lg font-medium">Loading services...</span>
          </div>
        </div>
      </div>
    );
  }

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-4">
          <HiSparkles className="w-4 h-4" />
          Step 1 of 4
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Choose Your Beauty Services
        </h2>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          Select from our range of professional beauty treatments. You can
          choose multiple services for your session.
        </p>
      </motion.div>

      {/* Main Content - Left Right Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Section - Services Selection */}
        <div className="lg:col-span-2 space-y-6 order-2 lg:order-1">
          {/* Search and Category Filters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card backdrop-blur-md rounded-3xl p-6 border border-border shadow-lg"
          >
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <HiSparkles className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10" />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1); // Reset to first page when searching
                  }}
                  className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-full focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 placeholder:text-foreground/40"
                />
                {searchQuery && (
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setCurrentPage(1);
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 hover:text-primary transition-colors"
                  >
                    <HiXMark className="w-full h-full" />
                  </button>
                )}
              </div>
            </div>

            {/* Category Filters */}
            <h3 className="font-semibold text-foreground mb-4">
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => toggleCategory("all")}
                className={`flex items-center gap-3 px-6 py-4 rounded-full font-medium transition-all duration-300 text-base ${
                  selectedCategories.length === 0 ||
                  selectedCategories[0] === "all"
                    ? "bg-primary text-white shadow-lg"
                    : "bg-background text-foreground/70 hover:text-primary hover:bg-primary/5 border border-border"
                }`}
              >
                <HiSparkles className="w-5 h-5" />
                All Services
              </button>

              {categories.map((category, index) => (
                <motion.button
                  key={`category-${category.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => {
                    const cat =  categories.find(
                      (c:any) => c.id.toString() == category.id.toString()
                    );
                    const subIds= cat?.subcategories?.map((i: any)=> i?.id) || [];
                    toggleCategory(category.id.toString(),subIds)
                  }}
                  className={`flex items-center gap-3 px-6 py-4 rounded-full font-medium transition-all duration-300 text-base ${
                    selectedCategories.includes(category.id.toString())
                      ? "bg-primary text-white shadow-lg"
                      : "bg-background text-foreground/70 hover:text-primary hover:bg-primary/5 border border-border"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                    {category.icon ? (
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={24}
                        height={24}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    ) : (
                      <HiSquares2X2 className="w-5 h-5 text-primary" />
                    )}
                  </div>
                  {category.name}
                </motion.button>
              ))}
            </div>
            {selectedCategory?.subcategories?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {selectedCategory  && selectedCategory?.subcategories.map((sub: any, index: any) => {
              const subId = sub.id.toString();
              const isActive = selectedSubCategories == subId;
              return (
                <motion.button
                  key={sub.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toggleSubCategory(subId)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-full text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-background hover:bg-primary/10 text-foreground/70 hover:text-primary border border-border"
                  }`}
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center">
                    {sub.icon ? (
                      <Image
                        src={sub.icon}
                        alt={`${sub.name} icon`}
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                        unoptimized
                      />
                    ) : (
                      <HiSparkles
                        className={`w-5 h-5 ${
                          isActive ? "text-white" : "text-primary"
                        }`}
                      />
                    )}
                  </div>
                  <span className="whitespace-nowrap"> {sub.name}</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      )}
            {/* Active Filters */}
            {(searchQuery || selectedCategories.length > 0) && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                <span className="text-sm text-foreground/60 font-medium">
                  Active filters:
                </span>

                {searchQuery && (
                  <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-medium">
                    &quot;{searchQuery}&quot;
                    <button onClick={() => setSearchQuery("")}>
                      <HiXMark className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {selectedCategories.length > 0 &&
                  selectedCategories[0] !== "all" && (
                    <span className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1.5 rounded-full text-sm font-medium">
                      {
                        categories.find(
                          (c) => c.id.toString() === selectedCategories[0]
                        )?.name
                      }
                      <button onClick={() => setSelectedCategories([])}>
                        <HiXMark className="w-3 h-3" />
                      </button>
                    </span>
                  )}

                <button
                  onClick={clearAllFilters}
                  className="text-sm text-foreground/60 hover:text-primary transition-colors font-medium underline decoration-dotted underline-offset-2"
                >
                  Clear All
                </button>
              </div>
            )}
          </motion.div>

          {/* Services Grid */}
          <div id="services-section">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedCategories.join(",")}-${currentPage}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {/* cart header */}
                           {/* <MobileCartHeader
  totalItems={totalItems}
  totalPrice={getTotalPrice()}
  onNext={onNext}
/> */}
                {services.map((service, index) => {
                  const isSelected = cartItems.find(
                    (s) => s.id === service.id.toString()
                  );
                  const hasDiscount = service.discount_price
              
                  const displayPrice = service.price
                  return (
                    <motion.div
                      key={`service-${service.id}-${currentPage}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      className={`bg-card backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                        isSelected
                          ? "border-primary shadow-primary/20"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      {/* Service Image */}
                      <div className="relative h-72 md:h-80 overflow-hidden bg-muted">
                        {service.icon ? (
                          <Image
                            src={service.icon}
                            alt={service.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover"
                            unoptimized
                          />
                        ) : (
                          <HiPhoto className="w-12 h-12 text-foreground/30" />
                        )}
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                            <HiSparkles className="w-3 h-3" />
                          </div>
                        )}
                      </div>

                        {/* Service Details */}
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-foreground mb-2 text-sm line-clamp-2">
                                {service.name}
                              </h3>
                              <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                                <HiTag className="w-2 h-2" />
                                {service.category_name}
                              </span>
                            </div>
                          </div>

                          {/* Pricing Section - Improved Layout */}
                          <div className="mb-4">
                            <div className="flex items-baseline gap-2 mb-1" style={{alignItems:"center"}}>
                              <span className="text-xs font-medium text-foreground/70">{getSetting("service_price_start_text")}</span>
                              {hasDiscount ? (
                                <>
                                  <span className="text-lg font-bold text-primary">
                                    ₹{displayPrice}
                                  </span>
                                  <span className="text-sm text-foreground/50 line-through">
                                    ₹{hasDiscount}
                                  </span>
                                </>
                              ) : (
                                <span className="text-lg font-bold text-primary">
                                  ₹{displayPrice}
                                </span>
                              )}
                            </div>
                            {hasDiscount && (() => {
                              const originalPrice = parseFloat(hasDiscount);
                              const discountedPrice = parseFloat(displayPrice);
                              // Calculate discount percentage based on what % of original price you're paying
                              const discountPercent = originalPrice > 0 && originalPrice > discountedPrice
                                ? Math.floor((discountedPrice / originalPrice) * 100)
                                : 0;
                              return discountPercent > 0 ? (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold flex items-center gap-1">
                                    <HiTag className="w-3 h-3" />
                                    {discountPercent}% OFF
                                  </span>
                                </div>
                              ) : null;
                            })()}
                            <div className="flex items-center gap-1 mt-1 text-xs text-foreground/60">
                              <HiClock className="w-3 h-3" />
                              {service.duration || "60 min"}
                            </div>
                          </div>

                        {service.description && (
                          <p className="text-foreground/70 text-xs mb-3 line-clamp-2">
                            {service.description}
                          </p>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-2">
                          {/* View Service Button */}
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedService(service);
                              setShowModal(true);
                            }}
                            className="w-full sm:w-1/2 flex items-center justify-center gap-2 h-10 rounded-xl font-medium text-sm transition-all duration-300 min-h-[40px]"
                          >
                            <HiSparkles className="w-3 h-3" />
                            View Service
                          </Button>
                          
                          {/* Add/Remove Service Button */}
                          <Button
                            onClick={(e) => {
                              if (e) {
                                e.preventDefault();
                                e.stopPropagation();
                              }
                              toggleService(service);
                            }}
                            className={`w-full sm:w-1/2 flex items-center justify-center gap-2 h-10 rounded-xl font-medium text-sm transition-all duration-300 bg-gradient-to-r from-primary to-secondary hover:scale-105`}
                          >
                            {isSelected ? (
                              <>
                                <HiMinus className="w-3 h-3" />
                                Remove
                              </>
                            ) : (
                              <>
                                <HiPlus className="w-3 h-3" />
                                Add Service
                              </>
                            )}
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {paginationData && paginationData.last_page > 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col items-center space-y-4 mt-8 w-full"
              >
                {/* Results Info */}
                <div className="text-sm text-foreground/60">
                  Showing{" "}
                  <span className="font-medium text-foreground">
                    {paginationData.from}
                  </span>{" "}
                  to{" "}
                  <span className="font-medium text-foreground">
                    {paginationData.to}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-foreground">
                    {paginationData.total}
                  </span>{" "}
                  services
                </div>

                {/* Pagination Controls */}
                <div className="flex flex-wrap items-center justify-center gap-3 w-full">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full sm:w-auto ${
                      currentPage === 1
                        ? "bg-muted text-foreground/40 cursor-not-allowed"
                        : "bg-card text-foreground hover:bg-primary hover:text-white border border-border cursor-pointer"
                    }`}
                  >
                    <HiChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex flex-wrap items-center justify-center gap-2">
                    {Array.from(
                      { length: Math.min(5, paginationData.last_page) },
                      (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer w-10 sm:w-auto text-center ${
                              currentPage === page
                                ? "bg-primary text-white"
                                : "bg-card text-foreground hover:bg-primary/10 border border-border"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      }
                    )}

                    {paginationData.last_page > 5 && (
                      <>
                        <span className="px-3 py-2 text-foreground/60">
                          ...
                        </span>
                        <button
                          onClick={() =>
                            handlePageChange(paginationData.last_page)
                          }
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer w-10 sm:w-auto text-center ${
                            currentPage === paginationData.last_page
                              ? "bg-primary text-white"
                              : "bg-card text-foreground hover:bg-primary/10 border border-border"
                          }`}
                        >
                          {paginationData.last_page}
                        </button>
                      </>
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === paginationData.last_page}
                    className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 w-full sm:w-auto ${
                      currentPage === paginationData.last_page
                        ? "bg-muted text-foreground/40 cursor-not-allowed"
                        : "bg-card text-foreground hover:bg-primary hover:text-white border border-border cursor-pointer"
                    }`}
                  >
                    Next
                    <HiChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Empty State */}
            {services.length === 0 && !servicesLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  No services found
                </h3>
                <p className="text-foreground/60 text-sm mb-4">
                  Try adjusting your search or category filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-primary hover:text-primary/80 font-medium text-sm underline"
                >
                  Clear all filters
                </button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Right Section - Selected Services & Summary */}
        <div className="lg:col-span-1 order-1 lg:order-2 w-full">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-accent/50 backdrop-blur-md rounded-3xl p-6 border border-border shadow-xl lg:sticky lg:top-8"
          >
            {/* Header */}
    
 
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-2xl flex items-center justify-center">
                <HiShoppingBag className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Your Cart
                </h3>
                <p className="text-xs text-foreground/60">
                  {totalItems} service
                  {totalItems !== 1 ? "s" : ""} selected
                </p>
              </div>
            </div>

            {/* Advance Booking Message */}
            {getSetting("phone_number") && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-3 rounded-xl bg-blue-50 border border-blue-200"
              >
                <p className="text-xs text-foreground/70 leading-relaxed">
                  <span className="font-semibold text-foreground">
                    Please book in {advanceBookingDays}{" "}
                    {advanceBookingDays === 1 ? "day" : "days"} advance
                  </span>
                  {getSetting("phone_number") && (
                    <>
                      {" "}and if urgent then call{" "}
                      <a 
                        href={`tel:${getSetting("phone_number")}`}
                        className="text-primary font-semibold hover:underline inline-flex items-center gap-1"
                      >
                        <HiPhone className="w-3 h-3" />
                        {getSetting("phone_number")}
                      </a>
                    </>
                  )}
                </p>
              </motion.div>
            )}

           
            {/* Selected Services */}
            {cartItems.length > 0 ? (
              <div className="space-y-4 mb-6">
                <AnimatePresence>
                  {cartItems.map((service, index) => (
                    <motion.div
                      key={`selected-${service.id}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-3 bg-card backdrop-blur-sm rounded-2xl p-3 border border-border"
                    >
                      <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                        {service.icon ? (
                          <Image
                            src={service.icon}
                            alt={service.name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                            unoptimized
                          />
                        ) : (
                          <HiPhoto className="w-6 h-6 text-foreground/30" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {service.name}
                        </p>
                        <p className="text-xs text-foreground/60">
                          {service.duration}
                        </p>
                        <div className="text-sm font-bold text-primary">
                          {service.discount_price ? (
                            <div className="flex items-end gap-1">
                              <span>
                                ₹
                                {(() => {
                                  const priceMatch = service.price
                                    ?.toString()
                                    .match(/(\d+)/);
                                  const price = priceMatch
                                    ? parseFloat(priceMatch[1])
                                    : 0;
                                  return price.toLocaleString();
                                })()}
                              </span>
                              <span className="text-xs text-foreground/60 line-through">
                                ₹
                                {(() => {
                                  const priceMatch = service.discount_price
                                    ?.toString()
                                    .match(/(\d+)/);
                                  const price = priceMatch
                                    ? parseFloat(priceMatch[1])
                                    : 0;
                                  return price.toLocaleString();
                                })()}
                              </span>
                            </div>
                          ) : (
                            <span>
                              ₹
                              {(() => {
                                const priceMatch = service.price
                                  ?.toString()
                                  .match(/(\d+)/);
                                const price = priceMatch
                                  ? parseFloat(priceMatch[1])
                                  : 0;
                                return price.toLocaleString();
                              })()}
                            </span>
                          )}
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          removeService(service.id);
                        }}
                        className="text-red-500 hover:text-red-700 transition-colors p-1 flex-shrink-0"
                        aria-label="Remove service"
                      >
                        <HiXMark className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-8 mb-6">
                <div className="text-3xl mb-3">🛍️</div>
                <p className="text-foreground/60 text-sm">
                  No services selected yet
                </p>
                <p className="text-foreground/40 text-xs mt-1">
                  Choose services from the left
                </p>
              </div>
            )}

            {/* Summary */}
            {cartItems.length > 0 && (
              <>
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground/70">
                      Duration:
                    </span>
                    <span className="font-medium text-foreground text-sm">
                      {formatDuration(getTotalDuration())}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground/70">
                      Approx Total:
                    </span>
                    <span className="font-medium text-foreground text-sm">
                    ₹{cartTotal.toLocaleString()}
                    </span>
                  </div>
                {specialOfferDiscountAmount > 0 && (
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-medium text-green-700">
                      Special Offer ({specialOfferLabel || `${specialOfferPercentage}%`})
                    </span>
                    <span className="text-sm font-semibold text-green-700">
                      -₹{specialOfferDiscountAmount.toLocaleString()}
                    </span>
                  </div>
                )}
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-foreground/70">
                      Services:
                    </span>
                    <span className="font-medium text-foreground text-sm">
                      {totalItems}
                    </span>
                  </div>
                <div className="flex justify-between items-center pt-2 border-t border-border">
                  <span className="font-semibold text-foreground">
                    Estimated Payable:
                  </span>
                  <span className="text-xl font-bold text-primary">
                    ₹{payableAfterSpecialOffer.toLocaleString()}
                  </span>
                </div>
                </div>

                {/* Validation Message */}
                {/* {(() => {
                  const minService = parseInt(getSetting("min_service_book") || "1");
                  const maxService = parseInt(getSetting("max_service_book") || "100");
                  const isBelowMin = cartItems.length < minService;
                  const isAboveMax = cartItems.length > maxService;
                  
                  if (isBelowMin || isAboveMax) {
                    return (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200"
                      >
                        <p className="text-sm font-medium text-amber-800 flex items-center gap-2">
                          <HiSparkles className="w-4 h-4 flex-shrink-0" />
                          {isBelowMin 
                            ? `Minimum ${minService} service${minService > 1 ? 's' : ''} need to be selected.`
                            : `Maximum ${maxService} service${maxService > 1 ? 's' : ''} can be selected.`
                          }
                        </p>
                      </motion.div>
                    );
                  }
                  return null;
                })()} */}
                
                {/* Order Amount Discount Text */}
                {getSetting("order_amount_discount_text") && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 p-3 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
                  >
                    <p className="text-sm font-medium text-foreground text-center">
                      {getSetting("order_amount_discount_text")}
                    </p>
                  </motion.div>
                )}

                {/* Minimum Order Amount Message - Show when button is disabled */}
                {(() => {
                  const minOrderAmount = parseFloat(getSetting("min_order_amount") || "0");
                  const totalPrice = cartTotal;
                  const isDisabled = totalPrice < minOrderAmount;
                  
                  return isDisabled && minOrderAmount > 0 ? (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200"
                    >
                      <p className="text-sm font-medium text-amber-800 flex items-start gap-2">
                        <HiSparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        <span>
                          Minimum ₹{minOrderAmount.toLocaleString()} order required. 
                          <span className="block mt-1 text-amber-700 font-normal">
                            Add ₹{(minOrderAmount - totalPrice).toLocaleString()} more to proceed.
                          </span>
                        </span>
                      </p>
                    </motion.div>
                  ) : null;
                })()}

                <Button
                  onClick={() => {
                    // Get min and max service limits from settings
                    // const minService = parseInt(getSetting("min_service_book") || "1");
                    // const maxService = parseInt(getSetting("max_service_book") || "100");
                    
                    // Validate service count
                    // if (cartItems.length < minService || cartItems.length > maxService) {
                    //   return; // Don't proceed if validation fails
                    // }
                    // Auth gate
                    // const isLoggedIn = typeof window !== "undefined" && localStorage.getItem("bd_isLoggedIn") === "true";
                    // if (!isLoggedIn) {
                    //   setAuthOpen(true);
                    //   return;
                    // }

                    // Sync cart items to selectedServices before proceeding
                    onServicesChange([...cartItems]);
                    onNext();
                  }}
                  disabled={(() => {
                    const minOrderAmount = parseFloat(getSetting("min_order_amount") || "0");
                    const totalPrice = cartTotal;
                    return totalPrice < minOrderAmount;
                  })()}
                  className="w-full bg-primary text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  Continue to Date & Time
                  <HiArrowRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {cartItems.length === 0 && (
              <div className="text-center">
                <p className="text-foreground/60 text-sm mb-4">
                  Select services to continue
                </p>
                <div className="w-full bg-muted py-3 rounded-2xl font-medium text-foreground/50 cursor-not-allowed">
                  Continue to Date & Time
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Service Modal */}
      {showModal && selectedService && (
        <ServiceModal 
          service={selectedService} 
          addItem={addItem}
          onClose={() => {
            setShowModal(false);
            setSelectedService(null);
          }} 
        />
      )}

      {/* Auth Modal for gating Continue */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoggedIn={() => {
          setAuthOpen(false);
          onServicesChange([...cartItems]);
          onNext();
        }}
      />
    </div>
  );
};

export default ServiceSelection;
