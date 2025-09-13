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
  HiMapPin,
  HiClock,
  HiSparkles,
  HiShieldCheck,
  HiHeart,
  HiStar,
} from "react-icons/hi2";
import { useServices, useSettings } from "@/hooks/useApi";
import { submitContactForm } from "@/services/contact.service";
import { ContactFormData } from "@/types/contact";
import Container from "@/components/ui/Container";

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
  // service_id: yup.string().required("Please select a service"),
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

const ContactSection = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  // Get settings and services data
  const { data: settingsData } = useSettings();
  const { data: servicesData } = useServices();

  const settings = settingsData?.data ?? [];
  // const services = servicesData?.data?.data ?? [];

  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    const setting = settings.find((s) => s.key === key);
    return setting?.value || "";
  };

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

  return (
    <section className="py-20 bg-muted/20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-card backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-primary shadow-lg border border-border">
                <HiSparkles className="w-4 h-4" />
                Get in Touch
              </div>

              <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground leading-tight">
                Let&apos;s Create Your
                <span className="block text-primary">
                  Beauty Story Together
                </span>
              </h2>

              <p className="text-xl text-foreground/70 leading-relaxed">
                Ready to experience professional beauty services at your
                doorstep? Our certified experts are here to help you look and
                feel your absolute best.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <HiShieldCheck className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Certified Professionals
                  </h3>
                  <p className="text-foreground/70">
                    All our beauty experts are certified, trained, and
                    background-verified for your safety and satisfaction.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <HiHeart className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Personalized Service
                  </h3>
                  <p className="text-foreground/70">
                    Tailored beauty treatments designed specifically for your
                    skin type, preferences, and lifestyle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-warning/10 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <HiStar className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">
                    Premium Products
                  </h3>
                  <p className="text-foreground/70">
                    We use only high-quality, professional-grade products from
                    trusted beauty brands.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information - Dynamic from API */}
            <div className="bg-card backdrop-blur-md rounded-3xl p-8 border border-border shadow-lg">
              <h3 className="font-heading text-xl font-bold text-foreground mb-6">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <HiPhone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Call us</p>
                    <a
                      href={`tel:+91${getSetting("phone_number")}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      +91 {getSetting("phone_number")}
                    </a>
                    <p className="text-xs text-foreground/50 mt-1">
                      {getSetting("phone_hours")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <HiEnvelope className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Email us</p>
                    <a
                      href={`mailto:${getSetting("email_id")}`}
                      className="font-semibold text-foreground hover:text-primary transition-colors"
                    >
                      {getSetting("email_id")}
                    </a>
                    <p className="text-xs text-foreground/50 mt-1">
                      {getSetting("email_response_time")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <HiMapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">Service Area</p>
                    <p className="font-semibold text-foreground">
                      {getSetting("service_location") || "India"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <HiClock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60">
                      Available Hours
                    </p>
                    <p className="font-semibold text-foreground">
                      {getSetting("service_time")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="bg-success/10 border border-success/20 rounded-3xl p-8 text-center"
              >
                <HiCheckCircle className="w-20 h-20 text-success mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-success mb-4">
                  Message Sent Successfully!
                </h3>
                <p className="text-success/80 text-lg">
                  Thank you for contacting us. We&apos;ll get back to you within
                  24 hours with personalized service recommendations.
                </p>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-card backdrop-blur-md rounded-3xl p-8 shadow-xl border border-border space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="font-heading text-2xl font-bold text-foreground mb-2">
                    Send us a Message
                  </h3>
                  <p className="text-foreground/60">
                    Fill out the form below and we&apos;ll respond within 24
                    hours
                  </p>
                </div>

                {/* Name Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      First Name *
                    </label>
                    <div className="relative">
                      <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                      <input
                        {...register("first_name")}
                        type="text"
                        className={`w-full pl-12 pr-4 py-4 bg-background border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                          errors.first_name
                            ? "border-red-500"
                            : "border-border focus:border-primary"
                        }`}
                        placeholder="John"
                      />
                    </div>
                    {errors.first_name && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Last Name *
                    </label>
                    <div className="relative">
                      <HiUser className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                      <input
                        {...register("last_name")}
                        type="text"
                        className={`w-full pl-12 pr-4 py-4 bg-background border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                          errors.last_name
                            ? "border-red-500"
                            : "border-border focus:border-primary"
                        }`}
                        placeholder="Doe"
                      />
                    </div>
                    {errors.last_name && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Email Address *
                    </label>
                    <div className="relative">
                      <HiEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                      <input
                        {...register("email")}
                        type="email"
                        className={`w-full pl-12 pr-4 py-4 bg-background border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                          errors.email
                            ? "border-red-500"
                            : "border-border focus:border-primary"
                        }`}
                        placeholder="john@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-3">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <HiPhone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                      <input
                        {...register("phone")}
                        type="tel"
                        className={`w-full pl-12 pr-4 py-4 bg-background border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                          errors.phone
                            ? "border-red-500"
                            : "border-border focus:border-primary"
                        }`}
                        placeholder="9876543210"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-2">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Service Selection - Fixed Dropdown */}
                {/* <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Service Interest *
                  </label>
                  <select
                    {...register("service_id")}
                    className={`w-full px-4 py-4 bg-background border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 appearance-none cursor-pointer ${
                      errors.service_id
                        ? "border-red-500"
                        : "border-border focus:border-primary"
                    }`}
                  >
                    <option value="">
                      Select a service you&apos;re interested in
                    </option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                  </select>
                  {errors.service_id && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.service_id.message}
                    </p>
                  )}
                </div> */}

                {/* Subject Field */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Subject *
                  </label>
                  <div className="relative">
                    <HiChatBubbleBottomCenterText className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-foreground/40" />
                    <input
                      {...register("subject")}
                      type="text"
                      className={`w-full pl-12 pr-4 py-4 bg-background border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 ${
                        errors.subject
                          ? "border-red-500"
                          : "border-border focus:border-primary"
                      }`}
                      placeholder="How can we help you today?"
                    />
                  </div>
                  {errors.subject && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.subject.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-3">
                    Message *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    className={`w-full px-4 py-4 bg-background border-2 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none ${
                      errors.message
                        ? "border-red-500"
                        : "border-border focus:border-primary"
                    }`}
                    placeholder="Tell us more about your beauty goals, preferred services, or any specific requirements..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-2">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white py-4 px-8 rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending Message...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <HiEnvelope className="w-5 h-5" />
                      Send Message
                    </div>
                  )}
                </motion.button>

                <p className="text-sm text-foreground/60 text-center mt-4">
                  * Required fields. We&apos;ll respond within 24 hours with
                  personalized recommendations.
                </p>
              </form>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
