"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  HiCheckCircle,
  HiSparkles,
  HiHeart,
  HiPhone,
  HiEnvelope,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function ThankYouPageContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const order = searchParams.get("orderNumber");
    const msg = searchParams.get("message");

    if (order) setOrderNumber(order);
    // We no longer use message from URL for production safety
    setMessage("");
  }, [searchParams]);

  // Prevent hydration mismatch by not rendering until client-side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex items-center justify-center py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <HiCheckCircle className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Thank You! 💖
            </h1>
            <p className="text-xl text-foreground/70 mb-6">
              Loading your booking confirmation...
            </p>
          </div>
        </Container>
      </div>
    );
  }

  // Function to render HTML content safely
  const renderMessage = (htmlString: string) => {
    return { __html: htmlString };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-white to-secondary/10 mt-16 py-16 sm:py-16">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Success Icon */}
          <div className="text-center mb-8 px-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg"
            >
              <HiCheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-5xl font-bold text-foreground mb-4"
            >
              Thank You! 💖
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-foreground/70 mb-6"
            >
              Your appointment has been successfully booked
            </motion.p>

            {orderNumber && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="inline-flex max-w-full items-center justify-center bg-primary/10 border border-primary/20 rounded-2xl px-3 sm:px-6 py-2 sm:py-3 mb-8"
              >
                <div className="flex flex-col items-center max-w-full">
                  <p className="text-xs sm:text-sm text-foreground/60 mb-0.5">Order Number</p>
                  <div className="w-full max-w-full">
                    <p className="whitespace-nowrap text-base sm:text-2xl font-bold text-primary">{orderNumber}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Removed message rendering for safety; order number shown above */}

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 border border-primary/10"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
              <HiSparkles className="w-6 h-6 text-primary" />
              Need Help?
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
              {/* WhatsApp */}
              <motion.a
                href="https://wa.me/919574758282"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-6 bg-green-50 hover:bg-green-100 rounded-2xl transition-colors duration-300 border border-green-200"
              >
                <FaWhatsapp className="w-8 h-8 text-green-600 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">WhatsApp</h4>
                <p className="text-sm text-foreground/60 text-center">
                  +91 95747 58282
                </p>
              </motion.a>

              {/* Email */}
              <motion.a
                href="mailto:contact@beautyden.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-6 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-colors duration-300 border border-blue-200"
              >
                <HiEnvelope className="w-8 h-8 text-blue-600 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Email</h4>
                <p className="text-sm text-foreground/60 text-center">
                  contact@beautyden.com
                </p>
              </motion.a>

              {/* Phone */}
              <motion.a
                href="tel:+919574758282"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex flex-col items-center p-6 bg-purple-50 hover:bg-purple-100 rounded-2xl transition-colors duration-300 border border-purple-200"
              >
                <HiPhone className="w-8 h-8 text-purple-600 mb-3" />
                <h4 className="font-semibold text-foreground mb-2">Phone</h4>
                <p className="text-sm text-foreground/60 text-center">
                  +91 95747 58282
                </p>
              </motion.a>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-8 px-4"
          >
            <Button
              href="/"
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <HiHeart className="w-5 h-5" />
              Back to Home
            </Button>

            <Button
              href="/services"
              variant="outline"
              className="border-2 border-primary/20 text-primary hover:bg-primary/5 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg flex items-center justify-center gap-2"
            >
              <HiSparkles className="w-5 h-5" />
              Book Another Service
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
