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
      <div className="max-w-6xl mx-auto">
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
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
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

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="bg-white/60 backdrop-blur-md rounded-3xl p-6 border border-primary/10 shadow-lg"
      >
        <h3 className="font-semibold text-foreground mb-4 text-center">
          Filter by Category
        </h3>
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setSelectedCategories([])}
            className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              selectedCategories.length === 0
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                : "bg-white/80 text-foreground/70 hover:text-primary hover:bg-primary/5 border border-primary/10"
            }`}
          >
            <HiSparkles className="w-4 h-4" />
            All Services
          </button>

          {categories.map((category, index) => (
            <motion.button
              key={`category-${category.id}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => toggleCategory(category.id.toString())}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategories.includes(category.id.toString())
                  ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                  : "bg-white/80 text-foreground/70 hover:text-primary hover:bg-primary/5 border border-primary/10"
              }`}
            >
              {category.icon && (
                <div className="w-4 h-4 rounded-full overflow-hidden">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={16}
                    height={16}
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
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {filteredServices.map((service, index) => {
            const isSelected = selectedServices.find(
              (s) => s.id === service.id.toString()
            );

            return (
              <motion.div
                key={`service-${service.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className={`group bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border-2 ${
                  isSelected
                    ? "border-primary shadow-primary/20 ring-2 ring-primary/20"
                    : "border-primary/10 hover:border-primary/30"
                }`}
              >
                {/* Service Image */}
                {service.icon && (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={service.icon}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      unoptimized
                    />
                    {isSelected && (
                      <div className="absolute top-4 right-4 bg-primary text-white rounded-full p-2">
                        <HiSparkles className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                )}

                {/* Service Details */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-heading text-lg font-bold text-foreground mb-1 line-clamp-2">
                        {service.name}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          <HiTag className="w-3 h-3" />
                          {service.category_name}
                        </span>
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xl font-bold text-primary">
                        ₹{Number(service.price).toLocaleString()}
                      </p>
                      <div className="flex items-center gap-1 text-xs text-foreground/60">
                        <HiClock className="w-3 h-3" />
                        {service.duration || "60 min"}
                      </div>
                    </div>
                  </div>

                  {service.description && (
                    <p className="text-foreground/70 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {service.description}
                    </p>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleService(service)}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      isSelected
                        ? "bg-primary text-white hover:bg-primary/90 shadow-md"
                        : "bg-primary/10 text-primary hover:bg-primary/20"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <HiMinus className="w-4 h-4" />
                        Remove Service
                      </>
                    ) : (
                      <>
                        <HiPlus className="w-4 h-4" />
                        Add Service
                      </>
                    )}
                  </motion.button>
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
          className="text-center py-16"
        >
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            No services found
          </h3>
          <p className="text-foreground/60">
            Try selecting different categories or clear your filters.
          </p>
        </motion.div>
      )}

      {/* Selected Services Summary */}
      <AnimatePresence>
        {selectedServices.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-r from-primary/5 to-secondary/5 backdrop-blur-md rounded-3xl p-8 border border-primary/20 shadow-xl"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-2xl font-bold text-foreground">
                Selected Services ({selectedServices.length})
              </h3>
              <div className="text-right">
                <p className="text-sm text-foreground/60">Estimated Duration</p>
                <p className="font-semibold text-foreground">
                  {getTotalDuration()} minutes
                </p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              {selectedServices.map((service, index) => (
                <motion.div
                  key={`selected-${service.id}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center justify-between bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-primary/10"
                >
                  <div className="flex items-center gap-4">
                    {service.icon && (
                      <div className="w-12 h-12 rounded-xl overflow-hidden">
                        <Image
                          src={service.icon}
                          alt={service.name}
                          width={48}
                          height={48}
                          className="object-cover w-full h-full"
                          unoptimized
                        />
                      </div>
                    )}
                    <div>
                      <p className="font-semibold text-foreground">
                        {service.name}
                      </p>
                      <p className="text-sm text-foreground/60">
                        {service.duration}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-foreground">
                      ₹{Number(service.price).toLocaleString()}
                    </p>
                    <button
                      onClick={() =>
                        toggleService({
                          id: service.id,
                          price: service.price.toString(),
                          ...service,
                        })
                      }
                      className="text-xs text-red-500 hover:text-red-700 transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-primary/20">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Total Amount</p>
                <p className="text-3xl font-bold text-primary">
                  ₹{getTotalPrice().toLocaleString()}
                </p>
              </div>

              <Button
                onClick={onNext}
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 text-lg"
              >
                Continue to Date & Time
                <HiArrowRight className="w-5 h-5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No services selected message */}
      {selectedServices.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 bg-white/40 backdrop-blur-sm rounded-3xl border border-primary/10"
        >
          <div className="text-4xl mb-4">💄</div>
          <p className="text-foreground/60 text-lg font-medium">
            Select at least one service to continue
          </p>
          <p className="text-foreground/40 text-sm mt-2">
            Choose from our professional beauty treatments above
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default ServiceSelection;
