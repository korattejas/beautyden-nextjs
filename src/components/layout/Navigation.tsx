"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  HiBars3,
  HiXMark,
  HiMapPin,
  HiChevronDown,
  HiSparkles,
  HiHeart,
  HiBriefcase,
  HiInformationCircle,
  HiShoppingBag,
  HiUser,
  HiArrowRightOnRectangle,
  // HiChatBubbleLeftRightEllipsis,
} from "react-icons/hi2";
import Image from "next/image";
import { useCityContext } from "@/contexts/CityContext";
import { useCart } from "@/contexts/CartContext";
import { useServiceCategories } from "@/hooks/useApi";
import AuthModal from "@/components/ui/AuthModal";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showServicesMenu, setShowServicesMenu] = useState(false);
  const [showAboutMenu, setShowAboutMenu] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const pathname = usePathname();

  const servicesRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const cityRef = useRef<HTMLDivElement>(null);

  // City context
  const { selectedCity, setShowCityPopup } = useCityContext();
  const { totalItems, items, totalPrice, removeItem } = useCart();
  const [showCartDropdown, setShowCartDropdown] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Fetch service categories
  const { data: categoriesData } = useServiceCategories();
  const categories = categoriesData?.data || [];
  const popularCategories = categories
    .filter((cat) => cat.is_popular === 1)
    .slice(0, 6);

  // Navigation structure
  const navItems = [
    {
      name: "Services",
      href: "/services",
      hasMegaMenu: true,
      type: "services",
    },
    {
      name: "About",
      href: "/about",
      hasMegaMenu: true,
      type: "about",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ];

  // About menu items
  const aboutMenuItems = [
    {
      name: "About Us",
      href: "/about",
      icon: HiInformationCircle,
      description: "Learn about our mission and values",
    },
    {
      name: "Reviews",
      href: "/reviews",
      icon: HiHeart,
      description: "What our customers say",
    },
    {
      name: "Careers",
      href: "/hiring",
      icon: HiBriefcase,
      description: "Join our team of professionals",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        servicesRef.current &&
        !servicesRef.current.contains(event.target as Node)
      ) {
        setShowServicesMenu(false);
      }
      if (
        aboutRef.current &&
        !aboutRef.current.contains(event.target as Node)
      ) {
        setShowAboutMenu(false);
      }
      if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
        setShowCityDropdown(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setShowCartDropdown(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    try {
      setIsLoggedIn(localStorage.getItem("bd_isLoggedIn") === "true");
    } catch {}
    const onStorage = () => {
      try {
        setIsLoggedIn(localStorage.getItem("bd_isLoggedIn") === "true");
      } catch {}
    };
    const onCustom = () => onStorage();
    window.addEventListener("storage", onStorage);
    window.addEventListener("bd-auth-changed", onCustom as EventListener);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("bd-auth-changed", onCustom as EventListener);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setShowServicesMenu(false);
    setShowAboutMenu(false);
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

  const handleCitySelect = () => {
    setShowCityPopup(true);
    setShowCityDropdown(false);
    setIsOpen(false);
  };

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200"
            : "bg-white border-b border-gray-100"
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="BeautyDen Logo"
                height={50}
                width={120}
                className="object-contain h-13"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.type === "about" &&
                    ["/about", "/reviews", "/hiring"].includes(pathname));

                if (item.hasMegaMenu) {
                  return (
                    <div
                      key={item.name}
                      ref={item.type === "services" ? servicesRef : aboutRef}
                      className="relative"
                    >
                      <button
                        onMouseEnter={() => {
                          if (item.type === "services")
                            setShowServicesMenu(true);
                          if (item.type === "about") setShowAboutMenu(true);
                        }}
                        onMouseLeave={() => {
                          if (item.type === "services")
                            setShowServicesMenu(false);
                          if (item.type === "about") setShowAboutMenu(false);
                        }}
                        className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-1 ${
                          isActive ||
                          (item.type === "services" && showServicesMenu) ||
                          (item.type === "about" && showAboutMenu)
                            ? "text-primary bg-primary/5"
                            : "text-gray-700 hover:text-primary hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                        <HiChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            (item.type === "services" && showServicesMenu) ||
                            (item.type === "about" && showAboutMenu)
                              ? "rotate-180"
                              : ""
                          }`}
                        />
                      </button>

                      {/* Services Mega Menu */}
                      {item.type === "services" && (
                        <AnimatePresence>
                          {showServicesMenu && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.15 }}
                              onMouseEnter={() => setShowServicesMenu(true)}
                              onMouseLeave={() => setShowServicesMenu(false)}
                              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[500px] max-w-[500px] bg-white rounded-2xl shadow-xl border border-gray-200 p-6 z-50"
                            >
                              <div className="grid grid-cols-3 gap-3">
                                {popularCategories.map((category) => (
                                  <Link
                                    key={category.id}
                                    href={`/services?category=${category.id}`}
                                    className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                                  >
                                    {category.icon ? (
                                      <div className="w-8 h-8 rounded-lg overflow-hidden">
                                        <Image
                                          src={category.icon}
                                          alt={category.name}
                                          width={32}
                                          height={32}
                                          className="w-full h-full object-cover"
                                          unoptimized
                                        />
                                      </div>
                                    ) : (
                                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <HiSparkles className="w-4 h-4 text-primary" />
                                      </div>
                                    )}
                                    <span className="text-sm font-medium text-gray-900 truncate">
                                      {category.name}
                                    </span>
                                  </Link>
                                ))}
                              </div>

                              <div className="mt-4 pt-4 border-t border-gray-100">
                                <Link
                                  href="/services"
                                  className="flex items-center justify-center gap-2 text-primary hover:bg-primary/5 px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200"
                                >
                                  <HiSparkles className="w-4 h-4" />
                                  View All Services
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}

                      {/* About Mega Menu */}
                      {item.type === "about" && (
                        <AnimatePresence>
                          {showAboutMenu && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 8 }}
                              transition={{ duration: 0.15 }}
                              onMouseEnter={() => setShowAboutMenu(true)}
                              onMouseLeave={() => setShowAboutMenu(false)}
                              className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-6 z-50"
                            >
                              <div className="space-y-2">
                                {aboutMenuItems.map((menuItem) => {
                                  const IconComponent = menuItem.icon;
                                  return (
                                    <Link
                                      key={menuItem.name}
                                      href={menuItem.href}
                                      className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-xl transition-colors duration-200"
                                    >
                                      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center mt-0.5">
                                        <IconComponent className="w-4 h-4 text-primary" />
                                      </div>
                                      <div>
                                        <div className="font-medium text-gray-900 text-sm">
                                          {menuItem.name}
                                        </div>
                                        <div className="text-xs text-gray-500 mt-0.5">
                                          {menuItem.description}
                                        </div>
                                      </div>
                                    </Link>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? "text-primary bg-primary/5"
                        : "text-gray-700 hover:text-primary hover:bg-gray-50"
                    }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Right Section */}
            <div className="hidden md:flex items-center gap-3">
              {/* Login/Profile */}
              <button
                onClick={() => (isLoggedIn ? (window.location.href = "/account/orders") : setAuthOpen(true))}
                className="relative p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                aria-label={isLoggedIn ? "Account" : "Login"}
              >
                {isLoggedIn ? (
                  <HiUser className="w-5 h-5 text-primary" />
                ) : (
                  <HiArrowRightOnRectangle className="w-5 h-5 text-primary" />
                )}
              </button>
              {/* City Selector */}
              <div ref={cityRef} className="relative">
                <button
                  onClick={() => setShowCityDropdown(!showCityDropdown)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                >
                  <HiMapPin className="w-4 h-4 text-primary" />
                  <span className="max-w-20 truncate">
                    {selectedCity ? selectedCity.name : "City"}
                  </span>
                  <HiChevronDown className="w-3 h-3" />
                </button>

                {/* City Dropdown */}
                <AnimatePresence>
                  {showCityDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-3 z-50"
                    >
                      {selectedCity ? (
                        <>
                          <div className="px-4 py-2">
                            <div className="font-medium text-gray-900 text-sm">
                              {selectedCity.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {selectedCity.area && `${selectedCity.area}, `}
                              {selectedCity.state}
                            </div>
                          </div>
                          {/* <button
                            onClick={handleCitySelect}
                            className="w-full px-4 py-2 text-sm text-left text-primary hover:bg-gray-50 transition-colors duration-200"
                          >
                            Change City
                          </button> */}
                        </>
                      ) : (
                        <button
                          onClick={handleCitySelect}
                          className="w-full px-4 py-3 text-sm text-left hover:bg-gray-50 transition-colors duration-200"
                        >
                          <div className="font-medium">Select Your City</div>
                          <div className="text-xs text-gray-500">
                            Get personalized services
                          </div>
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Desktop Cart */}
              <div ref={cartRef} className="relative">
                <button
                  onClick={() => setShowCartDropdown((s) => !s)}
                  className="relative p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Cart"
                >
                  <HiShoppingBag className="w-5 h-5 text-primary" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-[10px] leading-none font-bold bg-primary text-white rounded-full w-4 h-4">
                      {totalItems}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {showCartDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="text-sm font-semibold text-gray-900">Your Cart</div>
                        <div className="text-xs text-gray-500">{totalItems} item{totalItems !== 1 ? "s" : ""}</div>
                      </div>
                      {items.length === 0 ? (
                        <div className="text-sm text-gray-500 py-6 text-center">Your cart is empty</div>
                      ) : (
                        <div className="max-h-56 overflow-auto space-y-3">
                          {items.map((it) => (
                            <div key={it.id} className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3 last:border-b-0">
                              <div className="flex items-start gap-3 min-w-0 flex-1">
                                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                                  {it.icon ? (
                                    <Image
                                      src={it.icon}
                                      alt={it.name}
                                      width={40}
                                      height={40}
                                      className="object-cover w-full h-full"
                                      unoptimized
                                    />
                                  ) : (
                                    <HiSparkles className="w-5 h-5 text-gray-400" />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-gray-900 truncate">{it.name}</div>
                                  <div className="text-xs text-gray-500 truncate">{it.category_name}</div>
                                  <div className="text-xs text-gray-500">{it.duration}</div>
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="text-sm font-semibold text-gray-900">₹{it.discount_price ?? it.price}</div>
                                <button onClick={() => removeItem(it.id)} className="text-xs text-red-500 hover:underline mt-1">Remove</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      {/* <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-sm font-semibold text-gray-900">Total</div>
                        <div className="text-sm font-bold text-primary">₹{totalPrice.toLocaleString()}</div>
                      </div> */}
                      <div className="mt-3 grid grid-cols-1 gap-2">
                        <Link href="/book" className="text-center text-sm px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90" onClick={() => setShowCartDropdown(false)}>View</Link>
                        {/* <Link href="/book" className="text-center text-sm px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90" onClick={() => setShowCartDropdown(false)}>Continue</Link> */}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Book Now Button */}
              <Link
                href="/book"
                className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg font-medium text-sm transition-colors duration-200"
              >
                Book Now
              </Link>

              
            </div>

            {/* Mobile Cart + Menu Buttons */}
            <div className="md:hidden flex items-center gap-2">
              {/* Mobile Login/Profile */}
              <button
                onClick={() => (isLoggedIn ? (window.location.href = "/account") : setAuthOpen(true))}
                className="p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                aria-label={isLoggedIn ? "Account" : "Login"}
              >
                {isLoggedIn ? (
                  <HiUser className="w-5 h-5 text-primary" />
                ) : (
                  <HiArrowRightOnRectangle className="w-5 h-5 text-primary" />
                )}
              </button>
              <div ref={cartRef} className="relative">
                <button
                  onClick={() => setShowCartDropdown((s) => !s)}
                  className="relative p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                  aria-label="Cart"
                >
                  <HiShoppingBag className="w-5 h-5 text-primary" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 inline-flex items-center justify-center text-[10px] leading-none font-bold bg-primary text-white rounded-full w-4 h-4">
                      {totalItems}
                    </span>
                  )}
                </button>

                <AnimatePresence>
                  {showCartDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="absolute top-full right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <div className="text-sm font-semibold text-gray-900">Your Cart</div>
                        <div className="text-xs text-gray-500">{totalItems} item{totalItems !== 1 ? "s" : ""}</div>
                      </div>
                      {items.length === 0 ? (
                        <div className="text-sm text-gray-500 py-6 text-center">Your cart is empty</div>
                      ) : (
                        <div className="max-h-56 overflow-auto space-y-3">
                          {items.map((it) => (
                            <div key={it.id} className="flex items-start justify-between gap-3 border-b border-gray-100 pb-3 last:border-b-0">
                              <div className="flex items-start gap-3 min-w-0 flex-1">
                                <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 flex items-center justify-center">
                                  {it.icon ? (
                                    <Image
                                      src={it.icon}
                                      alt={it.name}
                                      width={40}
                                      height={40}
                                      className="object-cover w-full h-full"
                                      unoptimized
                                    />
                                  ) : (
                                    <HiSparkles className="w-5 h-5 text-gray-400" />
                                  )}
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="text-sm font-medium text-gray-900 truncate">{it.name}</div>
                                  <div className="text-xs text-gray-500 truncate">{it.category_name}</div>
                                  <div className="text-xs text-gray-500">{it.duration}</div>
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="text-sm font-semibold text-gray-900">₹{(it.discount_price ?? it.price).toLocaleString()}</div>
                                <button onClick={() => removeItem(it.id)} className="text-xs text-red-500 hover:underline mt-1">Remove</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                        <div className="text-sm font-semibold text-gray-900">Total</div>
                        <div className="text-sm font-bold text-primary">₹{totalPrice.toLocaleString()}</div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2">
                        <Link href="/book" className="text-center text-sm px-3 py-2 rounded-lg border border-gray-200 hover:bg-gray-50" onClick={() => setShowCartDropdown(false)}>View</Link>
                        <Link href="/book" className="text-center text-sm px-3 py-2 rounded-lg bg-primary text-white hover:bg-primary/90" onClick={() => setShowCartDropdown(false)}>Continue</Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-200"
              >
                {isOpen ? (
                  <HiXMark className="w-5 h-5" />
                ) : (
                  <HiBars3 className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="fixed top-16 left-4 right-4 bg-white rounded-xl shadow-xl border border-gray-200 z-50 md:hidden"
            >
              <div className="p-4">
                {/* City Selector - Mobile */}
                <button
                  onClick={handleCitySelect}
                  className="w-full flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 mb-4"
                >
                  <HiMapPin className="w-5 h-5 text-primary" />
                  <div className="flex-1 text-left">
                    <div className="font-medium text-sm">
                      {selectedCity ? selectedCity.name : "Select Your City"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedCity
                        ? `${selectedCity.state}`
                        : "Get personalized services"}
                    </div>
                  </div>
                </button>

                {/* Navigation Items */}
                <div className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                          isActive
                            ? "text-primary bg-primary/5"
                            : "text-gray-700 hover:text-primary hover:bg-gray-50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}

                  {/* Mobile About Submenu */}
                  <div className="ml-4 space-y-1 border-l border-gray-200 pl-4">
                    {aboutMenuItems.map((menuItem) => (
                      <Link
                        key={menuItem.name}
                        href={menuItem.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      >
                        {menuItem.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <Link
                    href="/book"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-lg font-medium text-sm transition-colors duration-200"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onLoggedIn={() => setIsLoggedIn(true)}
      />
    </>
  );
};

export default Navigation;
