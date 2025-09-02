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

const BookingPageContent = () => {
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

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <ServiceSelection
            selectedServices={bookingData.services}
            onServicesChange={(services) => updateBookingData({ services })}
            onNext={nextStep}
            preSelectedServiceId={serviceId}
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
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <section className="pt-24 pb-12 bg-gradient-to-br from-primary/10 to-secondary/10">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
            >
              <span className="text-foreground">Book Your</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Beauty Service
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-foreground/70"
            >
              Professional beauty services delivered to your doorstep
            </motion.p>
          </div>
        </Container>
      </section>

      {/* Stepper */}
      <section className="py-8">
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
