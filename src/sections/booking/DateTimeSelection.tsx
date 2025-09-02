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
  HiSparkles,
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
          available: true,
          //   available: Math.random() > 0.2,
        });
      }
      return slots;
    };

    setTimeSlots(generateTimeSlots());
  }, []);

  // Fixed date parsing and formatting functions
  const parseSelectedDate = (dateString: string): Date | null => {
    if (!dateString) return null;
    // Create date in local timezone to avoid timezone issues
    const [year, month, day] = dateString.split("-").map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed
  };

  const formatDateToString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return "";

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const todayString = formatDateToString(today);
    const tomorrowString = formatDateToString(tomorrow);

    if (dateString === todayString) {
      return "Today";
    } else if (dateString === tomorrowString) {
      return "Tomorrow";
    } else {
      const date = parseSelectedDate(dateString);
      if (!date) return "";
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      });
    }
  };

  const selectedDateObj = parseSelectedDate(selectedDate);
  const canProceed = selectedDate && selectedTime;

  // Handle date change from DatePicker
  const handleDateChange = (date: Date | null) => {
    if (date) {
      const dateString = formatDateToString(date);
      onDateChange(dateString);
      // Clear selected time when date changes to force user to select new time
      if (selectedTime) {
        onTimeChange("");
      }
    }
  };

  // Generate time slots based on selected date
  useEffect(() => {
    if (selectedDate) {
      const generateDateSpecificSlots = () => {
        const slots: TimeSlot[] = [];
        const startHour = 8;
        const endHour = 22;

        const selectedDateObj = parseSelectedDate(selectedDate);
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

          // If it's today, disable past hours
          let available = true || Math.random() > 0.2;
          if (isToday) {
            const currentHour = today.getHours();
            available = hour > currentHour && available;
          }

          slots.push({
            id: time24,
            time: time12,
            available,
          });
        }
        return slots;
      };

      setTimeSlots(generateDateSpecificSlots());
    }
  }, [selectedDate]);

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
          Step 2 of 4
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Choose Your Perfect Time
        </h2>
        <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
          Select your preferred date and time for your beauty session
        </p>
      </motion.div>

      {/* Main Content - Left Right Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Section - Date Selection */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-primary/10 shadow-xl"
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
                Choose from available dates
              </p>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="date-picker-container">
              <DatePicker
                selected={selectedDateObj}
                onChange={handleDateChange}
                minDate={new Date()}
                maxDate={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                inline
                dateFormat="yyyy-MM-dd"
                calendarClassName="custom-datepicker"
              />
            </div>
          </div>

          {/* Selected Date Display */}
          {selectedDate && (
            <div className="mt-6 p-4 bg-primary/5 rounded-2xl border border-primary/20">
              <p className="text-center text-primary font-semibold">
                Selected: {formatDateDisplay(selectedDate)}
              </p>
            </div>
          )}
        </motion.div>

        {/* Right Section - Time Selection */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-primary/10 shadow-xl"
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
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 max-h-80 overflow-y-auto">
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
                  className={`p-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
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
                    <span className="line-through opacity-50">{slot.time}</span>
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

          {/* Selected Time Display */}
          {selectedTime && (
            <div className="mt-6 p-4 bg-secondary/5 rounded-2xl border border-secondary/20">
              <p className="text-center text-secondary font-semibold">
                Selected Time:{" "}
                {timeSlots.find((slot) => slot.id === selectedTime)?.time}
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
          className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 rounded-3xl p-8 text-center shadow-lg"
        >
          <h4 className="font-semibold text-foreground mb-3 text-xl">
            📅 Your Selected Appointment
          </h4>
          <div className="text-3xl font-bold text-primary mb-2">
            {formatDateDisplay(selectedDate)}
          </div>
          <div className="text-2xl font-semibold text-secondary">
            at {timeSlots.find((slot) => slot.id === selectedTime)?.time}
          </div>
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

      {/* Custom DatePicker Styles */}
      <style jsx global>{`
        .date-picker-container .react-datepicker {
          font-family: inherit;
          border: none;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          border-radius: 1rem;
          background: white;
        }
        .date-picker-container .react-datepicker__header {
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-bottom: none;
          border-radius: 1rem 1rem 0 0;
          padding: 1rem;
        }
        .date-picker-container .react-datepicker__current-month,
        .date-picker-container .react-datepicker__day-name {
          color: white;
          font-weight: 600;
        }
        .date-picker-container .react-datepicker__day {
          border-radius: 0.5rem;
          margin: 2px;
          transition: all 0.2s;
          width: 2rem;
          height: 2rem;
          line-height: 2rem;
        }
        .date-picker-container .react-datepicker__day:hover {
          background: #3b82f6;
          color: white;
          transform: scale(1.1);
        }
        .date-picker-container .react-datepicker__day--selected {
          background: #3b82f6;
          color: white;
          font-weight: bold;
        }
        .date-picker-container .react-datepicker__day--disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        .date-picker-container .react-datepicker__day--today {
          font-weight: bold;
          color: #3b82f6;
        }
        .date-picker-container .react-datepicker__navigation {
          top: 1.2rem;
        }
        .date-picker-container .react-datepicker__navigation--previous {
          left: 1rem;
        }
        .date-picker-container .react-datepicker__navigation--next {
          right: 1rem;
        }
      `}</style>
    </div>
  );
};

export default DateTimeSelection;
