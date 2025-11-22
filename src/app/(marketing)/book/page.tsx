"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/ui/Container";
import { BookingFormData } from "@/types/booking";
import { motion } from "framer-motion";

import { useCart } from "@/contexts/CartContext";
import ServiceSelectionWithCart from "@/sections/booking/new/ServiceSelectionWithCart";
import BookingDetailsWithCart from "@/sections/booking/new/BookingDetailsWithCart";

const BookingPageContent = () => {
  const { items, addItem, removeItem } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState<BookingFormData>({
    services: [],
    selectedDate: "",
    selectedTime: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    specialNotes: "",
  });

  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  const categoryId = searchParams.get("category");
  const subcategoryId = searchParams.get("subcategory");

  // Initialize bookingData.services from cart items
  const [hasInitialized, setHasInitialized] = useState(false);
  useEffect(() => {
    if (
      !hasInitialized &&
      items.length > 0 &&
      bookingData.services.length === 0
    ) {
      updateBookingData({ services: items });
      setHasInitialized(true);
    }
  }, [items, hasInitialized, bookingData.services.length]);

  const updateBookingData = (data: Partial<BookingFormData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelectionWithCart
            selectedServices={bookingData.services}
            onServicesChange={(services) => {
              updateBookingData({ services });
              const newIds = new Set(services.map((s) => s.id));
              const oldIds = new Set(items.map((i) => i.id));
              services.forEach((s) => {
                if (!oldIds.has(s.id)) {
                  addItem(s);
                }
              });
              items.forEach((i) => {
                if (!newIds.has(i.id)) {
                  removeItem(i.id);
                }
              });
            }}
            onNext={nextStep}
            preSelectedServiceId={serviceId}
            preSelectedCategoryId={categoryId}
            preSelectedSubCategoryId={subcategoryId}
            bookingData={bookingData}
          />
        );
      case 2:
        return (
          <BookingDetailsWithCart
            bookingData={bookingData}
            updateBookingData={updateBookingData}
            onPrev={prevStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="pt-24 pb-8 bg-white border-b">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900"
            >
              Book Your Beauty Service
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-base text-gray-600 mt-3"
            >
              Step {currentStep} of 2:{" "}
              {currentStep === 1 ? "Select Services" : "Booking Details"}
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Step Content */}
      <section className="py-6">{renderStep()}</section>
    </div>
  );
};

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-gray-200 border-t-black rounded-full animate-spin" />
        </div>
      }
    >
      <BookingPageContent />
    </Suspense>
  );
}
