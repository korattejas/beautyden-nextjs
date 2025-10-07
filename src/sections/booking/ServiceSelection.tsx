"use client";

import { useState, useEffect } from "react";
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
} from "react-icons/hi2";
import { useServices, useServiceCategories, useSettings } from "@/hooks/useApi";
import { BookingService } from "@/types/booking";
import Button from "@/components/ui/Button";
import MobileCartHeader from "./MobileCardHeader";
import { useCart } from "@/contexts/CartContext";
import { formatDuration, parseDurationToMinutes } from "@/utils/time";

interface ServiceSelectionProps {
  selectedServices: BookingService[];
  onServicesChange: (services: BookingService[]) => void;
  onNext: () => void;
  preSelectedServiceId?: string | null;
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
          <div className="relative w-full h-64 rounded-xl overflow-hidden">
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
}: ServiceSelectionProps) => {
  const [selectedCategories, setSelectedCategories] = useState<any[]>([]);
  const [selectedSubCategories,setSelectedSubCategory]= useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedService, setSelectedService] = useState<any>(null);
  
  // Use cart context for localStorage management
  const { items: cartItems, addItem, removeItem, totalItems, totalPrice } = useCart();

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
  

  // Fix: Access nested data structure correctly
  const services = servicesData?.data?.data ?? [];
  const paginationData = servicesData?.data;
  const categories = categoriesData?.data ?? [];

  const selectedCategory = categories.find(
    (c) => c.id.toString() === selectedCategories[0]
  ) ;

  // Pre-select service if coming from service page
  useEffect(() => {
    if (preSelectedServiceId && services.length > 0) {
      const preSelectedService = services.find(
        (s) => s.id.toString() === preSelectedServiceId
      );
      if (
        preSelectedService &&
        !cartItems.find((s) => s.id === preSelectedService.id.toString())
      ) {
        const bookingService: BookingService = {
          id: preSelectedService.id.toString(),
          name: preSelectedService.name,
          price: preSelectedService.price || "0",
          duration: preSelectedService.duration || "60 min",
          category_id: preSelectedService.category_id.toString(),
          category_name: preSelectedService.category_name,
          description: preSelectedService.description,
          discount_price: preSelectedService?.discount_price,
          icon: preSelectedService.icon || undefined,
        };
        addItem(bookingService);
        onServicesChange([...selectedServices, bookingService]);
      }
    }
  }, [preSelectedServiceId, services, cartItems, selectedServices, onServicesChange, addItem]);

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

    if (isSelected) {
      removeItem(bookingService.id);
      onServicesChange(
        selectedServices.filter((s) => s.id !== bookingService.id)
      );
    } else {
      addItem(bookingService);
      onServicesChange([...selectedServices, bookingService]);
    }
  };

  const removeService = (serviceId: string) => {
    removeItem(serviceId);
    onServicesChange(selectedServices.filter((s) => s.id !== serviceId));
  };

  // Helper function to extract minimum price from price string (e.g., "20-50" -> 20)
  const getMinPrice = (priceString: string): number => {
    if (!priceString) return 0;
    const priceMatch = priceString.match(/(\d+)/);
    return priceMatch ? parseInt(priceMatch[1]) : 0;
  };

  // Helper function to get display price (use discount_price if available, otherwise original price)
  const getDisplayPrice = (service: BookingService): string => {
    return service.discount_price || service.price;
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, service) => {
      const displayPrice = getDisplayPrice(service);
      return total + getMinPrice(displayPrice);
    }, 0);
  };

  const getTotalDuration = () => {
    return cartItems.reduce((total, service) => {
      const minutes = parseDurationToMinutes(service.duration);
      return total + minutes;
    }, 0);
  };

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
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Section - Services Selection */}
        <div className="lg:col-span-2 space-y-6">
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
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => toggleCategory("all")}
                className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-4 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                  selectedCategories.length === 0 ||
                  selectedCategories[0] === "all"
                    ? "bg-primary text-white shadow-lg"
                    : "bg-background text-foreground/70 hover:text-primary hover:bg-primary/5 border border-border"
                }`}
              >
                <HiSparkles className="w-4 h-4 sm:w-5 sm:h-5" />
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
                  className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-4 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                    selectedCategories.includes(category.id.toString())
                      ? "bg-primary text-white shadow-lg"
                      : "bg-background text-foreground/70 hover:text-primary hover:bg-primary/5 border border-border"
                  }`}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden flex items-center justify-center">
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
                      <HiSquares2X2 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
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
                  className={`flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-4 rounded-full text-sm sm:text-base font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-background hover:bg-primary/10 text-foreground/70 hover:text-primary border border-border"
                  }`}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden flex items-center justify-center">
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
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${
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
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {/* cart header */}
                           <MobileCartHeader
  totalItems={totalItems}
  totalPrice={getTotalPrice()}
  onNext={onNext}
/>
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
                      className={`bg-card backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 h-full flex flex-col ${
                        isSelected
                          ? "border-primary shadow-primary/20"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      {/* Service Image */}
                      <div className="relative h-32 overflow-hidden bg-muted flex items-center justify-center">
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
                        <div className="p-4 flex flex-col flex-1">
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
                              <span className="text-lg font-bold text-primary">
                                ₹{displayPrice}
                              </span>
                            </div>
                            {hasDiscount && (
                              <div className="flex items-center gap-2">
                               
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                                  {hasDiscount}
                                </span>
                              </div>
                            )}
            <div className="flex items-center gap-1 mt-1 text-xs text-foreground/60">
                              <HiClock className="w-3 h-3" />
                              {formatDuration(parseDurationToMinutes(service.duration || "60"))}
                            </div>
                          </div>

                        {service.description && (
                          <p className="text-foreground/70 text-xs mb-3 line-clamp-2 min-h-[32px]">
                            {service.description}
                          </p>
                        )}

                        {/* Action Buttons - responsive: full width on mobile, 50/50 on sm+ */}
                        <div className="flex gap-2 flex-col sm:flex-row mt-auto">
                          {/* View Service Button */}
                          <Button
                            variant="outline"
                            onClick={() => {
                              setSelectedService(service);
                              setShowModal(true);
                            }}
                            className="w-full sm:flex-1 flex items-center justify-center gap-2 h-11 rounded-xl font-medium text-sm transition-all duration-300 min-h-[44px]"
                          >
                            <HiSparkles className="w-3 h-3" />
                            View Service
                          </Button>
                          
                          {/* Add/Remove Service Button */}
                          <Button
                            onClick={() => toggleService(service)}
                            className={`w-full sm:flex-1 flex items-center justify-center gap-2 h-11 rounded-xl font-semibold text-sm transition-all duration-300 bg-gradient-to-r from-primary to-secondary hover:scale-105`}
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
                className="flex flex-col items-center space-y-4 mt-8"
              >
                {/* Results Info */}
                <div className="hidden md:block text-sm text-foreground/60">
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
                <div className="hidden md:flex items-center space-x-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === 1
                        ? "bg-muted text-foreground/40 cursor-not-allowed"
                        : "bg-card text-foreground hover:bg-primary hover:text-white border border-border cursor-pointer"
                    }`}
                  >
                    <HiChevronLeft className="w-4 h-4 mr-1" />
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center space-x-1">
                    {Array.from(
                      { length: Math.min(5, paginationData.last_page) },
                      (_, i) => {
                        const page = i + 1;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
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
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 cursor-pointer ${
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
                    className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      currentPage === paginationData.last_page
                        ? "bg-muted text-foreground/40 cursor-not-allowed"
                        : "bg-card text-foreground hover:bg-primary hover:text-white border border-border cursor-pointer"
                    }`}
                  >
                    Next
                    <HiChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>

                {/* Mobile pagination summary */}
                <div className="md:hidden w-full">
                  <div className="flex items-center justify-between gap-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                        currentPage === 1
                          ? "bg-muted text-foreground/40 cursor-not-allowed"
                          : "bg-card text-foreground hover:bg-primary hover:text-white border border-border"
                      }`}
                      aria-label="Previous page"
                    >
                      <HiChevronLeft className="w-5 h-5" />
                    </button>

                    <div className="text-sm text-foreground/70">
                      <span className="font-medium text-foreground">{currentPage}</span> / {paginationData.last_page}
                    </div>

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === paginationData.last_page}
                      className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${
                        currentPage === paginationData.last_page
                          ? "bg-muted text-foreground/40 cursor-not-allowed"
                          : "bg-card text-foreground hover:bg-primary hover:text-white border border-border"
                      }`}
                      aria-label="Next page"
                    >
                      <HiChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="mt-3 text-center text-xs text-foreground/60">
                    {paginationData.from}–{paginationData.to} of {paginationData.total}
                  </div>
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
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-accent/50 backdrop-blur-md rounded-3xl p-6 border border-border shadow-xl sticky top-8"
          >
            {/* Header */}
    
 
            <div className="flex items-center gap-3 mb-6">
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
                          {formatDuration(parseDurationToMinutes(service.duration))}
                        </p>
                        <p className="text-sm font-bold text-primary">
                          ₹{getDisplayPrice(service)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeService(service.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-1"
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
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-foreground/70">
                      Services:
                    </span>
                    <span className="font-medium text-foreground text-sm">
                      {totalItems}
                    </span>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">
                      Total:
                    </span>
                    <span className="text-xl font-bold text-primary">
                      ₹{getTotalPrice().toLocaleString()}
                    </span>
                  </div> */}
                </div>

                <Button
                  onClick={() => {
                    // Sync cart items to selectedServices before proceeding
                    onServicesChange([...cartItems]);
                    onNext();
                  }}
                  className="w-full bg-primary text-white py-2.5 sm:py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 text-sm"
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
    </div>
  );
};

export default ServiceSelection;
