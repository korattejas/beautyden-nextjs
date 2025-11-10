"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import {
  HiPhone,
  HiEnvelope,
  HiMapPin,
  HiHeart,
  HiArrowRight,
} from "react-icons/hi2";
import { HiCode } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { useSettings } from "@/hooks/useApi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Fetch settings from API
  const { data: settingsData, isLoading: settingsLoading } = useSettings();
  const settings = settingsData?.data || [];

  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    return settings.find((setting: any) => setting.key === key)?.value || "";
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Booking", href: "/book" },
  ];

  const supportLinks = [
    { name: "Reviews", href: "/reviews" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Hiring", href: "/hiring" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms & Conditions", href: "/terms-conditions" },
    { name: "FAQ", href: "/faq" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: getSetting("facebook_id") || "https://facebook.com/beautyden",
      color: "hover:text-blue-400",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: getSetting("instagram_id") || "https://instagram.com/beautyden",
      color: "hover:text-pink-400",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: getSetting("youtub_id") || "https://youtube.com/@beautyden",
      color: "hover:text-red-400",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href:
        getSetting("whatsapp_number") ||
        "https://wa.me/9574758282?text=Hi%20BeautyDen!",
      color: "hover:text-green-400",
    },
  ];

  if (settingsLoading) {
    return (
      <footer className="bg-black border-t border-gray-800">
        <Container>
          <div className="py-16 text-center">
            <div className="inline-flex items-center gap-3 text-primary">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-lg font-medium text-white">Loading...</span>
            </div>
          </div>
        </Container>
      </footer>
    );
  }

  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <Container>
        {/* Main Footer Content */}
        <div className="relative pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-6"
            >
              {/* Logo */}
              <div>
                <div className="mb-6">
                  <Image
                    src="/logo.png"
                    alt="BeautyDen Logo"
                    height={50}
                    width={120}
                    className="object-contain h-12 invert"
                  />
                </div>

                <p className="text-gray-300 text-lg leading-relaxed max-w-md mb-6">
                  Transform your beauty routine with professional services
                  delivered to your doorstep. Experience luxury, convenience,
                  and exceptional results.
                </p>

                {/* Social Links */}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h3 className="font-bold text-white text-xl mb-6 relative">
                Quick Links
                {/* <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white rounded-full" /> */}
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group relative"
                    >
                      {/* <HiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" /> */}
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <h3 className="font-bold text-white text-xl mb-6 relative">
                Support
                {/* <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white rounded-full" /> */}
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group relative"
                    >
                      {/* <HiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" /> */}
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              <h3 className="font-bold text-white text-xl mb-6 relative">
                Legal
                {/* <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-white rounded-full" /> */}
              </h3>
              <ul className="space-y-3">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 flex items-center gap-2 group relative"
                    >
                      {/* <HiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" /> */}
                      <span className="relative">
                        {link.name}
                        <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        {/* Contact Information & Social Media Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative border-t border-white/10 py-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Get in Touch */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-3 text-sm text-white/70">
                {/* Phone */}
                <a
                  href={`tel:+91${getSetting("phone_number")}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <HiPhone className="w-4 h-4 text-white" />
                  +91 {getSetting("phone_number") || "9574758282"}
                </a>

                {/* Email */}
                <a
                  href={`mailto:${getSetting("email_id")}`}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <HiEnvelope className="w-4 h-4 text-white" />
                  {getSetting("email_id") || "contact@beautyden.in"}
                </a>

                {/* Location */}
                <div className="flex items-center gap-2">
                  <HiMapPin className="w-4 h-4 text-white" />
                  {getSetting("service_location") || "India"}
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="flex flex-col sm:flex-row sm:justify-end sm:items-center gap-4">
              <span className="text-white/60 font-medium">Follow Us:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center text-white/60 ${social.color} transition-all duration-200 hover:shadow-lg border border-white/10 hover:border-primary/20 hover:bg-white/10`}
                    >
                      <IconComponent className="w-4 h-4" />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative border-t border-gray-800 py-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-gray-400 text-sm">
            <div className="flex flex-col lg:flex-row items-center gap-4">
              <span>© {currentYear} BeautyDen. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <HiHeart className="w-4 h-4 text-red-400 animate-pulse" />
              <span>for beauty</span>
            </div>

            {/* Developer Credit */}
            <div className="flex items-center gap-2">
              <HiCode className="w-4 h-4 text-white" />
              <span>Designed & Developed by</span>
              <a
                href="https://www.vrushikvisavadiya.com/"
                target="_blank"
                // rel="noopener noreferrer"
                className="text-white hover:text-gray-300 font-semibold transition-colors duration-200"
              >
                Vrushik Visavadiya
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;
