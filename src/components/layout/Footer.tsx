"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
  HiSparkles,
  HiPhone,
  HiEnvelope,
  HiMapPin,
  HiClock,
  HiHeart,
  HiArrowRight,
} from "react-icons/hi2";
import { HiCode } from "react-icons/hi";
import { FaFacebook, FaInstagram, FaYoutube, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useSettings } from "@/hooks/useApi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Fetch settings from API
  const { data: settingsData, isLoading: settingsLoading } = useSettings();
  const settings = settingsData?.data || [];

  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    return settings.find((setting) => setting.key === key)?.value || "";
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Booking", href: "/booking" },
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
    { name: "Refund Policy", href: "/refund-policy" },
  ];

  // Removed WhatsApp from social links
  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: getSetting("facebook_id") || "https://facebook.com/beautyden",
      color: "hover:text-blue-500",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: getSetting("instagram_id") || "https://instagram.com/beautyden",
      color: "hover:text-pink-500",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: getSetting("youtub_id") || "https://youtube.com/@beautyden",
      color: "hover:text-red-500",
    },
  ];

  if (settingsLoading) {
    return (
      <footer className="bg-slate-900 border-t border-border">
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
    <footer className="bg-slate-900 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <Container>
        {/* Main Footer Content */}
        <div className="relative pt-20 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Brand Section - Takes more space */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-5 space-y-8"
            >
              {/* Logo & Brand */}
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-xl">
                    <HiSparkles className="w-7 h-7 text-white" />
                  </div>
                  <span className="font-heading text-4xl font-bold text-white">
                    Beauty<span className="text-primary">Den</span>
                  </span>
                </div>

                <p className="text-white/70 text-lg leading-relaxed max-w-md">
                  Transform your beauty routine with professional services
                  delivered to your doorstep. Experience luxury, convenience,
                  and exceptional results.
                </p>
              </div>

              {/* Contact Information in One Row */}
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
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary rounded-full" />
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <HiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
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
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary rounded-full" />
              </h3>
              <ul className="space-y-3">
                {supportLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <HiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Newsletter */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-3"
            >
              {/* Legal Links */}
              <h3 className="font-bold text-white text-xl mb-6 relative">
                Legal
                <div className="absolute -bottom-1 left-0 w-8 h-0.5 bg-primary rounded-full" />
              </h3>
              <ul className="space-y-3 mb-8">
                {legalLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <HiArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative border-t border-white/10 py-8"
        >
          <h4 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <HiPhone className="w-5 h-5 text-primary" />
            Get In Touch
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {/* Phone */}
            <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <HiPhone className="w-4 h-4 text-primary" />
              </div>
              <div>
                <a
                  href={`tel:+91${getSetting("phone_number")}`}
                  className="font-medium text-sm"
                >
                  +91 {getSetting("phone_number") || "9574758282"}
                </a>
                <p className="text-xs text-white/50">
                  {getSetting("phone_hours") || "Mon-Sun: 5AM-11PM"}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-3 text-white/80 hover:text-white transition-colors group">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <HiEnvelope className="w-4 h-4 text-primary" />
              </div>
              <div>
                <a
                  href={`mailto:${getSetting("email_id")}`}
                  className="font-medium text-sm"
                >
                  {getSetting("email_id") || "contact@beautyden.in"}
                </a>
                <p className="text-xs text-white/50">
                  {getSetting("email_response_time") || "Response within 24hrs"}
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <HiMapPin className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="font-medium text-sm">
                  {getSetting("service_location") || "India"}
                </span>
                <p className="text-xs text-white/50">Service Available</p>
              </div>
            </div>

            {/* Working Hours */}
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <HiClock className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="font-medium text-sm">
                  {getSetting("service_time") || "Mon - Sun: 5AM - 11PM"}
                </span>
                <p className="text-xs text-white/50">Working Hours</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Social Media & Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative border-t border-white/10 py-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-6">
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
                      className={`w-12 h-12 bg-white/5 backdrop-blur-sm rounded-xl flex items-center justify-center text-white/60 ${social.color} transition-all duration-200 hover:shadow-lg border border-white/10 hover:border-primary/20 hover:bg-white/10`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-8 text-white/60 text-sm">
              {getSetting("rating") && (
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐</span>
                  <span className="font-medium">
                    {getSetting("rating")} Rating
                  </span>
                </div>
              )}
              {getSetting("happy_clients") && (
                <div className="flex items-center gap-2">
                  <HiHeart className="w-4 h-4 text-red-400" />
                  <span className="font-medium">
                    {getSetting("happy_clients")} Clients
                  </span>
                </div>
              )}
              {getSetting("experts") && (
                <div className="flex items-center gap-2">
                  <HiSparkles className="w-4 h-4 text-primary" />
                  <span className="font-medium">
                    {getSetting("experts")} Experts
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom Copyright */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative border-t border-white/10 py-6"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4 text-white/60 text-sm">
            <div className="flex items-center gap-4">
              <span>© {currentYear} BeautyDen. All rights reserved.</span>
              <div className="flex items-center gap-2">
                <span>Made with</span>
                <HiHeart className="w-4 h-4 text-red-400 animate-pulse" />
                <span>for beauty</span>
              </div>
            </div>

            {/* Developer Credit */}
            <div className="flex items-center gap-2">
              <HiCode className="w-4 h-4 text-primary" />
              <span>Designed & Developed by</span>
              <a
                href="https://www.vrushikvisavadiya.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-secondary font-semibold transition-colors duration-200 flex items-center gap-1 group"
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
