"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useSettings } from "@/hooks/useApi";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Fallback slides in case API fails or returns no data
const fallbackSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Professional Beauty Services",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Bridal & Party Makeup",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Skincare & Wellness",
  },
];

const HeroSection = () => {
  const { data: settingsData, isLoading: settingsLoading } = useSettings();
  console.log("settingsData: ", settingsData);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  const settings = settingsData?.data || [];

  // Get homePageSlides from settings
  const getHomePageSlides = () => {
    const slidesData = settings.find(
      (setting: any) => setting.key === "homePageSlides"
    );

    if (slidesData?.value) {
      try {
        const slides =
          typeof slidesData.value === "string"
            ? JSON.parse(slidesData.value)
            : slidesData.value;

        // Transform API slides to match our format
        return slides.map((slide: any, index: number) => ({
          id: index + 1,
          image: slide.image,
          alt: `BeautyDen Professional Service ${index + 1}`,
        }));
      } catch (error) {
        console.error("Error parsing homePageSlides:", error);
        return fallbackSlides;
      }
    }

    return fallbackSlides;
  };

  const heroSlides = getHomePageSlides();
  console.log("heroSlides: ", heroSlides);

  const handleImageError = (slideId: string | number) => {
    setImageError((prev) => ({ ...prev, [slideId]: true }));
  };

  const getImageSrc = (slide: any) => {
    if (imageError[slide.id]) {
      return fallbackSlides[0].image; // Use first fallback image
    }
    return slide.image;
  };

  if (settingsLoading) {
    return (
      <section className="bg-white py-12 md:py-20 lg:py-24 min-h-[80vh] flex items-center">
        <Container size="xl">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white py-8 sm:py-12 md:py-20 lg:py-24 min-h-[70vh] sm:min-h-[100vh] flex items-center">
      <Container size="xl">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1"
          >
            {/* Badge - Rounded */}
            {/* <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 rounded-full text-xs sm:text-sm font-medium text-gray-700">
              <span className="w-2 h-2 sm:w-3 sm:h-3 bg-primary rounded-full mr-2 sm:mr-3"></span>
              Trusted by 10,000+ customers
            </div> */}

            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl  font-bold text-foreground leading-tight">
                Professional Beauty
                <br />
                <span className="text-primary">At Your Doorstep</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                Experience premium beauty treatments in the comfort of your
                home. Our certified professionals bring salon-quality services
                directly to you.
              </p>
            </div>

            {/* Features List - Rounded Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl text-xs sm:text-sm">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">
                  Certified Professionals
                </span>
              </div>

              <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl text-xs sm:text-sm">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">
                  Premium Products
                </span>
              </div>

              <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl text-xs sm:text-sm">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">
                  Flexible Timing
                </span>
              </div>

              <div className="flex items-center p-3 sm:p-4 bg-gray-50 rounded-xl sm:rounded-2xl text-xs sm:text-sm">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-gray-700 font-medium">
                  Safe & Hygienic
                </span>
              </div>
            </div>

            {/* CTA Buttons - Fully Rounded */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <Button
                href="/services"
                className="bg-primary hover:bg-gray-800 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Book Service Now
              </Button>

              <Button
                href="/contact"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg transition-all duration-300"
              >
                View Pricing
              </Button>
            </div>
          </motion.div>

          {/* Right Circular Image Slider - Responsive */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2"
          >
            <div className="relative">
              {/* Circular Image Container - Responsive Size */}
              <div className="relative w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px] rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-2 sm:border-4 border-white">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".hero-swiper-button-next",
                    prevEl: ".hero-swiper-button-prev",
                  }}
                  pagination={{
                    el: ".hero-swiper-pagination",
                    clickable: true,
                    bulletClass: "hero-swiper-bullet",
                    bulletActiveClass: "hero-swiper-bullet-active",
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                  }}
                  speed={800}
                  loop={true}
                  className="w-full h-full"
                >
                  {heroSlides?.map((slide: any, index: number) => (
                    <SwiperSlide key={slide.id}>
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageSrc(slide)}
                          alt={slide.alt}
                          fill
                          className="object-cover"
                          priority={index === 0}
                          onError={() => handleImageError(slide.id)}
                          unoptimized
                          sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 400px, (max-width: 1280px) 450px, 500px"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation - Responsive */}
                <div className="hero-swiper-button-prev absolute -left-4 sm:-left-6 lg:-left-8 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white hover:bg-gray-50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg border border-gray-200">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </div>

                <div className="hero-swiper-button-next absolute -right-4 sm:-right-6 lg:-right-8 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white hover:bg-gray-50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg border border-gray-200">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>

                {/* Custom Pagination - Responsive */}
                <div className="hero-swiper-pagination absolute -bottom-6 sm:-bottom-8 lg:-bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex gap-1 sm:gap-2 bg-white/90 backdrop-blur-sm px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full shadow-md"></div>
              </div>

              {/* Decorative Circular Elements - Responsive */}
              <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 lg:-top-6 lg:-right-6 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-full blur-lg"></div>
              <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-6 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-secondary/10 rounded-full blur-lg"></div>
              <div className="absolute top-1/4 -left-6 sm:-left-8 lg:-left-12 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gray-200/50 rounded-full blur-sm"></div>
              <div className="absolute bottom-1/4 -right-6 sm:-right-8 lg:-right-12 w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14 bg-primary/5 rounded-full blur-md"></div>
            </div>
          </motion.div>
        </div>
      </Container>

      <style jsx>{`
        .hero-swiper-bullet {
          width: 8px;
          height: 8px;
          background: rgba(156, 163, 175, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        @media (min-width: 640px) {
          .hero-swiper-bullet {
            width: 10px;
            height: 10px;
          }
        }

        .hero-swiper-bullet-active {
          background: #000000;
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
