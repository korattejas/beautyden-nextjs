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
} from "react-icons/hi2";
import { HiCode } from "react-icons/hi";
import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaGithub,
  FaWhatsapp,
} from "react-icons/fa";
import Link from "next/link";
import { useSettings } from "@/hooks/useApi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Fetch settings and policies from API
  const { data: settingsData, isLoading: settingsLoading } = useSettings();
  // const { data: policiesData } = usePolicies();

  const settings = settingsData?.data || [];
  // const policies = policiesData?.data || [];

  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    return settings.find((setting) => setting.key === key)?.value || "";
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Reviews", href: "/reviews" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  // Generate policy links from API
  // const legalLinks =
  //   policies.length > 0
  //     ? policies.map((policy) => ({
  //         name: policy.title || policy.name,
  //         href: `/policies/${policy.slug || policy.id}`,
  //       }))
  //     : [
  //         { name: "Privacy Policy", href: "/policies/privacy-policy" },
  //         { name: "Terms & Conditions", href: "/policies/terms-conditions" },
  //         { name: "FAQ", href: "/faq" },
  //       ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: getSetting("facebook_id") || "https://facebook.com/beautyden",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: getSetting("instagram_id") || "https://instagram.com/beautyden",
      color: "hover:text-pink-600",
    },
    // Commented out LinkedIn & Twitter as requested
    // {
    //   name: "Twitter",
    //   icon: FaTwitter,
    //   href: getSetting('twitter_id') || "https://twitter.com/beautyden",
    //   color: "hover:text-blue-400",
    // },
    // {
    //   name: "LinkedIn",
    //   icon: FaLinkedin,
    //   href: getSetting('linkedin_id') || "https://linkedin.com/company/beautyden",
    //   color: "hover:text-blue-700",
    // },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: getSetting("youtub_id") || "https://youtube.com/@beautyden",
      color: "hover:text-red-600",
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      href: `https://wa.me/${
        getSetting("whatsapp_phone_number") || "919876543210"
      }?text=Hi%20BeautyDen!%20I%20would%20like%20to%20know%20more%20about%20your%20services.`,
      color: "hover:text-green-600",
    },
  ];

  if (settingsLoading) {
    return (
      <footer className="bg-gradient-to-br from-slate-900 to-slate-800 border-t border-primary/10">
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
    <footer className="bg-gradient-to-br from-slate-900 to-slate-800 border-t border-primary/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />

      <Container>
        {/* Main Footer Content */}
        <div className="pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-1"
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                  <HiSparkles className="w-6 h-6 text-white" />
                </div>
                <span className="font-heading text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  BeautyDen
                </span>
              </div>

              <p className="text-white/70 mb-8 leading-relaxed text-lg">
                Transform your beauty routine with professional services
                delivered to your doorstep. Experience luxury, convenience, and
                exceptional results with certified beauty experts.
              </p>

              {/* Contact Info from API */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/80 group">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <HiPhone className="w-4 h-4 text-primary" />
                  </div>
                  <a
                    href={`tel:${getSetting("phone_number")}`}
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {getSetting("phone_number") || "+91 9574758282"}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-white/80 group">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <FaWhatsapp className="w-4 h-4 text-green-500" />
                  </div>
                  <a
                    href={`https://wa.me/${getSetting(
                      "whatsapp_phone_number"
                    )}`}
                    className="hover:text-green-500 transition-colors font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {getSetting("whatsapp_phone_number") || "+91 9574758282"}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-white/80 group">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <HiEnvelope className="w-4 h-4 text-primary" />
                  </div>
                  <a
                    href={`mailto:${getSetting("email_id")}`}
                    className="hover:text-primary transition-colors font-medium"
                  >
                    {getSetting("email_id") || "contact@beautyden.in"}
                  </a>
                </div>

                <div className="flex items-center gap-3 text-white/80 group">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <HiMapPin className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">
                    {getSetting("service_location") || "India"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-white/80 group">
                  <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center group-hover:bg-primary/30 transition-colors">
                    <HiClock className="w-4 h-4 text-primary" />
                  </div>
                  <span className="font-medium">
                    {getSetting("service_time") || "Mon - Sun: 5AM - 11PM"}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-xl font-bold text-white mb-8 relative">
                Quick Links
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </h3>
              <ul className="space-y-4">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-primary transition-colors duration-200 flex items-center gap-3 group font-medium"
                    >
                      <div className="w-2 h-2 bg-primary/30 rounded-full group-hover:bg-primary group-hover:scale-125 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Legal & Policies Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-xl font-bold text-white mb-8 relative">
                Legal & Policies
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </h3>
              <ul className="space-y-4">
                {[
                  { name: "Privacy Policy", href: "/privacy-policy" },
                  {
                    name: "Terms & Conditions",
                    href: "/terms-conditions",
                  },
                  { name: "FAQ", href: "/faq" },
                ].map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-primary transition-colors duration-200 flex items-center gap-3 group font-medium"
                    >
                      <div className="w-2 h-2 bg-primary/30 rounded-full group-hover:bg-primary group-hover:scale-125 transition-all duration-200" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-xl font-bold text-white mb-8 relative">
                Stay Connected
                <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-gradient-to-r from-primary to-secondary rounded-full" />
              </h3>

              {/* Newsletter */}
              <div className="mb-8">
                <p className="text-white/70 mb-6 leading-relaxed">
                  Subscribe to get beauty tips, exclusive offers, and the latest
                  updates.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded-2xl border border-white/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/10 backdrop-blur-sm text-sm transition-all duration-200 text-white placeholder-white/50"
                  />
                  <Button
                    size="sm"
                    className="px-6 py-3 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-white/70 mb-6 font-medium">
                  Follow us for daily beauty inspiration
                </p>
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
                        className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white/60 ${social.color} transition-all duration-200 hover:shadow-lg border border-white/10 hover:border-primary/20`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 py-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            {/* Copyright & Developer Credit */}
            <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-8">
              <div className="flex items-center gap-2 text-white/60">
                <span>© {currentYear} BeautyDen. All rights reserved.</span>
                <span className="hidden sm:inline">Made with</span>
                <HiHeart className="w-4 h-4 text-red-400 hidden sm:inline animate-pulse" />
                <span className="hidden sm:inline">for beauty</span>
              </div>

              {/* Developer Credit */}
              <div className="flex items-center gap-2 text-white/60">
                <HiCode className="w-4 h-4 text-primary" />
                <span>Designed & Developed by</span>
                <a
                  href="https://www.vrushikvisavadiya.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-secondary font-semibold transition-colors duration-200 flex items-center gap-1 group"
                >
                  Vrushik
                  <FaGithub className="w-3 h-3 group-hover:scale-110 transition-transform duration-200" />
                </a>
              </div>
            </div>

            {/* Stats from API */}
            <div className="flex items-center gap-6 text-white/60 text-sm">
              {getSetting("happy_clients") && (
                <div className="flex items-center gap-2">
                  <HiHeart className="w-4 h-4 text-red-400" />
                  <span>{getSetting("happy_clients")} Happy Customers</span>
                </div>
              )}
              {getSetting("experts") && (
                <div className="flex items-center gap-2">
                  <HiSparkles className="w-4 h-4 text-primary" />
                  <span>{getSetting("experts")} Experts</span>
                </div>
              )}
              {getSetting("rating") && (
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⭐</span>
                  <span>{getSetting("rating")} Rating</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;
