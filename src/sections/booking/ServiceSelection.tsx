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
} from "react-icons/hi2";
import { useServices, useServiceCategories } from "@/hooks/useApi";
import { BookingService } from "@/types/booking";
import Button from "@/components/ui/Button";

interface ServiceSelectionProps {
  selectedServices: BookingService[];
  onServicesChange: (services: BookingService[]) => void;
  onNext: () => void;
  preSelectedServiceId?: string | null;
}

const ServiceSelection = ({
  selectedServices,
  onServicesChange,
  onNext,
  preSelectedServiceId,
}: ServiceSelectionProps) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { data: servicesData, isLoading: servicesLoading } = useServices();
  const { data: categoriesData, isLoading: categoriesLoading } =
    useServiceCategories();

  const services = servicesData?.data ?? [];
  const categories = categoriesData?.data ?? [];

  // Pre-select service if coming from service page
  useEffect(() => {
    if (preSelectedServiceId && services.length > 0) {
      const preSelectedService = services.find(
        (s) => s.id.toString() === preSelectedServiceId
      );
      if (
        preSelectedService &&
        !selectedServices.find((s) => s.id === preSelectedService.id.toString())
      ) {
        const bookingService: BookingService = {
          id: preSelectedService.id.toString(),
          name: preSelectedService.name,
          price: parseFloat(preSelectedService.price || "0"),
          duration: preSelectedService.duration || "60 min",
          category_id: preSelectedService.category_id.toString(),
          category_name: preSelectedService.category_name,
          description: preSelectedService.description,
          icon: preSelectedService.icon,
        };
        onServicesChange([...selectedServices, bookingService]);
      }
    }
  }, [preSelectedServiceId, services, selectedServices, onServicesChange]);

  // Filter services based on selected categories
  const filteredServices =
    selectedCategories.length > 0
      ? services.filter((service) =>
          selectedCategories.includes(service.category_id.toString())
        )
      : services;

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleService = (service: any) => {
    const bookingService: BookingService = {
      id: service.id.toString(),
      name: service.name,
      price: parseFloat(service.price || "0"),
      duration: service.duration || "60 min",
      category_id: service.category_id.toString(),
      category_name: service.category_name,
      description: service.description,
      icon: service.icon,
    };

    const isSelected = selectedServices.find((s) => s.id === bookingService.id);

    if (isSelected) {
      onServicesChange(
        selectedServices.filter((s) => s.id !== bookingService.id)
      );
    } else {
      onServicesChange([...selectedServices, bookingService]);
    }
  };

  const removeService = (serviceId: string) => {
    onServicesChange(selectedServices.filter((s) => s.id !== serviceId));
  };

  const getTotalPrice = () => {
    return selectedServices.reduce(
      (total, service) => total + Number(service.price),
      0
    );
  };

  const getTotalDuration = () => {
    return selectedServices.reduce((total, service) => {
      const duration = parseInt(service.duration) || 60;
      return total + duration;
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
          {/* Category Filters */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-primary/10 shadow-lg"
          >
            <h3 className="font-semibold text-foreground mb-4">
              Filter by Category
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategories([])}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                  selectedCategories.length === 0
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                    : "bg-white/80 text-foreground/70 hover:text-primary hover:bg-primary/5 border border-primary/10"
                }`}
              >
                <HiSparkles className="w-3 h-3" />
                All Services
              </button>

              {categories.map((category, index) => (
                <motion.button
                  key={`category-${category.id}`}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => toggleCategory(category.id.toString())}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 text-sm ${
                    selectedCategories.includes(category.id.toString())
                      ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                      : "bg-white/80 text-foreground/70 hover:text-primary hover:bg-primary/5 border border-primary/10"
                  }`}
                >
                  {category.icon && (
                    <div className="w-3 h-3 rounded-full overflow-hidden">
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={12}
                        height={12}
                        className="object-cover w-full h-full"
                        unoptimized
                      />
                    </div>
                  )}
                  {category.name}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Services Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategories.join(",")}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filteredServices.map((service, index) => {
                const isSelected = selectedServices.find(
                  (s) => s.id === service.id.toString()
                );

                return (
                  <motion.div
                    key={`service-${service.id}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className={`bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border-2 ${
                      isSelected
                        ? "border-primary shadow-primary/20"
                        : "border-primary/10 hover:border-primary/30"
                    }`}
                  >
                    {/* Service Image */}
                    {service.icon && (
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={service.icon}
                          alt={service.name}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          className="object-cover"
                          unoptimized
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-1">
                            <HiSparkles className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    )}

                    {/* Service Details */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1 text-sm line-clamp-2">
                            {service.name}
                          </h3>
                          <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            <HiTag className="w-2 h-2" />
                            {service.category_name}
                          </span>
                        </div>
                        <div className="text-right ml-2">
                          <p className="text-lg font-bold text-primary">
                            ₹{Number(service.price).toLocaleString()}
                          </p>
                          <div className="flex items-center gap-1 text-xs text-foreground/60">
                            <HiClock className="w-2 h-2" />
                            {service.duration || "60 min"}
                          </div>
                        </div>
                      </div>

                      {service.description && (
                        <p className="text-foreground/70 text-xs mb-3 line-clamp-2">
                          {service.description}
                        </p>
                      )}

                      <button
                        onClick={() => toggleService(service)}
                        className={`w-full flex items-center justify-center gap-2 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                          isSelected
                            ? "bg-primary text-white hover:bg-primary/90"
                            : "bg-primary/10 text-primary hover:bg-primary/20"
                        }`}
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
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Empty State */}
          {filteredServices.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                No services found
              </h3>
              <p className="text-foreground/60 text-sm">
                Try selecting different categories or clear your filters.
              </p>
            </motion.div>
          )}
        </div>

        {/* Right Section - Selected Services & Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-primary/5 to-secondary/5 backdrop-blur-md rounded-3xl p-6 border border-primary/20 shadow-xl sticky top-8"
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
                  {selectedServices.length} service
                  {selectedServices.length !== 1 ? "s" : ""} selected
                </p>
              </div>
            </div>

            {/* Selected Services */}
            {selectedServices.length > 0 ? (
              <div className="space-y-4 mb-6">
                <AnimatePresence>
                  {selectedServices.map((service, index) => (
                    <motion.div
                      key={`selected-${service.id}`}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-3 border border-primary/10"
                    >
                      {service.icon && (
                        <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
                          <Image
                            src={service.icon}
                            alt={service.name}
                            width={40}
                            height={40}
                            className="object-cover w-full h-full"
                            unoptimized
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground text-sm truncate">
                          {service.name}
                        </p>
                        <p className="text-xs text-foreground/60">
                          {service.duration}
                        </p>
                        <p className="text-sm font-bold text-primary">
                          ₹{Number(service.price).toLocaleString()}
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
            {selectedServices.length > 0 && (
              <>
                <div className="border-t border-primary/20 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-foreground/70">
                      Duration:
                    </span>
                    <span className="font-medium text-foreground text-sm">
                      {getTotalDuration()} min
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-foreground/70">
                      Services:
                    </span>
                    <span className="font-medium text-foreground text-sm">
                      {selectedServices.length}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-foreground">
                      Total:
                    </span>
                    <span className="text-xl font-bold text-primary">
                      ₹{getTotalPrice().toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={onNext}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Continue to Date & Time
                  <HiArrowRight className="w-4 h-4" />
                </Button>
              </>
            )}

            {selectedServices.length === 0 && (
              <div className="text-center">
                <p className="text-foreground/60 text-sm mb-4">
                  Select services to continue
                </p>
                <div className="w-full bg-gray-200 py-3 rounded-2xl font-medium text-gray-500 cursor-not-allowed">
                  Continue to Date & Time
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelection;
