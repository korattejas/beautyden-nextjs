"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { HiBars3, HiXMark } from "react-icons/hi2";
import Image from "next/image";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About", href: "/about" },
    { name: "Reviews", href: "/reviews" },
    { name: "Hiring", href: "/hiring" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-sm border-b border-gray-100"
            : "bg-white"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="BeautyDen Logo"
                height={40}
                width={140}
                className="object-contain h-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "text-primary bg-primary/5"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-primary/5 rounded-lg border border-primary/20"
                        transition={{ type: "spring", duration: 0.6 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Book Now Button */}
            <div className="hidden md:flex items-center">
              <Link
                href="/book"
                className="bg-primary hover:bg-primary/90 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors duration-200"
              >
                Book Now
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
            >
              {isOpen ? (
                <HiXMark className="w-6 h-6" />
              ) : (
                <HiBars3 className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-4 right-4 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 md:hidden"
            >
              <div className="py-4">
                {/* Navigation Items */}
                <div className="px-4 space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-4 py-3 text-base font-medium rounded-xl transition-colors duration-200 ${
                          isActive
                            ? "text-primary bg-primary/5 border border-primary/20"
                            : "text-gray-700 hover:text-primary hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>

                {/* Mobile CTA */}
                <div className="px-4 mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href="/book"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-4 py-3 rounded-xl font-medium text-base transition-colors duration-200"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
