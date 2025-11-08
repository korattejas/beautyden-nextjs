"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import { HiSparkles } from "react-icons/hi2";

interface SplashScreenProps {
  onComplete: () => void;
}

const loadingSteps = [
  "Initializing BeautyDen...",
  "Loading services...",
  "Preparing experience...",
  "Almost ready...",
];

const SplashScreen = ({ onComplete }: SplashScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    let stepIndex = 0;

    // Update loading steps
    const stepInterval = setInterval(() => {
      if (stepIndex < loadingSteps.length - 1) {
        stepIndex++;
        setCurrentStep(stepIndex);
      }
    }, 800);

    // Update progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(stepInterval);
          // Wait a bit then trigger completion
          setTimeout(() => onComplete(), 600);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/3 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-gray-200/20 rounded-full blur-3xl" />

      <div className="text-center px-8 max-w-md mx-auto">
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-2"
        >
          {/* Large Logo Container */}
          <div className="relative mb-0">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="relative mx-auto"
            >
              {/* Logo Background */}
              {/* <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl shadow-xl border border-gray-200" /> */}

              {/* Logo */}
              <div className="relative flex items-center justify-center leading-none mb-5">
                <Image
                  src="/logo.png"
                  alt="BeautyDen"
                  width={150}
                  height={50}
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Floating Sparkle */}
            {/* <motion.div
              animate={{
                y: [-8, 8, -8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-2 -right-2 md:-top-4 md:-right-4"
            >
              <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <HiSparkles className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
            </motion.div> */}
          </div>
        </motion.div>

        {/* Brand Name */}

        {/* Loading Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-3"
        >
          {/* Loading Step Text */}
          {/* <div className="h-6">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-gray-600 text-base font-medium"
            >
              {loadingSteps[currentStep]}
            </motion.p>
          </div> */}

          {/* Progress Bar */}
          <div className="w-full max-w-xs mx-auto">
            {/* <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
              <span className="font-medium">Progress</span>
              <span className="font-bold text-primary">{progress}%</span>
            </div> */}

            {/* Progress Track */}
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-primary to-gray-700 rounded-full relative"
              >
                {/* Animated shine effect */}
                <motion.div
                  animate={{ x: [-20, 100] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 w-4 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />
              </motion.div>
            </div>
          </div>

          {/* Animated Dots */}
          {/* <div className="flex justify-center gap-2 mt-6">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  backgroundColor: ["#e5e7eb", "#000000", "#e5e7eb"],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                className="w-2 h-2 rounded-full bg-gray-300"
              />
            ))}
          </div> */}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SplashScreen;
