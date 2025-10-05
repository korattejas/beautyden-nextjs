"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { HiMapPin, HiHome, HiSparkles, HiClock } from "react-icons/hi2";
import Image from "next/image";
import { useSettings } from "@/hooks/useApi";

const serviceAreas = [
  {
    icon: HiMapPin,
    title: "Business Districts",
    description: "Corporate offices and commercial areas",
  },
  {
    icon: HiHome,
    title: "Residential Areas",
    description: "Apartments and private homes",
  },
  {
    icon: HiSparkles,
    title: "Hotels & Venues",
    description: "Luxury hotels and event venues",
  },
  {
    icon: HiClock,
    title: "Flexible Timing",
    description: "Morning to evening appointments",
  },
];

// Fallback image
const fallbackImage =
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

const ServiceAreaSection = () => {
  const { data: settingsData } = useSettings();

  // Get first hero image
  const getHeroImage = () => {
    const slides = settingsData?.homePageSlides;

    if (slides && Array.isArray(slides) && slides.length > 0) {
      return slides[0].image;
    }

    return fallbackImage;
  };

  const heroImage = getHeroImage();

  return (
    <section className="py-16 md:py-24 bg-white overflow-x-hidden">
      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Header */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
              >
                We Come to You
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-lg text-gray-600 leading-relaxed"
              >
                Professional beauty services delivered wherever you are.
                Experience salon-quality treatments at your convenience.
              </motion.p>
            </div>

            {/* Service Areas Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {serviceAreas.map((area, index) => {
                const IconComponent = area.icon;
                return (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors duration-300"
                  >
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        {area.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {area.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                href="/services"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105"
              >
                Book Service Now
              </Button>

              <Button
                href="/contact"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-full font-medium transition-all duration-300"
              >
                Check Coverage
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Side - Image with rounded-3xl */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end"
          >
            {/* Main Image with rounded-3xl */}
            <div className="relative overflow-hidden">
              <div className="w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden shadow-xl border-4 border-white">
                <Image
                  src={heroImage}
                  alt="Professional beauty service"
                  width={400}
                  height={400}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                  priority
                  unoptimized
                />
              </div>

              {/* Service Badge */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl p-4 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <HiMapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      Available Now
                    </div>
                    <div className="text-xs text-gray-500">
                      Serving your area
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="pointer-events-none absolute right-0 top-0 sm:-top-4 sm:-right-4 w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full blur-sm"></div>
              <div className="pointer-events-none absolute left-0 bottom-0 sm:-bottom-8 sm:-left-8 w-10 h-10 sm:w-12 sm:h-12 bg-gray-200/60 rounded-full blur-sm"></div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceAreaSection;
