"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
  HiOutlineScissors,
  HiOutlineStar,
  HiOutlineSparkles,
  HiOutlineHeart,
  HiOutlineColorSwatch,
  HiArrowRight,
  HiTrendingUp,
} from "react-icons/hi";
import { getFeaturedServices, formatPrice } from "@/data";

const categoryData = {
  hair: {
    icon: HiOutlineScissors,
    gradient: "from-pink-400 to-rose-500",
    bg: "bg-gradient-to-br from-pink-50 to-rose-100",
    services: 12,
    popular: "Hair Cut & Style",
  },
  face: {
    icon: HiOutlineSparkles,
    gradient: "from-purple-400 to-violet-500",
    bg: "bg-gradient-to-br from-purple-50 to-violet-100",
    services: 8,
    popular: "Deep Cleansing Facial",
  },
  makeup: {
    icon: HiOutlineColorSwatch,
    gradient: "from-amber-400 to-orange-500",
    bg: "bg-gradient-to-br from-amber-50 to-orange-100",
    services: 6,
    popular: "Bridal Makeup",
  },
  nails: {
    icon: HiOutlineHeart,
    gradient: "from-emerald-400 to-teal-500",
    bg: "bg-gradient-to-br from-emerald-50 to-teal-100",
    services: 5,
    popular: "Gel Manicure",
  },
  wellness: {
    icon: HiOutlineStar,
    gradient: "from-blue-400 to-indigo-500",
    bg: "bg-gradient-to-br from-blue-50 to-indigo-100",
    services: 4,
    popular: "Relaxing Massage",
  },
};

const PopularServicesSection = () => {
  const featuredServices = getFeaturedServices(3);

  return (
    <section className="py-12 sm:py-16 lg:py-20 relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute top-16 sm:top-20 left-6 sm:left-10 w-24 sm:w-32 h-24 sm:h-32 bg-primary/5 rounded-full blur-2xl" />
      <div className="absolute bottom-16 sm:bottom-20 right-6 sm:right-10 w-28 sm:w-40 h-28 sm:h-40 bg-secondary/5 rounded-full blur-3xl" />

      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14 lg:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium text-primary mb-4 sm:mb-6 shadow-lg border border-primary/10"
          >
            <HiTrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Popular Beauty Services
          </motion.div>

          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="text-foreground">Explore Our</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Service Categories
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-12 lg:mb-16">
          {/* Left Side - Service Categories */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {Object.entries(categoryData).map(([category, data], index) => {
              const IconComponent = data.icon;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group cursor-pointer"
                >
                  <div
                    className={`${data.bg} p-4 sm:p-6 rounded-2xl sm:rounded-3xl h-full border border-white/20 backdrop-blur-sm hover:shadow-xl transition-all duration-500`}
                  >
                    <div className="flex items-center justify-between mb-3 sm:mb-4">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r ${data.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg`}
                      >
                        <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="text-right">
                        <div className="text-lg sm:text-2xl font-bold text-gray-700">
                          {data.services}
                        </div>
                        <div className="text-xs text-gray-500">Services</div>
                      </div>
                    </div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold text-gray-800 mb-1.5 sm:mb-2 capitalize group-hover:text-primary transition-colors">
                      {category}{" "}
                      {category === "face"
                        ? "& Skin"
                        : category === "wellness"
                        ? ""
                        : "Services"}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                      Most Popular:{" "}
                      <span className="font-medium text-primary">
                        {data.popular}
                      </span>
                    </p>
                    <div className="flex items-center text-xs sm:text-sm text-gray-500 group-hover:text-primary transition-colors">
                      <span>Explore services</span>
                      <HiArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Side - Featured Services */}
          <div className="lg:col-span-4 space-y-4 sm:space-y-6">
            <div className="bg-white/80 backdrop-blur-md p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-primary/10 shadow-lg">
              <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-3 sm:mb-4 flex items-center gap-2">
                <HiOutlineStar className="w-4 sm:w-5 h-4 sm:h-5 text-yellow-400" />
                Top Rated
              </h3>

              {featuredServices.slice(0, 3).map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-2 sm:gap-3 py-2 sm:py-3 border-b border-gray-100 last:border-0"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <span className="text-sm sm:text-lg font-bold text-primary">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground text-xs sm:text-sm">
                      {service.name}
                    </h4>
                    <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
                      <div className="flex items-center">
                        <HiOutlineStar className="w-3 h-3 text-yellow-400" />
                        <span className="text-[10px] sm:text-xs text-gray-600 ml-0.5 sm:ml-1">
                          {service.rating}
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs font-medium text-primary">
                        {formatPrice(service.price)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              <Button
                href="/services"
                size="sm"
                className="w-full mt-3 sm:mt-4 bg-gradient-to-r from-primary to-secondary text-white rounded-full py-2 sm:py-2.5"
              >
                View All Services
              </Button>
            
            </div>

            {/* Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary to-secondary p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-white shadow-xl"
            >
              <h3 className="font-heading text-base sm:text-lg font-bold mb-3 sm:mb-4">
                This Month
              </h3>
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span className="opacity-90">Bookings</span>
                  <span className="font-bold">2,847</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Happy Clients</span>
                  <span className="font-bold">2,791</span>
                </div>
                <div className="flex justify-between">
                  <span className="opacity-90">Satisfaction</span>
                  <span className="font-bold">98.2%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default PopularServicesSection;
