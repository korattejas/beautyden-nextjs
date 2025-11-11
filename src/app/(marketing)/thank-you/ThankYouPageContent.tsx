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

export default function ThankYouContent() {
  const searchParams = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const order = searchParams.get("orderNumber");
    const msg = searchParams.get("message");

    if (order) setOrderNumber(order);
    if (msg) setMessage(decodeURIComponent(msg));
  }, [searchParams]);

  // Function to render HTML content safely
  const renderMessage = (htmlString: string) => {
    return { __html: htmlString };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex items-center justify-center py-12">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Success Icon */}
          <div className="text-center mb-8">
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
              className="text-4xl md:text-5xl font-bold text-foreground mb-4"
            >
              Thank You! 💖
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-foreground/70 mb-6"
            >
              Your appointment has been successfully booked
            </motion.p>

            {orderNumber && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="inline-block bg-primary/10 border border-primary/20 rounded-2xl px-6 py-3 mb-8"
              >
                <p className="text-sm text-foreground/60 mb-1">Order Number</p>
                <p className="text-2xl font-bold text-primary">{orderNumber}</p>
              </motion.div>
            )}
          </div>

          {/* Message Content */}
          {message && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10 mb-8"
            >
              <div
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={renderMessage(message)}
                style={{
                  fontFamily: "Arial, sans-serif",
                  lineHeight: "1.6",
                  color: "#333",
                }}
              />
            </motion.div>
          )}

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 border border-primary/10"
          >
            <h3 className="text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
              <HiSparkles className="w-6 h-6 text-primary" />
              Need Help?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            className="flex flex-col sm:flex-row gap-4 justify-center mt-8"
          >
            <Button
              href="/"
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <HiHeart className="w-5 h-5" />
              Back to Home
            </Button>

            <Button
              href="/book"
              variant="outline"
              className="border-2 border-primary/20 text-primary hover:bg-primary/5 px-8 py-4 rounded-2xl font-semibold text-lg flex items-center justify-center gap-2"
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
