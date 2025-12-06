"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  HiArrowLeft,
  HiCalendar,
  HiClock,
  HiUser,
  HiEnvelope,
  HiPhone,
  HiMapPin,
  HiChatBubbleBottomCenterText,
  HiShoppingBag,
  HiXMark,
  HiCheckCircle,
  HiSparkles,
} from "react-icons/hi2";
import Button from "@/components/ui/Button";
import { BookingFormData, TimeSlot } from "@/types/booking";
import { useCart } from "@/contexts/CartContext";
import { useSettings } from "@/hooks/useApi";
import { bookAppointment } from "@/services/booking.service";

const customerSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("First name is required")
    .min(2, "Minimum 2 characters"),
  lastName: yup
    .string()
    .required("Last name is required")
    .min(2, "Minimum 2 characters"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^[0-9]{10}$/, "Phone must be 10 digits"),
  address: yup
    .string()
    .required("Address is required")
    .min(10, "Please provide a complete address"),
  specialNotes: yup.string(),
});

interface BookingDetailsWithCartProps {
  bookingData: BookingFormData;
  updateBookingData: (data: Partial<BookingFormData>) => void;
  onPrev: () => void;
}

const BookingDetailsWithCart = ({
  bookingData,
  updateBookingData,
  onPrev,
}: BookingDetailsWithCartProps) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileModalOpen, setIsMobileModalOpen] = useState(false);
  const router = useRouter();
  const { items: cartItems, clearCart } = useCart();
  const { data: settingsData } = useSettings();
  const settings = settingsData?.data || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(customerSchema),
    defaultValues: {
      firstName: bookingData.firstName,
      lastName: bookingData.lastName,
      email: bookingData.email,
      phone: bookingData.phone,
      address: bookingData.address,
      specialNotes: bookingData.specialNotes,
    },
    mode: "onChange",
  });

  const getSetting = (key: string) => {
    return settings.find((setting: any) => setting.key === key)?.value || "";
  };

  const advanceBookingDays = (() => {
    const raw = (getSetting("advance_book_day") || "")
      .toString()
      .replace(/[^\d]/g, "");
    const parsed = parseInt(raw, 10);
    return Number.isNaN(parsed) ? 2 : parsed;
  })();

  const phoneNumber = getSetting("phone_number");

  const parseNumberFromSetting = (
    value: string | number | undefined,
    fallback = 0
  ) => {
    if (value === undefined || value === null) return fallback;
    const cleaned = value.toString().replace(/[^\d.]/g, "");
    const parsed = parseFloat(cleaned);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

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

  // Date handling
  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const parseSelectedDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  // Set default date to tomorrow
  useEffect(() => {
    if (!bookingData.selectedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowString = formatDateToString(tomorrow);
      updateBookingData({ selectedDate: tomorrowString });
    }
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isMobileModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileModalOpen]);

  // Generate time slots
  useEffect(() => {
    if (bookingData.selectedDate) {
      const generateTimeSlots = () => {
        const slots: TimeSlot[] = [];
        const startHour = 8;
        const endHour = 22;
        const selectedDateObj = parseSelectedDate(bookingData.selectedDate);
        const today = new Date();
        const isToday =
          selectedDateObj &&
          selectedDateObj.toDateString() === today.toDateString();

        for (let hour = startHour; hour < endHour; hour++) {
          const time24 = `${hour.toString().padStart(2, "0")}:00`;
          let hour12 = hour;
          let ampm = "AM";

          if (hour === 0) {
            hour12 = 12;
          } else if (hour === 12) {
            hour12 = 12;
            ampm = "PM";
          } else if (hour > 12) {
            hour12 = hour - 12;
            ampm = "PM";
          }

          const time12 = `${hour12}:00 ${ampm}`;
          let available = true;
          if (isToday) {
            const currentHour = today.getHours();
            available = hour > currentHour;
          }

          slots.push({ id: time24, time: time12, available });
        }
        return slots;
      };
      setTimeSlots(generateTimeSlots());
    }
  }, [bookingData.selectedDate]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const dateString = formatDateToString(date);
      updateBookingData({ selectedDate: dateString, selectedTime: "" });
    }
  };

  const selectedDateObj = parseSelectedDate(bookingData.selectedDate);

  // Price calculations
  const getMinPrice = (priceString: string): number => {
    if (!priceString) return 0;
    const priceMatch = priceString.match(/(\d+)/);
    return priceMatch ? parseInt(priceMatch[1]) : 0;
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, service) => {
      const price = service.price || service.discount_price || "0";
      return total + getMinPrice(price);
    }, 0);
  };

  const getTotalDuration = () => {
    return cartItems.reduce((total, service) => {
      const duration = parseInt(service.duration) || 60;
      return total + duration;
    }, 0);
  };

  const baseTotalPrice = getTotalPrice();
  const specialOfferDiscountAmount = getSpecialOfferDiscount(baseTotalPrice);
  const payableAfterSpecialOffer = Math.max(
    baseTotalPrice - specialOfferDiscountAmount,
    0
  );

  const minOrderAmount = parseFloat(getSetting("min_order_amount") || "0");
  // Use final payable amount (after special offer) for minimum order check
  const effectiveTotalForMin = payableAfterSpecialOffer;
  const isBelowMinOrder = effectiveTotalForMin < minOrderAmount;

  const canProceed =
    bookingData.selectedDate &&
    bookingData.selectedTime &&
    cartItems.length > 0;

  const formatTime = (timeString: string) => {
    if (!timeString) return "";
    const slot = timeSlots.find((s) => s.id === timeString);
    return slot?.time || timeString;
  };

  const formatDateForDisplay = (dateString: string) => {
    if (!dateString) return "";
    const date = parseSelectedDate(dateString);
    if (!date) return "";
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getDateDisplayText = () => {
    if (bookingData.selectedDate) {
      return formatDateForDisplay(bookingData.selectedDate);
    }
    return "Select Date";
  };

  const getTimeDisplayText = () => {
    if (bookingData.selectedTime) {
      return formatTime(bookingData.selectedTime);
    }
    return "Select Time";
  };

  const onSubmit = async (data: any) => {
    if (!canProceed) {
      alert("Please select date and time");
      return;
    }

    setIsSubmitting(true);
    try {
      const serviceIds = cartItems.map((service) => service.id).join(",");
      const serviceCategoryId = cartItems[0]?.category_id || "1";
      const totalPrice = payableAfterSpecialOffer;

      const payload = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
        service_category_id: serviceCategoryId,
        service_id: serviceIds,
        appointment_date: bookingData.selectedDate,
        appointment_time: bookingData.selectedTime,
        notes: data.specialNotes || "",
        quantity: cartItems.length,
        price: totalPrice,
        discount_price:
          specialOfferDiscountAmount > 0
            ? specialOfferDiscountAmount
            : undefined,
        special_offer_discount:
          specialOfferDiscountAmount > 0
            ? specialOfferDiscountAmount
            : undefined,
        service_address: data.address,
        service_sub_category_id: undefined,
      };

      const response = await bookAppointment(payload);
      clearCart();

      let orderNumber = "Unknown";
      if (response?.data?.order_number) {
        orderNumber = response.data.order_number;
      } else if (response?.data?.appointment?.order_number) {
        orderNumber = response.data.appointment.order_number;
      }

      const message =
        "Booking successful! We'll contact you shortly to confirm your appointment.";
      router.push(
        `/thank-you?orderNumber=${encodeURIComponent(
          orderNumber
        )}&message=${encodeURIComponent(message)}`
      );
    } catch (error: any) {
      console.error("Booking error:", error);
      let errorMessage = "Failed to book appointment. Please try again.";
      if (error?.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      }
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 max-w-7xl mx-auto px-4">
      {/* Left - Date, Time & Customer Info */}
      <main className="lg:col-span-8 space-y-6">
        {/* Date & Time Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-4 border border-gray-200"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Select Date & Time
          </h2>

          {/* Mobile: Date & Time Input Fields */}
          <div className="md:hidden mb-4">
            <label className="block text-sm font-semibold text-gray-900 mb-3">
              Select Date & Time
            </label>
            <div className="grid grid-cols-2 gap-3">
              {/* Date Box */}
              <button
                type="button"
                onClick={() => setIsMobileModalOpen(true)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition-all flex flex-col"
              >
                <div className="flex items-center gap-2 mb-1">
                  <HiCalendar className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium">Date</span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    bookingData.selectedDate
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {getDateDisplayText()}
                </span>
              </button>

              {/* Time Box */}
              <button
                type="button"
                onClick={() => setIsMobileModalOpen(true)}
                className="px-4 py-3 border border-gray-300 rounded-lg text-left bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black transition-all flex flex-col"
              >
                <div className="flex items-center gap-2 mb-1">
                  <HiClock className="w-4 h-4 text-gray-400" />
                  <span className="text-xs text-gray-500 font-medium">Time</span>
                </div>
                <span
                  className={`text-sm font-medium ${
                    bookingData.selectedTime
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {getTimeDisplayText()}
                </span>
              </button>
            </div>
          </div>

          {/* Desktop: Inline Date Picker & Time Slots */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date Picker */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                <HiCalendar className="inline w-4 h-4 mr-2" />
                Select Date
              </label>
              <DatePicker
                selected={selectedDateObj}
                onChange={handleDateChange}
                minDate={(() => {
                  const tomorrow = new Date();
                  tomorrow.setDate(tomorrow.getDate() + 1);
                  return tomorrow;
                })()}
                inline
                dateFormat="yyyy-MM-dd"
                className="w-full"
              />
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                <HiClock className="inline w-4 h-4 mr-2" />
                Select Time
              </label>
              {bookingData.selectedDate ? (
                <div className="grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() =>
                        slot.available &&
                        updateBookingData({ selectedTime: slot.id })
                      }
                      disabled={!slot.available}
                      className={`p-2 rounded-lg text-xs font-medium transition-all ${
                        bookingData.selectedTime === slot.id
                          ? "bg-black text-white"
                          : slot.available
                          ? "bg-gray-100 text-gray-900 hover:bg-gray-200"
                          : "bg-gray-50 text-gray-400 cursor-not-allowed"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  Please select a date first
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Mobile Date & Time Modal */}
        <AnimatePresence>
          {isMobileModalOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden"
                onClick={() => setIsMobileModalOpen(false)}
              />

              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[90vh] overflow-hidden md:hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                  <h3 className="text-lg font-bold text-gray-900">
                    Select Date & Time
                  </h3>
                  <button
                    onClick={() => setIsMobileModalOpen(false)}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Close"
                  >
                    <HiXMark className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Modal Content */}
                <div className="overflow-y-auto max-h-[calc(90vh-80px)] px-6 py-4 space-y-6">
                  {/* Date Picker Section */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      <HiCalendar className="inline w-4 h-4 mr-2" />
                      Select Date
                    </label>
                    <DatePicker
                      selected={selectedDateObj}
                      onChange={handleDateChange}
                      minDate={(() => {
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        return tomorrow;
                      })()}
                      inline
                      dateFormat="yyyy-MM-dd"
                      className="w-full"
                    />
                  </div>

                  {/* Time Slots Section */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-3">
                      <HiClock className="inline w-4 h-4 mr-2" />
                      Select Time
                    </label>
                    {bookingData.selectedDate ? (
                      <div className="grid grid-cols-3 gap-2 max-h-[250px] overflow-y-auto">
                        {timeSlots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => {
                              if (slot.available) {
                                updateBookingData({ selectedTime: slot.id });
                                // Auto-close modal after selection
                                setTimeout(() => {
                                  setIsMobileModalOpen(false);
                                }, 300);
                              }
                            }}
                            disabled={!slot.available}
                            className={`p-3 rounded-lg text-sm font-medium transition-all ${
                              bookingData.selectedTime === slot.id
                                ? "bg-black text-white"
                                : slot.available
                                ? "bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300"
                                : "bg-gray-50 text-gray-400 cursor-not-allowed"
                            }`}
                          >
                            {slot.time}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-500 text-center">
                          Please select a date first
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Selected Info Display */}
                  {bookingData.selectedDate && bookingData.selectedTime && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-blue-50 rounded-lg p-4 border border-blue-200"
                    >
                      <p className="text-xs font-semibold text-blue-900 mb-2">
                        Selected Appointment
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <HiCalendar className="w-4 h-4 text-blue-600" />
                          <span>{formatDateForDisplay(bookingData.selectedDate)}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-700">
                          <HiClock className="w-4 h-4 text-blue-600" />
                          <span>{formatTime(bookingData.selectedTime)}</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Done Button */}
                  <div className="sticky bottom-0 bg-white pt-4 pb-2 border-t border-gray-200 -mx-6 px-6">
                    <Button
                      onClick={() => setIsMobileModalOpen(false)}
                      className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium"
                    >
                      Done
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Customer Information Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-2xl p-4 border border-gray-200 space-y-4"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Your Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                First Name *
              </label>
              <div className="relative">
                <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("firstName")}
                  type="text"
                  className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="John"
                  onChange={(e) =>
                    updateBookingData({ firstName: e.target.value })
                  }
                />
              </div>
              {errors.firstName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Last Name *
              </label>
              <div className="relative">
                <HiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("lastName")}
                  type="text"
                  className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Doe"
                  onChange={(e) =>
                    updateBookingData({ lastName: e.target.value })
                  }
                />
              </div>
              {errors.lastName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email *
              </label>
              <div className="relative">
                <HiEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("email")}
                  type="email"
                  className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="john@example.com"
                  onChange={(e) => updateBookingData({ email: e.target.value })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone *
              </label>
              <div className="relative">
                <HiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  {...register("phone")}
                  type="tel"
                  className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="9876543210"
                  onChange={(e) => updateBookingData({ phone: e.target.value })}
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Service Address *
            </label>
            <div className="relative">
              <HiMapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                {...register("address")}
                rows={3}
                className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your complete address"
                onChange={(e) => updateBookingData({ address: e.target.value })}
              />
            </div>
            {errors.address && (
              <p className="text-red-500 text-xs mt-1">
                {errors.address.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Special Notes (Optional)
            </label>
            <div className="relative">
              <HiChatBubbleBottomCenterText className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
              <textarea
                {...register("specialNotes")}
                rows={2}
                className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
                placeholder="Any specific requirements..."
                onChange={(e) =>
                  updateBookingData({ specialNotes: e.target.value })
                }
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onPrev}
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2.5 rounded-lg font-medium flex items-center gap-2"
            >
              <HiArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </div>
        </motion.form>
      </main>

      {/* Right Sidebar - Sticky Cart with Book Now */}
      <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:h-[calc(100vh-7rem)] overflow-y-scroll">
        <div className="bg-white rounded-2xl p-4 border border-gray-200">
          <div className="flex items-center gap-2 mb-4">
            <HiShoppingBag className="w-5 h-5" />
            <h3 className="font-semibold text-gray-900">Booking Summary</h3>
          </div>

          {/* Services */}
          <div className="space-y-2 mb-4 max-h-[220px] overflow-y-auto">
            {cartItems.map((service) => {
              const formatPrice = (value?: string | number) => {
                if (!value) return "0";
                const match = value
                  .toString()
                  .replace(/,/g, "")
                  .match(/(\d+(\.\d+)?)/);
                const num = match ? parseFloat(match[1]) : 0;
                return num.toLocaleString();
              };

              const hasDiscount =
                service.discount_price && service.discount_price !== service.price;

              return (
                <div
                  key={service.id}
                  className="flex items-start gap-2 p-2 bg-gray-50 rounded-lg"
                >
                  <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center flex-shrink-0">
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
                      <div className="w-6 h-6 rounded-full bg-gray-200" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">
                      {service.name}
                    </p>
                    <p className="text-xs text-gray-500">{service.duration}</p>
                    <div className="mt-1 text-sm font-semibold text-gray-900 flex items-end gap-1">
                      {service.discount_price ? (
                        <>
                          <span>
                            ₹{formatPrice(service.price || service.discount_price)}
                          </span>
                          {hasDiscount && (
                            <span className="text-xs text-gray-400 line-through">
                              ₹{formatPrice(service.discount_price)}
                            </span>
                          )}
                        </>
                      ) : (
                        <span>
                          ₹
                          {formatPrice(
                            service.price || service.discount_price || "0"
                          )}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Selected Date & Time */}
          {bookingData.selectedDate && bookingData.selectedTime && (
            <div className="bg-blue-50 rounded-lg p-3 mb-4 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <HiCalendar className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">
                  {bookingData.selectedDate}
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <HiClock className="w-4 h-4 text-blue-600" />
                <span className="text-gray-700">
                  {formatTime(bookingData.selectedTime)}
                </span>
              </div>
            </div>
          )}

          {/* Advance Booking Message (same as Services Your Cart) */}
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

          {/* Price Summary */}
          <div className="border-t border-gray-200 pt-3 space-y-2 mb-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">
                ₹{baseTotalPrice.toLocaleString()}
              </span>
            </div>
            {specialOfferDiscountAmount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Special Offer</span>
                <span>-₹{specialOfferDiscountAmount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-bold pt-2 border-t">
              <span>Total</span>
              <span>₹{payableAfterSpecialOffer.toLocaleString()}</span>
            </div>
          </div>

          {/* Order Amount Discount Text */}
          {getSetting("order_amount_discount_text") && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 mt-1 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200"
            >
              <p className="text-sm font-medium text-gray-900 text-center">
                {getSetting("order_amount_discount_text")}
              </p>
            </motion.div>
          )}

          {/* Minimum Order Amount Message */}
          {isBelowMinOrder && minOrderAmount > 0 && (
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
                    Add ₹
                    {(minOrderAmount - effectiveTotalForMin).toLocaleString()} more
                    to proceed.
                  </span>
                </span>
              </p>
            </motion.div>
          )}

          {/* Book Now Button */}
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={!canProceed || isSubmitting || isBelowMinOrder}
            className="w-full bg-black hover:bg-gray-800 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Booking...
              </>
            ) : (
              <>
                <HiCheckCircle className="w-5 h-5" />
                Book Now
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center mt-3">
            Payment after service completion
          </p>
        </div>
      </aside>

      {/* DatePicker Styles */}
      <style jsx global>{`
        .react-datepicker {
          font-family: inherit;
          border: 1px solid #e5e7eb;
          border-radius: 0.75rem;
        }
        .react-datepicker__header {
          background: #000;
          border-bottom: none;
          border-radius: 0.75rem 0.75rem 0 0;
          padding: 1rem;
        }
        .react-datepicker__current-month,
        .react-datepicker__day-name {
          color: white;
          font-weight: 600;
        }
        .react-datepicker__day {
          border-radius: 0.5rem;
          margin: 2px;
          transition: all 0.2s;
        }
        .react-datepicker__day:hover {
          background: #000;
          color: white;
        }
        .react-datepicker__day--selected {
          background: #000;
          color: white;
          font-weight: bold;
        }
        .react-datepicker__day--disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default BookingDetailsWithCart;

