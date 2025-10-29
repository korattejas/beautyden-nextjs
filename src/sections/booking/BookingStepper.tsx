"use client";

import { motion } from "framer-motion";
import { HiCheck } from "react-icons/hi2";

interface Step {
  id: number;
  title: string;
  description: string;
}

interface BookingStepperProps {
  steps: Step[];
  currentStep: number;
}

const BookingStepper = ({ steps, currentStep }: BookingStepperProps) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {steps.map((step, index) => {
          const isActive = currentStep === step.id;
          const isCompleted = currentStep > step.id;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: isActive ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                  className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isCompleted
                      ? "bg-green-500 border-green-500 text-white"
                      : isActive
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-primary/30 text-primary/60"
                  }`}
                >
                  {isCompleted ? (
                    <HiCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
                  ) : (
                    <span className="font-bold text-xs sm:text-sm md:text-base">{step.id}</span>
                  )}
                </motion.div>

                {/* Step Text */}
                <div className="mt-2 sm:mt-3 text-center">
                  <p
                    className={`font-semibold text-[10px] sm:text-xs md:text-sm ${
                      isActive || isCompleted
                        ? "text-foreground"
                        : "text-foreground/60"
                    }`}
                  >
                    {step.title}
                  </p>
                  <p className="hidden sm:block text-xs text-foreground/50 mt-1">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connecting Line */}
              {!isLast && (
                <div className="flex-1 mx-2 sm:mx-3 md:mx-4">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="h-0.5 bg-green-500"
                    style={{ originX: 0 }}
                  />
                  <div
                    className={`h-0.5 ${
                      isCompleted ? "bg-transparent" : "bg-primary/20"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BookingStepper;
