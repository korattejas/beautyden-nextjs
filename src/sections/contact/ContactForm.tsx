"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { motion } from "framer-motion";
import {
  HiEnvelope,
  HiPhone,
  HiUser,
  HiChatBubbleBottomCenterText,
  HiCheckCircle,
} from "react-icons/hi2";
import { useServices } from "@/hooks/useApi";
import { submitContactForm } from "@/services/contact.service";
import { ContactFormData } from "@/types/contact";

// Validation Schema
const contactSchema = yup.object().shape({
  first_name: yup
    .string()
    .required("First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  last_name: yup
    .string()
    .required("Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: yup
    .string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits"),
  service_id: yup.string().required("Please select a service"),
  subject: yup
    .string()
    .required("Subject is required")
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: yup
    .string()
    .required("Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(500, "Message must be less than 500 characters"),
});

const ContactForm = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: servicesData } = useServices();
  const services = servicesData?.data ?? [];

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      await submitContactForm(data);
      setIsSuccess(true);
      reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-green-50 border border-green-200 rounded-3xl p-8 text-center"
      >
        <HiCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">
          Message Sent Successfully!
        </h3>
        <p className="text-green-700">
          Thank you for contacting us. We&apos;ll get back to you within 24
          hours.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg border border-primary/10 space-y-6"
    >
      {/* Name Fields */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            First Name *
          </label>
          <div className="relative">
            <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10" />
            <input
              {...register("first_name")}
              type="text"
              className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                errors.first_name
                  ? "border-red-500"
                  : "border-primary/20 focus:border-primary"
              }`}
              placeholder="John"
            />
          </div>
          {errors.first_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.first_name.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Last Name *
          </label>
          <div className="relative">
            <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10" />
            <input
              {...register("last_name")}
              type="text"
              className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                errors.last_name
                  ? "border-red-500"
                  : "border-primary/20 focus:border-primary"
              }`}
              placeholder="Doe"
            />
          </div>
          {errors.last_name && (
            <p className="text-red-500 text-sm mt-1">
              {errors.last_name.message}
            </p>
          )}
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Email Address *
        </label>
        <div className="relative">
          <HiEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10" />
          <input
            {...register("email")}
            type="email"
            className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
              errors.email
                ? "border-red-500"
                : "border-primary/20 focus:border-primary"
            }`}
            placeholder="john@example.com"
          />
        </div>
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Phone Number *
        </label>
        <div className="relative">
          <HiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10" />
          <input
            {...register("phone")}
            type="tel"
            className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
              errors.phone
                ? "border-red-500"
                : "border-primary/20 focus:border-primary"
            }`}
            placeholder="1234567890"
          />
        </div>
        {errors.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
      </div>

      {/* Service Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Service Interest *
        </label>
        <select
          {...register("service_id")}
          className={`w-full px-4 py-3 bg-white/60 backdrop-blur-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer ${
            errors.service_id
              ? "border-red-500"
              : "border-primary/20 focus:border-primary"
          }`}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>
        {errors.service_id && (
          <p className="text-red-500 text-sm mt-1">
            {errors.service_id.message}
          </p>
        )}
      </div>

      {/* Subject Field */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Subject *
        </label>
        <div className="relative">
          <HiChatBubbleBottomCenterText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40 z-10" />
          <input
            {...register("subject")}
            type="text"
            className={`w-full pl-12 pr-4 py-3 bg-white/60 backdrop-blur-sm border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
              errors.subject
                ? "border-red-500"
                : "border-primary/20 focus:border-primary"
            }`}
            placeholder="How can we help you?"
          />
        </div>
        {errors.subject && (
          <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Message *
        </label>
        <textarea
          {...register("message")}
          rows={5}
          className={`w-full px-4 py-3 bg-white/60 backdrop-blur-sm border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none ${
            errors.message
              ? "border-red-500"
              : "border-primary/20 focus:border-primary"
          }`}
          placeholder="Tell us more about your requirements..."
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Sending Message...
          </div>
        ) : (
          "Send Message"
        )}
      </motion.button>

      <p className="text-sm text-foreground/60 text-center">
        * Required fields. We&apos;ll respond within 24 hours.
      </p>
    </motion.form>
  );
};

export default ContactForm;
