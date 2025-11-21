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
} from "react-icons/hi2";
import { useServices, useServiceCategories, useSettings } from "@/hooks/useApi";
import { BookingService, BookingFormData } from "@/types/booking";
import Button from "@/components/ui/Button";
import { useCart } from "@/contexts/CartContext";

const FALLBACK_IMAGE = "/images/services/beauty-default.jpg";

interface ServiceSelectionWithCartProps {
  selectedServices: BookingService[];
  onServicesChange: (services: BookingService[]) => void;
  onNext: () => void;
  preSelectedServiceId?: string | null;
  preSelectedCategoryId?: string | null;
  preSelectedSubCategoryId?: string | null;
  bookingData: BookingFormData;
}

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

  const { items: cartItems, addItem, removeItem } = useCart();
  const { data: settingsData } = useSettings();
  const settings = settingsData?.data || [];

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
  const paginationData = servicesData?.data;

  const getSetting = (key: string) => {
    return settings.find((setting: any) => setting.key === key)?.value || "";
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

  const getTotalPrice = () => {
    return cartItems.reduce((total, service) => {
      const price = service.discount_price || service.price;
      return total + getMinPrice(price);
    }, 0);
  };

  const getTotalDuration = () => {
    return cartItems.reduce((total, service) => {
      const duration = parseInt(service.duration) || 60;
      return total + duration;
    }, 0);
  };

  if (servicesLoading || categoriesLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 border-gray-200 border-t-black rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto px-4">
      {/* Left Sidebar - Sticky Categories & Search */}
      <aside className="lg:col-span-3 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto">
        <div className="bg-white rounded-2xl p-4 border border-gray-200 space-y-4">
          {/* Search */}
          <div className="relative">
            <HiMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                <HiXMark className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Categories
            </h3>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedSubCategory(null);
                }}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  selectedCategory === "all"
                    ? "bg-black text-white"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                All Services
              </button>
              {categories.map((category: any) => (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.id.toString());
                    setSelectedSubCategory(null);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    selectedCategory === category.id.toString()
                      ? "bg-black text-white"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Center - Services Grid */}
      <main className="lg:col-span-6">
        <div className="space-y-4">
          {services.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No services found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {services.map((service: any) => {
                const isSelected = cartItems.find(
                  (s) => s.id === service.id.toString()
                );
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${
                      isSelected
                        ? "border-black shadow-lg"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {/* Smaller Image */}
                    <div className="relative h-32 bg-gray-100">
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
                          <HiSparkles className="w-8 h-8 text-gray-300" />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-1">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                        <HiClock className="w-3 h-3" />
                        <span>{service.duration || "60 min"}</span>
                      </div>
                      <div className="flex items-baseline gap-1 mb-3">
                        <span className="text-xs text-gray-500">From</span>
                        <span className="text-lg font-bold text-gray-900">
                          ₹{service.price || service.discount_price}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleService(service)}
                        className={`w-full py-2 px-3 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
                          isSelected
                            ? "bg-black text-white"
                            : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                        }`}
                      >
                        {isSelected ? (
                          <>
                            <HiMinus className="w-4 h-4" />
                            Remove
                          </>
                        ) : (
                          <>
                            <HiPlus className="w-4 h-4" />
                            Add
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      {/* Right Sidebar - Sticky Cart */}
      <aside className="lg:col-span-3 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)]">
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <HiShoppingBag className="w-5 h-5" />
            <h3 className="font-semibold text-gray-900">Your Cart</h3>
            <span className="ml-auto text-sm text-gray-500">
              {cartItems.length} {cartItems.length === 1 ? "item" : "items"}
            </span>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-sm">No services selected</p>
            </div>
          ) : (
            <div className="space-y-3 mb-4 max-h-[300px] overflow-y-auto">
              {cartItems.map((service) => (
                <div
                  key={service.id}
                  className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">
                      {service.name}
                    </p>
                    <p className="text-xs text-gray-500">{service.duration}</p>
                  </div>
                  <button
                    onClick={() => {
                      removeItem(service.id);
                      const updatedServices = selectedServices.filter(
                        (s) => s.id !== service.id
                      );
                      onServicesChange(updatedServices);
                    }}
                    className="text-gray-400 hover:text-red-500"
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
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{getTotalDuration()} min</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Total</span>
                  <span className="font-bold text-lg">
                    ₹{getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>

              <Button
                onClick={onNext}
                disabled={cartItems.length === 0}
                className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
              >
                Continue
                <HiArrowRight className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </aside>
    </div>
  );
};

export default ServiceSelectionWithCart;
