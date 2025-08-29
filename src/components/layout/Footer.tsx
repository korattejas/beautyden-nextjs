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
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Reviews", href: "/reviews" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Hair Services", href: "/services#hair" },
    { name: "Facial & Skincare", href: "/services#face" },
    { name: "Makeup", href: "/services#makeup" },
    { name: "Nail Care", href: "/services#nails" },
    { name: "Bridal Packages", href: "/services#bridal" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Refund Policy", href: "/refund" },
    { name: "FAQ", href: "/faq" },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: FaFacebook,
      href: "https://facebook.com",
      color: "hover:text-blue-600",
    },
    {
      name: "Instagram",
      icon: FaInstagram,
      href: "https://instagram.com",
      color: "hover:text-pink-600",
    },
    {
      name: "Twitter",
      icon: FaTwitter,
      href: "https://twitter.com",
      color: "hover:text-blue-400",
    },
    {
      name: "YouTube",
      icon: FaYoutube,
      href: "https://youtube.com",
      color: "hover:text-red-600",
    },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      href: "https://linkedin.com",
      color: "hover:text-blue-700",
    },
  ];

  return (
    <footer className="bg-gradient-to-br from-muted/20 to-accent/30 border-t border-primary/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

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
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <HiSparkles className="w-5 h-5 text-white" />
                </div>
                <span className="font-heading text-2xl font-bold text-primary">
                  BeautyDen
                </span>
              </div>

              <p className="text-foreground/70 mb-6 leading-relaxed">
                Transform your beauty routine with professional services
                delivered to your doorstep. Experience luxury, convenience, and
                exceptional results.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-foreground/80">
                  <HiPhone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href="tel:+919876543210"
                    className="hover:text-primary transition-colors"
                  >
                    +91 98765 43210
                  </a>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <HiEnvelope className="w-4 h-4 text-primary flex-shrink-0" />
                  <a
                    href="mailto:hello@beautyden.com"
                    className="hover:text-primary transition-colors"
                  >
                    hello@beautyden.com
                  </a>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <HiMapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Mumbai, Maharashtra, India</span>
                </div>
                <div className="flex items-center gap-3 text-foreground/80">
                  <HiClock className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Mon - Sun: 8AM - 10PM</span>
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
              <h3 className="font-heading text-lg font-bold text-foreground mb-6">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-primary/50 rounded-full group-hover:bg-primary transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-lg font-bold text-foreground mb-6">
                Our Services
              </h3>
              <ul className="space-y-3">
                {services.map((service, index) => (
                  <li key={index}>
                    <Link
                      href={service.href}
                      className="text-foreground/70 hover:text-primary transition-colors duration-200 flex items-center gap-2 group"
                    >
                      <div className="w-1 h-1 bg-primary/50 rounded-full group-hover:bg-primary transition-colors" />
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="font-heading text-lg font-bold text-foreground mb-6">
                Stay Connected
              </h3>

              {/* Newsletter */}
              <div className="mb-6">
                <p className="text-foreground/70 mb-4">
                  Get beauty tips, exclusive offers, and updates delivered to
                  your inbox.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-full border border-primary/20 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white/80 backdrop-blur-sm text-sm"
                  />
                  <Button
                    size="sm"
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium hover:shadow-lg transition-all duration-200"
                  >
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="text-foreground/70 mb-4">
                  Follow us on social media
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
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-foreground/60 ${social.color} transition-all duration-200 hover:shadow-lg border border-primary/10`}
                      >
                        <IconComponent className="w-4 h-4" />
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
          className="border-t border-primary/10 py-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-foreground/60">
              <span>© {currentYear} BeautyDen. All rights reserved.</span>
              <span className="hidden sm:inline">Made with</span>
              <HiHeart className="w-4 h-4 text-red-400 hidden sm:inline" />
              <span className="hidden sm:inline">for beauty Vrushik</span>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-foreground/60 hover:text-primary transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </footer>
  );
};

export default Footer;
