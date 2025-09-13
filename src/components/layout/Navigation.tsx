"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { HiSparkles, HiBars3, HiXMark } from "react-icons/hi2";
// import { HiMenu, HiX } from "react-icons/hi";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Reviews", href: "/reviews" },
    { name: "Hiring", href: "/hiring" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-xl border-b border-primary/10"
            : "bg-transparent "
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo with Enhanced Animation */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center space-x-3"
            >
              <Link href="/" className="flex items-center space-x-3 group">
                {/* <div className="relative">
      
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                    className="absolute -inset-1 bg-gradient-to-r from-primary via-secondary to-primary rounded-full opacity-20 blur-sm group-hover:opacity-40 transition-opacity duration-300"
                  />
                  <div className="relative w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <motion.div
                      animate={{ rotate: [0, -10, 10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <HiSparkles className="w-6 h-6 text-white" />
                    </motion.div>
                  </div>
                </div> */}
                <div className="flex flex-col">
                  <span className="text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent group-hover:from-secondary group-hover:to-primary transition-all duration-300">
                    BeautyDen
                  </span>
                  <span className="text-xs text-foreground/50 -mt-1">
                    Beauty at your doorstep
                  </span>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation - Enhanced Pill Container */}
            <div className="hidden lg:flex items-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex items-center bg-white/60 backdrop-blur-xl rounded-full p-1.5 shadow-lg border border-primary/10 hover:shadow-xl transition-shadow duration-300"
              >
                {navItems.map((item, index) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="relative"
                    >
                      <Link
                        href={item.href}
                        className={`relative px-6 py-3 text-sm font-semibold transition-all duration-300 rounded-full z-10 ${
                          isActive
                            ? "text-white"
                            : "text-foreground/70 hover:text-primary"
                        }`}
                      >
                        {item.name}
                      </Link>

                      {/* Enhanced Active State */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full shadow-md"
                          initial={false}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                        />
                      )}

                      {/* Hover Effect */}
                      {!isActive && (
                        <motion.div
                          className="absolute inset-0 bg-primary/10 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200"
                          whileHover={{ scale: 1.05 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Enhanced Book Now Button */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="ml-8"
              >
                <Button
                  href="/book"
                  className="relative overflow-hidden bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl group"
                >
                  <span className="relative z-10">Book Now</span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </Button>
              </motion.div>
            </div>

            {/* Enhanced Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`lg:hidden relative p-3 rounded-2xl backdrop-blur-md transition-all duration-300 shadow-lg ${
                isOpen
                  ? "bg-primary text-white shadow-xl"
                  : "bg-white/60 border border-primary/10 text-foreground/70 hover:text-primary hover:bg-white/80"
              }`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 180, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? (
                    <HiXMark className="w-6 h-6" />
                  ) : (
                    <HiBars3 className="w-6 h-6" />
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Enhanced Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-24 left-4 right-4 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-primary/10 z-50 lg:hidden overflow-hidden"
            >
              <div className="py-8 px-6">
                {/* Navigation Items */}
                <div className="space-y-2 mb-8">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className={`flex items-center px-6 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 group ${
                            isActive
                              ? "text-white bg-gradient-to-r from-primary to-secondary shadow-lg"
                              : "text-foreground/80 hover:text-primary hover:bg-primary/5"
                          }`}
                        >
                          <span>{item.name}</span>
                          {!isActive && (
                            <motion.div
                              className="ml-auto w-2 h-2 bg-primary/30 rounded-full opacity-0 group-hover:opacity-100"
                              whileHover={{ scale: 1.2 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: navItems.length * 0.05 }}
                  className="space-y-3"
                >
                  <Button
                    href="/services"
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-gradient-to-r from-primary to-secondary text-white py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300"
                  >
                    Book Appointment
                  </Button>

                  <Button
                    href="/contact"
                    onClick={() => setIsOpen(false)}
                    variant="outline"
                    className="w-full border-2 border-primary/20 text-primary hover:bg-primary/5 py-4 rounded-2xl font-semibold transition-all duration-300"
                  >
                    Get in Touch
                  </Button>
                </motion.div>

                {/* Contact Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className="mt-8 pt-6 border-t border-primary/10 text-center"
                >
                  <p className="text-sm text-foreground/60 mb-2">
                    Need immediate assistance?
                  </p>
                  <a
                    href="tel:+919876543210"
                    className="text-primary font-semibold hover:text-secondary transition-colors duration-200"
                  >
                    +91 98765 43210
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
