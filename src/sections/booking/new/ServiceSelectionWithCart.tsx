"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  HiMagnifyingGlass,
  HiXMark,
  HiPlus,
  HiMinus,
  HiShoppingBag,
  HiArrowRight,
  HiSparkles,
  HiClock,
  HiPhoto,
  HiInformationCircle,
  HiPhone,
  HiStar,
  HiTag,
} from "react-icons/hi2";
import { useServices, useServiceCategories, useSettings } from "@/hooks/useApi";
import { BookingService, BookingFormData } from "@/types/booking";
import Button from "@/components/ui/Button";
import { useCart } from "@/contexts/CartContext";
import SeasonWiseBanner from "@/components/banner/SeasonWiseBanner";

const FALLBACK_IMAGE = "/images/services/beauty-default.jpg";

const getNumericPrice = (value?: string | number): number => {
  if (!value) return 0;
  const cleaned = value
    .toString()
    .replace(/,/g, "")
    .match(/(\d+(\.\d+)?)/);
  return cleaned ? parseFloat(cleaned[1]) : 0;
};

const getDiscountInfo = (service: any) => {
  // Match discount logic with Services page:
  // - discount_price = original price
  // - price = discounted/current price
  const original = getNumericPrice(service.discount_price);
  const current = getNumericPrice(service.price);

  if (!original || !current || original <= current) {
    return { original, current, amount: 0, percent: 0 };
  }

  const amount = Math.max(original - current, 0);

  // Show the same percentage style as Services page:
  // what % of original price the customer is paying
  const percent =
    original > 0 && current > 0
      ? Math.floor((current / original) * 100)
      : 0;

  return { original, current, amount, percent };
};

interface ServiceSelectionWithCartProps {
  selectedServices: BookingService[];
  onServicesChange: (services: BookingService[]) => void;
  onNext: () => void;
  preSelectedServiceId?: string | null;
  preSelectedCategoryId?: string | null;
  preSelectedSubCategoryId?: string | null;
  bookingData: BookingFormData;
}

