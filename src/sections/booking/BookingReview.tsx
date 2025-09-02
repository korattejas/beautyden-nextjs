"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiArrowLeft,
  HiCheckCircle,
  HiCalendar,
  HiClock,
  HiUser,
  HiMapPin,
  HiCreditCard,
} from "react-icons/hi2";
import Button from "@/components/ui/Button";
import { BookingFormData } from "@/types/booking";

interface BookingReviewProps {
  bookingData: BookingFormData;
  onPrev: () => void;
  onConfirm: () => void;
}

const BookingReview = ({
  bookingData,
  onPrev,
  onConfirm,
}: BookingReviewProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentMethod] = useState("pay_after_service"); // For now, only pay after service

  const getTotalPrice = () => {
    return bookingData.services.reduce(
      (total, service) => total + service.price,
      0
    );
  };

  const getTotalDuration = () => {
    // Simple duration calculation - sum all service durations
    return bookingData.services.length * 60; // Assuming 60 minutes per service
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    return new Date(`2000-01-01 ${timeString}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const handleConfirmBooking = async () => {
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      onConfirm();
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Review & Confirm Booking
        </h2>
        <p className="text-foreground/60">
          Please review your booking details before confirming
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Booking Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-primary/10 shadow-lg"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              ✨ Selected Services
            </h3>
            <div className="space-y-4">
              {bookingData.services.map((service, index) => (
                <div
                  key={service.id}
                  className="flex items-center justify-between py-3 border-b border-primary/10 last:border-b-0"
                >
                  <div>
                    <p className="font-semibold text-foreground">
                      {service.name}
                    </p>
                    <p className="text-sm text-foreground/60">
                      {service.category_name} • {service.duration}
                    </p>
                  </div>
                  <p className="font-bold text-foreground">₹{service.price}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Date & Time */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-primary/10 shadow-lg"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <HiCalendar className="w-5 h-5" />
              Appointment Schedule
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <HiCalendar className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Date</p>
                  <p className="font-semibold text-foreground">
                    {formatDate(bookingData.selectedDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <HiClock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-foreground/60">Time</p>
                  <p className="font-semibold text-foreground">
                    {formatTime(bookingData.selectedTime)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Customer Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-primary/10 shadow-lg"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <HiUser className="w-5 h-5" />
              Customer Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-foreground/60 mb-1">Full Name</p>
                <p className="font-semibold text-foreground">
                  {bookingData.firstName} {bookingData.lastName}
                </p>
              </div>
              <div>
                <p className="text-sm text-foreground/60 mb-1">Email</p>
                <p className="font-semibold text-foreground">
                  {bookingData.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-foreground/60 mb-1">Phone</p>
                <p className="font-semibold text-foreground">
                  {bookingData.phone}
                </p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm text-foreground/60 mb-1">
                  Service Address
                </p>
                <p className="font-semibold text-foreground">
                  {bookingData.address}
                </p>
              </div>
              {bookingData.specialNotes && (
                <div className="md:col-span-2">
                  <p className="text-sm text-foreground/60 mb-1">
                    Special Notes
                  </p>
                  <p className="font-semibold text-foreground">
                    {bookingData.specialNotes}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Booking Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-6 border border-primary/20 shadow-lg sticky top-8"
          >
            <h3 className="font-heading text-xl font-bold text-foreground mb-6">
              Booking Summary
            </h3>

            {/* Services Count */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-foreground/70">Services</span>
                <span className="font-semibold text-foreground">
                  {bookingData.services.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/70">Estimated Duration</span>
                <span className="font-semibold text-foreground">
                  {getTotalDuration()} min
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-primary/20 pt-3">
                <span className="text-foreground/70">Subtotal</span>
                <span className="font-semibold text-foreground">
                  ₹{getTotalPrice()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-foreground/70">Service Charge</span>
                <span className="font-semibold text-foreground">₹0</span>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-primary/20 pt-6 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-foreground">
                  Total Amount
                </span>
                <span className="text-2xl font-bold text-primary">
                  ₹{getTotalPrice()}
                </span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 mb-6 border border-primary/10">
              <div className="flex items-center gap-3">
                <HiCreditCard className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-semibold text-foreground">
                    Payment Method
                  </p>
                  <p className="text-sm text-foreground/60">
                    Pay after service completion
                  </p>
                </div>
              </div>
            </div>

            {/* Confirm Button */}
            <Button
              onClick={handleConfirmBooking}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Confirming Booking...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <HiCheckCircle className="w-5 h-5" />
                  Confirm Booking
                </div>
              )}
            </Button>

            <p className="text-xs text-foreground/60 text-center">
              By confirming, you agree to our terms and conditions. You&apos;ll
              receive a confirmation email shortly.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrev}
          variant="outline"
          className="border-2 border-primary/20 text-primary hover:bg-primary/5 px-8 py-3 rounded-full font-semibold flex items-center gap-2"
        >
          <HiArrowLeft className="w-4 h-4" />
          Previous
        </Button>
      </div>
    </div>
  );
};

export default BookingReview;
