"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Container from "@/components/ui/Container";

import { BookingFormData, BookingService } from "@/types/booking";
import { motion } from "framer-motion";
import ServiceSelection from "@/sections/booking/ServiceSelection";
import DateTimeSelection from "@/sections/booking/DateTimeSelection";
import CustomerInformation from "@/sections/booking/CustomerInformation";
import BookingReview from "@/sections/booking/BookingReview";
import BookingStepper from "@/sections/booking/BookingStepper";
import { useCart } from "@/contexts/CartContext";

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

  // Initialize bookingData.services from cart items on mount (only once)
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

  const steps = [
    {
      id: 1,
      title: "Select Services",
      description: "Choose your beauty services",
    },
    { id: 2, title: "Date & Time", description: "Pick your preferred slot" },
    { id: 3, title: "Your Information", description: "Enter your details" },
    { id: 4, title: "Review & Book", description: "Confirm your booking" },
  ];

  const updateBookingData = (data: Partial<BookingFormData>) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  console.log("bookingData----->>>", bookingData);
  console.log("bookingData.services----->>>", bookingData.services);
  console.log(
    "bookingData.services.length----->>>",
    bookingData.services?.length
  );
  console.log("cart items----->>>", items);
  console.log("cart items.length----->>>", items?.length);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            selectedServices={bookingData.services}
            onServicesChange={(services) => {
              // sync to local booking state immediately
              updateBookingData({ services });
              // sync to global cart immediately
              const newIds = new Set(services.map((s) => s.id));
              const oldIds = new Set(items.map((i) => i.id));
              // add new services immediately
              services.forEach((s) => {
                if (!oldIds.has(s.id)) {
                  addItem(s);
                }
              });
              // remove deselected services immediately
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
          />
        );
      case 2:
        return (
          <DateTimeSelection
            selectedDate={bookingData.selectedDate}
            selectedTime={bookingData.selectedTime}
            onDateChange={(selectedDate) => updateBookingData({ selectedDate })}
            onTimeChange={(selectedTime) => updateBookingData({ selectedTime })}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 3:
        return (
          <CustomerInformation
            formData={bookingData}
            onDataChange={updateBookingData}
            onNext={nextStep}
            onPrev={prevStep}
          />
        );
      case 4:
        return (
          <BookingReview
            bookingData={bookingData}
            onPrev={prevStep}
            onConfirm={() => {
              // Handle booking confirmation
              console.log("Booking confirmed:", bookingData);
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 overflow-x-hidden">
      {/* Header */}
      <section className="pt-28 pb-20 bg-white">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="font-heading text-4xl md:text-6xl font-semibold text-gray-900 tracking-tight"
            >
              Book Your
              <span className="block mt-2 bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">
                Beauty Service
              </span>
            </motion.h1>

            {/* Apple-style thin gradient line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[2px] w-24 mx-auto mt-4 bg-gradient-to-r from-gray-900/80 to-gray-400/60 rounded-full"
            />

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg md:text-xl text-gray-600 mt-6"
            >
              Professional beauty services delivered to your doorstep.
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Stepper */}
      <section className="py-4 sm:py-6 md:py-8">
        <Container>
          <BookingStepper steps={steps} currentStep={currentStep} />
        </Container>
      </section>

      {/* Step Content */}
      <section className="pb-20">
        <Container>{renderStep()}</Container>
      </section>
    </div>
  );
};

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
