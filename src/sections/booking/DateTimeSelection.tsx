"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  HiArrowLeft,
  HiArrowRight,
  HiClock,
  HiCalendar,
} from "react-icons/hi2";
import Button from "@/components/ui/Button";
import { TimeSlot } from "@/types/booking";

interface DateTimeSelectionProps {
  selectedDate: string;
  selectedTime: string;
  onDateChange: (date: string) => void;
  onTimeChange: (time: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DateTimeSelection = ({
  selectedDate,
  selectedTime,
  onDateChange,
  onTimeChange,
  onNext,
  onPrev,
}: DateTimeSelectionProps) => {
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  // Generate time slots when component mounts
  useEffect(() => {
    const generateTimeSlots = () => {
      const slots: TimeSlot[] = [];
      const startHour = 8; // 8 AM
      const endHour = 22; // 10 PM

      for (let hour = startHour; hour < endHour; hour++) {
        // Generate hourly slots
        const time24 = `${hour.toString().padStart(2, "0")}:00`;

        // Manual 12-hour conversion to avoid parsing issues
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

        slots.push({
          id: time24,
          time: time12,
          available: Math.random() > 0.2, // Random availability for demo
        });
      }
      return slots;
    };

    setTimeSlots(generateTimeSlots());
  }, []);

  const parseDate = (dateString: string) => {
    return dateString ? new Date(dateString + "T00:00:00") : null;
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return "";

    const date = new Date(dateString + "T00:00:00");
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayString = formatDateForInput(today);
    const tomorrowString = formatDateForInput(tomorrow);

    if (dateString === todayString) {
      return "Today";
    } else if (dateString === tomorrowString) {
      return "Tomorrow";
    } else {
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }
  };

  const selectedDateObj = parseDate(selectedDate);
  const canProceed = selectedDate && selectedTime;

  // Custom DatePicker styles
  const datePickerCustomStyles = `
    .react-datepicker {
      font-family: inherit;
      border: none;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      border-radius: 1rem;
    }
    .react-datepicker__header {
      background: linear-gradient(135deg, var(--primary), var(--secondary));
      border-bottom: none;
      border-radius: 1rem 1rem 0 0;
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
      background: var(--primary);
      color: white;
    }
    .react-datepicker__day--selected {
      background: var(--primary);
      color: white;
    }
    .react-datepicker__day--disabled {
      opacity: 0.3;
    }
  `;

  return (
    <>
      <style jsx global>
        {datePickerCustomStyles}
      </style>

      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Choose Your Perfect Time
          </h2>
          <p className="text-foreground/60 text-lg">
            Select your preferred date and time for your beauty session
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Date Selection - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-primary/10 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                <HiCalendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Select Date
                </h3>
                <p className="text-sm text-foreground/60">
                  Choose from the next 30 days
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <DatePicker
                selected={selectedDateObj}
                onChange={(date: Date | null) => {
                  if (date) {
                    onDateChange(formatDateForInput(date));
                  }
                }}
                minDate={new Date()}
                maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                inline
                calendarClassName="custom-datepicker"
              />
            </div>
          </motion.div>

          {/* Time Selection - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3 bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-primary/10 shadow-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center">
                <HiClock className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-foreground">
                  Available Times
                </h3>
                <p className="text-sm text-foreground/60">
                  {selectedDate
                    ? `Times for ${formatDateDisplay(selectedDate)}`
                    : "Select a date first"}
                </p>
              </div>
            </div>

            {selectedDate ? (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-2">
                {timeSlots.map((slot, index) => (
                  <motion.button
                    key={slot.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    whileHover={{ scale: slot.available ? 1.05 : 1 }}
                    whileTap={{ scale: slot.available ? 0.95 : 1 }}
                    onClick={() => slot.available && onTimeChange(slot.id)}
                    disabled={!slot.available}
                    className={`p-3 rounded-2xl font-semibold text-sm transition-all duration-300 relative overflow-hidden ${
                      selectedTime === slot.id
                        ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg scale-105"
                        : slot.available
                        ? "bg-primary/5 text-primary hover:bg-primary/10 border-2 border-primary/20 hover:border-primary/40"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed border-2 border-gray-200"
                    }`}
                  >
                    {slot.available ? (
                      <span>{slot.time}</span>
                    ) : (
                      <span className="line-through">{slot.time}</span>
                    )}

                    {selectedTime === slot.id && (
                      <motion.div
                        layoutId="selectedTimeIndicator"
                        className="absolute inset-0 bg-white/20 rounded-2xl"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center mb-4">
                  <HiCalendar className="w-12 h-12 text-primary/40" />
                </div>
                <p className="text-foreground/60 text-lg font-medium">
                  Please select a date first
                </p>
                <p className="text-foreground/40 text-sm mt-2">
                  Available time slots will appear here
                </p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Selected Summary */}
        {selectedDate && selectedTime && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-6 text-center"
          >
            <h4 className="font-semibold text-foreground mb-2 text-lg">
              📅 Your Selected Appointment
            </h4>
            <p className="text-2xl font-bold text-primary">
              {formatDateDisplay(selectedDate)} at{" "}
              {timeSlots.find((slot) => slot.id === selectedTime)?.time}
            </p>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center justify-between pt-6"
        >
          <Button
            onClick={onPrev}
            variant="outline"
            className="border-2 border-primary/20 text-primary hover:bg-primary/5 px-8 py-4 rounded-2xl font-semibold flex items-center gap-3 text-lg"
          >
            <HiArrowLeft className="w-5 h-5" />
            Previous Step
          </Button>

          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-3 text-lg"
          >
            Continue to Details
            <HiArrowRight className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </>
  );
};

export default DateTimeSelection;