// Mobile Cart Drawer Component
const MobileCartDrawer = ({
  isOpen,
  onClose,
  cartItems,
  removeItem,
  getTotalPrice,
  getTotalDuration,
  formatDuration,
  specialOfferDiscountAmount,
  payableAfterSpecialOffer,
  specialOfferLabel,
  onNext,
  selectedServices,
  onServicesChange,
  orderAmountDiscountText,
  minOrderAmount,
  cartTotal,
  advanceBookingDays,
  phoneNumber,
}: any) => {
  const getMinPrice = (priceString: string): number => {
    if (!priceString) return 0;
    const priceMatch = priceString.match(/(\d+)/);
    return priceMatch ? parseInt(priceMatch[1]) : 0;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
          />
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 max-h-[80vh] overflow-y-auto lg:hidden shadow-2xl"
          >
            <div className="p-4">
              {/* Handle */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />

              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <HiShoppingBag className="w-6 h-6" />
                  <h3 className="font-bold text-lg">Your Cart</h3>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <HiXMark className="w-6 h-6" />
                </button>
              </div>

              {cartItems.length === 0 ? (
                <div className="text-center py-12">
                  <HiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No services selected</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 mb-4">
                    {cartItems.map((service: any) => (
                      <div
                        key={service.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                      >
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                          {service.icon ? (
                            <Image
                              src={service.icon}
                              alt={service.name}
                              width={56}
                              height={56}
                              className="object-cover w-full h-full"
                              unoptimized
                            />
                          ) : (
                            <HiSparkles className="w-6 h-6 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-900 truncate">
                            {service.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {service.duration}
                          </p>
                          <div className="text-sm font-semibold text-gray-900 mt-1">
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
                                <span className="text-xs text-gray-400 line-through">
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
                          onClick={() => {
                            removeItem(service.id);
                            const updatedServices = selectedServices.filter(
                              (s: any) => s.id !== service.id
                            );
                            onServicesChange(updatedServices);
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                        >
                          <HiXMark className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3 mb-4">
                    <div className="flex justify-between text-base">
                      <span className="text-gray-600">Duration</span>
                      <span className="font-semibold">
                        {formatDuration(getTotalDuration())}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm">Approx Total</span>
                      <span className="font-medium text-base">
                        ₹{getTotalPrice().toLocaleString()}
                      </span>
                    </div>
                    {specialOfferDiscountAmount > 0 && (
                      <div className="flex justify-between">
                        <span className="text-green-700 text-sm font-medium">
                          Special Offer ({specialOfferLabel || "Discount"})
                        </span>
                        <span className="text-green-700 text-sm font-semibold">
                          -₹{specialOfferDiscountAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-900 font-bold text-base">
                        Estimated Payable
                      </span>
                      <span className="font-bold text-lg">
                        ₹{payableAfterSpecialOffer.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Advance Booking Message (same as desktop cart) */}
                  {phoneNumber && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-200"
                    >
                      <p className="text-xs text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-900">
                          Please book in {advanceBookingDays}{" "}
                          {advanceBookingDays === 1 ? "day" : "days"} advance
                        </span>
                        <>
                          {" "}and if urgent then call{" "}
                          <a
                            href={`tel:${phoneNumber}`}
                            className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
                          >
                            <HiClock className="w-3 h-3" />
                            {phoneNumber}
                          </a>
                        </>
                      </p>
                    </motion.div>
                  )}

                  {/* Order Amount Discount Text */}
                  {orderAmountDiscountText && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
                    >
                      <p className="text-sm font-medium text-gray-900 text-center">
                        {orderAmountDiscountText}
                      </p>
                    </motion.div>
                  )}

                  {/* Minimum Order Amount Message */}
                  {(() => {
                    const minOrder = parseFloat(minOrderAmount || "0");
                    const totalPrice = cartTotal;
                    const isDisabled = totalPrice < minOrder;

                    return isDisabled && minOrder > 0 ? (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200"
                      >
                        <p className="text-sm font-medium text-amber-800 flex items-start gap-2">
                          <HiSparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>
                            Minimum ₹{minOrder.toLocaleString()} order required.
                            <span className="block mt-1 text-amber-700 font-normal">
                              Add ₹
                              {(minOrder - totalPrice).toLocaleString()} more to
                              proceed.
                            </span>
                          </span>
                        </p>
                      </motion.div>
                    ) : null;
                  })()}

                  <Button
                    onClick={() => {
                      onNext();
                      onClose();
                    }}
                    disabled={(() => {
                      const minOrder = parseFloat(minOrderAmount || "0");
                      return cartTotal < minOrder;
                    })()}
                    className="w-full bg-black hover:bg-gray-800 text-white py-3.5 rounded-xl font-semibold text-base flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to Booking
                    <HiArrowRight className="w-5 h-5" />
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Service Modal Component
const ServiceModal = ({
  service,
  onClose,
  isInCart,
  onToggle,
  priceLabel,
}: any) => {
  const [imgError, setImgError] = useState(false);
  const discountInfo = getDiscountInfo(service);
  const displayPrice = service.price || service.discount_price || "0";
  const hasOriginal = Boolean(
    service.discount_price && service.discount_price !== service.price
  );
  const subcategoryLabel =
    service.subcategory_name || service.subcategory?.name || "";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end lg:items-center justify-center p-0 lg:p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-t-3xl lg:rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Image */}
        <div className="relative h-64 lg:h-80 bg-gray-100 flex items-center justify-center px-4 py-4 overflow-hidden">
          {service.icon && !imgError ? (
            <Image
              src={service.icon}
              alt={service.name}
              fill
              className="object-contain"
              onError={() => setImgError(true)}
              unoptimized
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <HiPhoto className="w-16 h-16 text-gray-300" />
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-100"
          >
            <HiXMark className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 lg:p-6 space-y-4">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-2">
              {service.name}
            </h2>
            {service.is_popular === 1 && (
              <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full mb-2">
                <HiSparkles className="w-3 h-3 text-amber-500" />
                Popular
              </div>
            )}
            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <HiClock className="w-4 h-4" />
                <span>{service.duration || "60 min"}</span>
              </div>
              <span className="text-gray-400">•</span>
              <span className="font-medium">{service.category_name}</span>
              {subcategoryLabel && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{subcategoryLabel}</span>
                </>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="space-y-2 border-y border-gray-200 py-4">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-500">
                {priceLabel || "Starting from"}
              </span>
              <span className="text-2xl lg:text-3xl font-bold text-gray-900">
                ₹{displayPrice}
              </span>
              {hasOriginal && (
                <span className="text-lg text-gray-400 line-through">
                  ₹{service.discount_price}
                </span>
              )}
            </div>
            {discountInfo.percent > 0 && (
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-green-700 mt-1">
                <HiTag className="w-3 h-3" />
                <span>{discountInfo.percent}% OFF</span>
                <span className="text-green-600">
                  Save ₹{discountInfo.amount.toLocaleString()}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Category
              </p>
              <p className="font-medium text-gray-900">
                {service.category_name || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Subcategory
              </p>
              <p className="font-medium text-gray-900">
                {subcategoryLabel || "—"}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Duration
              </p>
              <p className="font-medium text-gray-900">
                {service.duration || "60 min"}
              </p>
            </div>
            {(service.rating !== undefined && service.rating !== null) && (
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Rating
                </p>
                <p className="flex items-center gap-1 font-medium text-gray-900">
                  <HiStar className="w-4 h-4 text-yellow-400" />
                  {service.rating}
                </p>
              </div>
            )}
            {service.reviews !== undefined && (
              <div>
                <p className="text-xs uppercase tracking-wide text-gray-500">
                  Reviews
                </p>
                <p className="font-medium text-gray-900">
                  {service.reviews}
                </p>
              </div>
            )}
          </div>

          {/* Description */}
          {service.description && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                {service.description}
              </p>
            </div>
          )}

          {/* Includes */}
          {service.includes && service.includes.length > 0 && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Includes</h3>
              <div className="flex flex-wrap gap-2">
                {service.includes.map((inc: any, index: number) => (
                  <span
                    key={index}
                    className="bg-primary/10 text-primary text-xs px-2 py-1 sm:px-3 sm:py-1 rounded-full font-medium"
                  >
                    {inc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={onToggle}
              className={`flex-1 py-3 rounded-xl font-semibold text-base flex items-center justify-center gap-2 ${isInCart
                  ? "bg-red-50 text-red-600 hover:bg-red-100"
                  : "bg-black text-white hover:bg-gray-800"
                }`}
            >
              {isInCart ? (
                <>
                  <HiMinus className="w-5 h-5" />
                  Remove from Cart
                </>
              ) : (
                <>
                  <HiPlus className="w-5 h-5" />
                  Add to Cart
                </>
              )}
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServiceSelectionWithCart = ({
  selectedServices,
  onServicesChange,
  onNext,
  preSelectedServiceId,
  preSelectedCategoryId,
  preSelectedSubCategoryId,
  bookingData,
}: ServiceSelectionWithCartProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [hasAppliedCategoryPreset, setHasAppliedCategoryPreset] =
    useState(false);
  const [hasAppliedServicePreset, setHasAppliedServicePreset] = useState(false);

  const { items: cartItems, addItem, removeItem } = useCart();
  const { data: settingsData } = useSettings();
  const settings = settingsData?.data || [];

  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    return settings.find((setting: any) => setting.key === key)?.value || "";
  };

  const priceStartText = getSetting("service_price_start_text") || "From";

  const parseNumberFromSetting = (
    value: string | number | undefined,
    fallback = 0
  ) => {
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

  // Build filters
  const filters = {
    page: currentPage,
    ...(selectedCategory !== "all" && { category_id: selectedCategory }),
    ...(selectedSubCategory && { subcategory_id: selectedSubCategory }),
    ...(searchQuery && { search: searchQuery }),
  };

  const { data: servicesData, isLoading: servicesLoading } =
    useServices(filters);
  const { data: categoriesData, isLoading: categoriesLoading } =
    useServiceCategories();

  const services = servicesData?.data?.data ?? [];
  const categories = categoriesData?.data ?? [];
  useEffect(() => {
    if (selectedCategory === "all") {
      setIsCategoryDropdownOpen(false);
      return;
    }
    const selectedCat = categories.find(
      (cat: any) => cat.id.toString() === selectedCategory
    );
    setIsCategoryDropdownOpen(Boolean(selectedCat?.subcategories?.length));
  }, [selectedCategory, categories]);

  // Apply pre-selected category/subcategory from URL/search params once data is ready
  useEffect(() => {
    if (hasAppliedCategoryPreset) return;
    const catId = preSelectedCategoryId?.toString();
    if (!catId) return;

    const matchedCategory = categories.find(
      (cat: any) => cat.id.toString() === catId
    );
    if (!matchedCategory) return;

    setSelectedCategory(catId);
    setIsCategoryDropdownOpen(Boolean(matchedCategory?.subcategories?.length));

    const subId = preSelectedSubCategoryId?.toString();
    if (subId) {
      const hasSub = matchedCategory?.subcategories?.some(
        (sub: any) => sub.id?.toString() === subId
      );
      if (hasSub) {
        setSelectedSubCategory(subId);
      }
    }
    setHasAppliedCategoryPreset(true);
  }, [
    categories,
    preSelectedCategoryId,
    preSelectedSubCategoryId,
    hasAppliedCategoryPreset,
  ]);

  // Apply pre-selected service from URL/search params (only add if not already in cart)
  useEffect(() => {
    if (hasAppliedServicePreset || !preSelectedServiceId) return;
    const match = services.find(
      (svc: any) => svc.id?.toString() === preSelectedServiceId.toString()
    );
    if (!match) return;
    const alreadyInCart = cartItems.some(
      (item) => item.id === preSelectedServiceId.toString()
    );
    if (!alreadyInCart) {
      toggleService(match);
    }
    setHasAppliedServicePreset(true);
  }, [
    cartItems,
    services,
    preSelectedServiceId,
    hasAppliedServicePreset,
  ]);
  const paginationData = servicesData?.data;

  // Get subcategories for selected category
  const getSubCategories = () => {
    if (selectedCategory === "all") return [];
    const category = categories.find(
      (cat: any) => cat.id.toString() === selectedCategory
    );
    return category?.subcategories || [];
  };

  const subCategories = getSubCategories();
  const handleCategorySelection = (category?: any) => {
    if (!category) {
      setSelectedCategory("all");
      setSelectedSubCategory(null);
      setIsCategoryDropdownOpen(false);
      return;
    }

    const catId = category.id.toString();
    const hasSubcategories = (category.subcategories?.length || 0) > 0;

    if (selectedCategory === catId) {
      setIsCategoryDropdownOpen((prev) =>
        hasSubcategories ? !prev : false
      );
      return;
    }

    setSelectedCategory(catId);
    setSelectedSubCategory(null);
    setIsCategoryDropdownOpen(hasSubcategories);
  };

  const toggleService = (service: any) => {
    const bookingService: BookingService = {
      id: service.id.toString(),
      name: service.name,
      price: service.price || "0",
      duration: service.duration || "60 min",
      category_id: service.category_id?.toString() || "1",
      category_name: service.category_name || "",
      description: service.description || "",
      icon: service.icon,
      discount_price: service?.discount_price,
    };

    const isSelected = cartItems.find((s) => s.id === bookingService.id);
    if (isSelected) {
      removeItem(bookingService.id);
      const updatedServices = selectedServices.filter(
        (s) => s.id !== bookingService.id
      );
      onServicesChange(updatedServices);
    } else {
      addItem(bookingService);
      const updatedServices = [...selectedServices, bookingService];
      onServicesChange(updatedServices);
    }
  };

  const getMinPrice = (priceString: string): number => {
    if (!priceString) return 0;
    const priceMatch = priceString.match(/(\d+)/);
    return priceMatch ? parseInt(priceMatch[1]) : 0;
  };

  const getNumericPrice = (value?: string | number): number => {
    if (!value) return 0;
    const cleaned = value.toString().replace(/,/g, "");
    const priceMatch = cleaned.match(/(\d+(\.\d+)?)/);
    return priceMatch ? parseFloat(priceMatch[1]) : 0;
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, service) => {
      const price = service.price || service.discount_price || "0";
      return total + getMinPrice(price);
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

  // Helper function to get display price (use current price if available, otherwise fallback to discount/original price)
  const getDisplayPrice = (service: BookingService): string => {
    return service.price || service.discount_price || "0";
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
  const minOrderAmount = parseFloat(getSetting("min_order_amount") || "0");
  const phoneNumber = getSetting("phone_number");

  if (servicesLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <>
      {/* Season Wise Banner */}
      <SeasonWiseBanner />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Mobile Header - Sticky Search & Categories */}
        <div className="lg:hidden sticky top-16 bg-white z-30 pb-4 -mx-4 px-4 border-b">
          {/* Search */}
          <div className="relative mb-3">
            <HiMagnifyingGlass className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
              >
                <HiXMark className="w-5 h-5 text-gray-400" />
              </button>
            )}
          </div>

          {/* Horizontal Scrolling Categories */}
          <div className="overflow-x-auto -mx-4 px-4 pb-2 scrollbar-hide">
            <div className="flex gap-2 min-w-max">
              <button
                onClick={() => handleCategorySelection()}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === "all"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-700"
                  }`}
              >
                All
              </button>
              {categories.map((category: any) => (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelection(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === category.id.toString()
                      ? "bg-black text-white"
                      : "bg-gray-100 text-gray-700"
                    }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Subcategories - Show BELOW selected category */}
          {subCategories.length > 0 && selectedCategory !== "all" && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="mt-3 overflow-x-auto -mx-4 px-4 pb-1 scrollbar-hide"
            >
              <div className="flex gap-2 min-w-max">
                <button
                  onClick={() => setSelectedSubCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border-2 transition-all duration-200 ${!selectedSubCategory
                      ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white border-gray-900 shadow-md scale-105"
                      : "bg-white text-gray-700 border-gray-300 hover:border-gray-500 hover:shadow-sm"
                    }`}
                >
                  All
                </button>
                {subCategories.map((subCat: any) => (
                  <button
                    key={subCat.id}
                    onClick={() => setSelectedSubCategory(subCat.id.toString())}
                    className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap border-2 transition-all duration-200 flex items-center gap-2 ${selectedSubCategory === subCat.id.toString()
                        ? "bg-gradient-to-r from-gray-900 to-gray-700 text-white border-gray-900 shadow-md scale-105"
                        : "bg-white text-gray-700 border-gray-300 hover:border-gray-500 hover:shadow-sm"
                      }`}
                  >
                    {/* {subCat.icon && (
                      <div className="w-5 h-5 rounded-full overflow-hidden flex items-center justify-center">
                        <Image
                          src={subCat.icon}
                          alt={subCat.name}
                          width={20}
                          height={20}
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )} */}
                    {subCat.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Desktop + Mobile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 lg:pt-0">
          {/* Desktop Left Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto lg-overflow-x-hidden">
            <div className="bg-white rounded-2xl p-5 border border-gray-200 space-y-6">
            

              {/* Category Grid */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900">
                    Select a service
                  </h3>
                  {/* <span className="text-xs text-gray-400">Desktop view</span> */}
                </div>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
                  <button
                    onClick={() => handleCategorySelection()}
                    className={`rounded-2xl p-3 flex flex-col items-center gap-2 transition-all ${
                      selectedCategory === "all"
                        ? " "
                        : " "
                    }`}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center text-sm font-semibold">
                      All
                    </div>
                    {/* <span className="text-sm font-medium text-center">
                      All Services
                    </span> */}
                  </button>
                  {categories.map((category: any) => {
                    const catId = category.id.toString();
                    const isActiveCategory = selectedCategory === catId;
                    return (
                      <div key={catId} className="col-span-1 relative">
                        <button
                          onClick={() => handleCategorySelection(category)}
                          className={`rounded-2xl p-2 flex flex-col items-center gap-2 transition-all text-center w-full`}
                        >
                          <div className={`w-16 h-16 rounded-2xl bg-gray-50 overflow-hidden flex items-center justify-center border-2 transition-all ${
                            isActiveCategory
                              ? "border-black shadow-md"
                              : "border-transparent"
                          }`}>
                            {category.icon ? (
                              <Image
                                src={category.icon}
                                alt={category.name}
                                width={64}
                                height={64}
                                className="object-cover w-full h-full"
                                unoptimized
                              />
                            ) : (
                              <HiSparkles className="w-8 h-8 text-gray-300" />
                            )}
                          </div>
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                        </button>
{isActiveCategory && category.subcategories?.length > 0 && (
  <motion.div
    initial={{ opacity: 0, height: 0 }}
    animate={{ opacity: 1, height: "auto" }}
    exit={{ opacity: 0, height: 0 }}
    transition={{ duration: 0.25 }}
    className="w-100 mt-3"
  >
    <div className="bg-gray-50 rounded-2xl border border-gray-200 p-4">
      <div className="grid grid-cols-2 gap-3">
        
        {/* All option */}
        <button
          onClick={() => setSelectedSubCategory(null)}
          className={`rounded-xl p-3 text-sm font-semibold transition ${
            !selectedSubCategory
              ? "bg-black text-white"
              : "bg-white border border-gray-300 hover:border-black"
          }`}
        >
          All {category.name}
        </button>

        {category.subcategories.map((subCat: any) => {
          const active = selectedSubCategory === subCat.id.toString();

          return (
            <button
              key={subCat.id}
              onClick={() => setSelectedSubCategory(subCat.id.toString())}
              className={`rounded-xl p-3 text-sm font-semibold transition flex items-center gap-2 ${
                active
                  ? "bg-black text-white"
                  : "bg-white border border-gray-300 hover:border-black"
              }`}
            >
              {subCat.icon && (
                <Image
                  src={subCat.icon}
                  alt={subCat.name}
                  width={20}
                  height={20}
                  className="rounded"
                  unoptimized
                />
              )}
              {subCat.name}
            </button>
          );
        })}
      </div>
    </div>
  </motion.div>
)}


                      </div>
                    );
                  })}
                </div>

       
              </div>

              {/* Subcategory section removed - now shown inline below each category */}
            </div>
          </aside>

          {/* Center - Services Grid */}
          <main className="lg:col-span-6 pb-24 lg:pb-0">
            <div className="space-y-4">
              {/* Results count */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {services.length}{" "}
                  {services.length === 1 ? "service" : "services"} found
                </p>
              </div>

              {services.length === 0 ? (
                <div className="text-center py-16">
                  <HiSparkles className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 text-lg font-medium">
                    No services found
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Try adjusting your filters
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {services.map((service: any) => {
                    const isSelected = cartItems.find(
                      (s) => s.id === service.id.toString()
                    );
                    const discountInfo = getDiscountInfo(service);
                    const hasDiscount = discountInfo.percent > 0;
                    const displayPrice =
                      service.price || service.discount_price || "0";
                    const showOriginal =
                      service.discount_price &&
                      service.discount_price !== service.price;
                    return (
                      <motion.div
                        key={service.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`bg-white rounded-2xl border-2 overflow-hidden transition-all hover:shadow-lg flex flex-col sm:flex-row gap-4 p-4 ${isSelected
                            ? "border-black shadow-md"
                            : "border-gray-200"
                          }`}
                      >
                        {/* Left content */}
                        <div className="flex-1 flex flex-col gap-3">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-xs uppercase tracking-wide font-medium">
                                {service.category_name}
                              </p>
                              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 leading-snug">
                                {service.name}
                              </h3>
                            </div>
                            {isSelected && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-black text-white">
                                ✓&nbsp;Added
                              </span>
                            )}
                          </div>

                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                            <span className="inline-flex items-center gap-1">
                              <HiStar className="w-4 h-4 text-yellow-400" />
                              <span className="font-semibold text-gray-900">
                                {service.rating || "N/A"}
                              </span>
                              {service.reviews && (
                                <span className="text-gray-500">
                                  ({service.reviews} reviews)
                                </span>
                              )}
                            </span>
                            <span className="text-gray-300">•</span>
                            <span className="inline-flex items-center gap-1">
                              <HiClock className="w-4 h-4" />
                              {service.duration || "60 min"}
                            </span>
                            {service.subcategory_name && (
                              <>
                                <span className="text-gray-300">•</span>
                                <span>{service.subcategory_name}</span>
                              </>
                            )}
                          </div>

                          <div>
                            <p className="text-xs uppercase tracking-wide text-gray-500">
                              {priceStartText}
                            </p>
                            <div className="flex flex-wrap items-baseline gap-2">
                              <span className="text-2xl font-bold text-gray-900">
                                ₹{displayPrice}
                              </span>
                              {showOriginal && (
                                <span className="text-base text-gray-400 line-through">
                                  ₹{service.discount_price}
                                </span>
                              )}
                            </div>
                            {hasDiscount && (
                              <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold text-green-700 bg-green-50">
                                <HiTag className="w-3.5 h-3.5" />
                                {discountInfo.percent}% OFF • Save ₹
                                {discountInfo.amount.toLocaleString()}
                              </div>
                            )}
                          </div>

                          {service.description && (
                            <p className="text-sm text-gray-600 line-clamp-1">
                              {service.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-3 pt-2">
                            <button
                              onClick={() => setSelectedService(service)}
                              className="inline-flex items-center gap-1 text-sm font-semibold transition-colors pb-1"
                            >
                            <span className="border-b-2 border-gray-300 hover:border-black">View details</span>
                              <HiInformationCircle className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Right column */}
                        <div className="sm:w-50 flex flex-col gap-3">
                          <div
                            className="relative w-full h-40 sm:h-full min-h-[180px] rounded-2xl overflow-hidden bg-gray-100 cursor-pointer"
                            onClick={() => setSelectedService(service)}
                          >
                            {service.icon ? (
                              <Image
                                src={service.icon}
                                alt={service.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                <HiSparkles className="w-10 h-10 text-gray-300" />
                              </div>
                            )}
                          </div>

                          <button
                            onClick={() => toggleService(service)}
                            className={`w-full py-2.5 rounded-xl text-sm font-semibold border transition-all ${isSelected
                                ? " border-black hover:bg-gray-800 hover:text-white"
                                : "border-black-200 text-black-700 hover:bg-black-50"
                              }`}
                          >
                            {isSelected ? "Remove from Cart" : "Add"}
                          </button>

                          {/* <p className="text-xs text-center text-gray-500">
                            {service.category_name}
                          </p> */}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}

              {/* Pagination */}
              {paginationData && paginationData.last_page > 1 && (
                <div className="flex justify-center gap-2 pt-6">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <span className="px-5 py-2.5 text-sm text-gray-600 flex items-center">
                    Page {currentPage} of {paginationData.last_page}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage((p) =>
                        Math.min(paginationData.last_page, p + 1)
                      )
                    }
                    disabled={currentPage === paginationData.last_page}
                    className="px-5 py-2.5 rounded-lg border border-gray-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </main>

          {/* Desktop Right Sidebar - Sticky Cart */}
          <aside className="hidden lg:block lg:col-span-3 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] overflow-y-scroll">
            <div className="bg-white rounded-2xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-4">
                <HiShoppingBag className="w-5 h-5" />
                <h3 className="font-semibold text-gray-900">Your Cart</h3>
                <span className="ml-auto text-sm text-gray-500">
                  {cartItems.length}
                </span>
              </div>

              {/* Advance Booking Message */}
              {getSetting("phone_number") && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-xl bg-blue-50 border border-blue-200"
                >
                  <p className="text-xs text-gray-700 leading-relaxed">
                    <span className="font-semibold text-gray-900">
                      Please book in {advanceBookingDays}{" "}
                      {advanceBookingDays === 1 ? "day" : "days"} advance
                    </span>
                    {getSetting("phone_number") && (
                      <>
                        {" "}and if urgent then call{" "}
                        <a
                          href={`tel:${getSetting("phone_number")}`}
                          className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1"
                        >
                          <HiClock className="w-3 h-3" />
                          {getSetting("phone_number")}
                        </a>
                      </>
                    )}
                  </p>
                </motion.div>
              )}

              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <HiShoppingBag className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                  <p className="text-gray-500 text-sm">No services selected</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Add services to continue
                  </p>
                </div>
              ) : (
                <div className="space-y-3 mb-4 overflow-y-auto">
                  {cartItems.map((service) => (
                    <div
                      key={service.id}
                      className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg"
                    >
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                        {service.icon ? (
                          <Image
                            src={service.icon}
                            alt={service.name}
                            width={48}
                            height={48}
                            className="object-cover w-full h-full"
                            unoptimized
                          />
                        ) : (
                          <HiSparkles className="w-5 h-5 text-gray-400" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 truncate">
                          {service.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {service.duration}
                        </p>
                        <div className="text-sm font-semibold text-gray-900 mt-1">
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
                              <span className="text-xs text-gray-400 line-through">
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
                        onClick={() => {
                          removeItem(service.id);
                          const updatedServices = selectedServices.filter(
                            (s) => s.id !== service.id
                          );
                          onServicesChange(updatedServices);
                        }}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <HiXMark className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {cartItems.length > 0 && (
                <>
                  <div className="border-t border-gray-200 pt-3 space-y-2 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        Duration:
                      </span>
                      <span className="font-medium text-gray-900 text-sm">
                        {formatDuration(getTotalDuration())}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        Approx Total:
                      </span>
                      <span className="font-medium text-gray-900 text-sm">
                        ₹{cartTotal.toLocaleString()}
                      </span>
                    </div>
                    {specialOfferDiscountAmount > 0 && (
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-green-700">
                          Special Offer ({specialOfferLabel || `${specialOfferPercentage}%`})
                        </span>
                        <span className="text-sm font-semibold text-green-700">
                          -₹{specialOfferDiscountAmount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">
                        Services:
                      </span>
                      <span className="font-medium text-gray-900 text-sm">
                        {cartItems.length}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                      <span className="font-semibold text-gray-900">
                        Estimated Payable:
                      </span>
                      <span className="text-xl font-bold text-gray-900">
                        ₹{payableAfterSpecialOffer.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Order Amount Discount Text */}
                  {getSetting("order_amount_discount_text") && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
                    >
                      <p className="text-sm font-medium text-gray-900 text-center">
                        {getSetting("order_amount_discount_text")}
                      </p>
                    </motion.div>
                  )}

                  {/* Minimum Order Amount Message */}
                  {(() => {
                    const minOrderAmount = parseFloat(
                      getSetting("min_order_amount") || "0"
                    );
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
                            Minimum ₹{minOrderAmount.toLocaleString()} order
                            required.
                            <span className="block mt-1 text-amber-700 font-normal">
                              Add ₹
                              {(minOrderAmount - totalPrice).toLocaleString()}{" "}
                              more to proceed.
                            </span>
                          </span>
                        </p>
                      </motion.div>
                    ) : null;
                  })()}

                  <Button
                    onClick={onNext}
                    disabled={(() => {
                      const minOrderAmount = parseFloat(
                        getSetting("min_order_amount") || "0"
                      );
                      const totalPrice = cartTotal;
                      return totalPrice < minOrderAmount;
                    })()}
                    className="w-full bg-black hover:bg-gray-800 text-white py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                    <HiArrowRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
          </aside>
        </div>

        {/* Mobile Fixed Bottom Cart Button */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 z-30 shadow-lg">
          {cartItems.length > 0 ? (
            <div className="flex gap-2">
              <button
                onClick={() => setIsCartDrawerOpen(true)}
                className="flex-1 flex items-center justify-between bg-gray-100 px-3 py-2.5 rounded-lg font-semibold text-sm"
              >
                <div className="flex items-center gap-2">
                  <HiShoppingBag className="w-5 h-5" />
                  <span>{cartItems.length} items</span>
                </div>
                <span className="text-base">
                  ₹{getTotalPrice().toLocaleString()}
                </span>
              </button>
              <Button
                onClick={onNext}
                className="bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-lg font-semibold text-sm flex items-center gap-2"
              >
                Next
                <HiArrowRight className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center py-2">
              <p className="text-sm text-gray-500">Add services to continue</p>
            </div>
          )}
        </div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
            isInCart={
              !!cartItems.find((s) => s.id === selectedService.id.toString())
            }
            onToggle={() => {
              toggleService(selectedService);
              setSelectedService(null);
            }}
            priceLabel={priceStartText}
          />
        )}
      </AnimatePresence>

      {/* Mobile Cart Drawer */}
      <MobileCartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        removeItem={removeItem}
        getTotalPrice={getTotalPrice}
        getTotalDuration={getTotalDuration}
        formatDuration={formatDuration}
        specialOfferDiscountAmount={specialOfferDiscountAmount}
        payableAfterSpecialOffer={payableAfterSpecialOffer}
        specialOfferLabel={specialOfferLabel}
        onNext={onNext}
        selectedServices={selectedServices}
        onServicesChange={onServicesChange}
        orderAmountDiscountText={getSetting("order_amount_discount_text")}
        minOrderAmount={minOrderAmount}
        cartTotal={cartTotal}
        advanceBookingDays={advanceBookingDays}
        phoneNumber={phoneNumber}
      />

      {/* Custom styles for subcategory UI */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        /* Custom scrollbar for subcategory dropdown */
        .scrollbar-thin::-webkit-scrollbar {
          width: 6px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #f3f4f6;
          border-radius: 10px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
          transition: background 0.2s;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
        .scrollbar-thin {
          scrollbar-width: thin;
          scrollbar-color: #d1d5db #f3f4f6;
        }
      `}</style>
    </>
  );
};

export default ServiceSelectionWithCart;

