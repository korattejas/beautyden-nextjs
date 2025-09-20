"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const heroSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Professional Beauty Services",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Bridal & Party Makeup",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    alt: "Skincare & Wellness",
  },
];

const HeroSection = () => {
  return (
    <section className="bg-white py-12 md:py-20 lg:py-24 min-h-[80vh] flex items-center">
      <Container size="xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6 lg:space-y-8"
          >
            {/* Badge - Rounded */}
            <div className="inline-flex items-center px-6 py-3 bg-gray-100 rounded-full text-sm font-medium text-gray-700">
              <span className="w-3 h-3 bg-primary rounded-full mr-3"></span>
              Trusted by 10,000+ customers
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Professional Beauty
                <br />
                <span className="text-primary">At Your Doorstep</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                Experience premium beauty treatments in the comfort of your
                home. Our certified professionals bring salon-quality services
                directly to you.
              </p>
            </div>

            {/* Features List - Rounded Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center p-4 bg-gray-50 rounded-2xl text-sm">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-primary"
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

              <div className="flex items-center p-4 bg-gray-50 rounded-2xl text-sm">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-primary"
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

              <div className="flex items-center p-4 bg-gray-50 rounded-2xl text-sm">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-primary"
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

              <div className="flex items-center p-4 bg-gray-50 rounded-2xl text-sm">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                  <svg
                    className="w-4 h-4 text-primary"
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
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                href="/services"
                className="bg-primary hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg"
              >
                Book Service Now
              </Button>

              <Button
                href="/contact"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-4 rounded-full font-medium text-lg transition-all duration-300"
              >
                View Pricing
              </Button>
            </div>

            {/* Stats - Rounded Cards */}
            {/* <div className="flex items-center gap-4 pt-6">
              <div className="text-center bg-gray-50 px-6 py-4 rounded-2xl flex-1">
                <div className="text-2xl font-bold text-primary">50K+</div>
                <div className="text-sm text-gray-600">Services Done</div>
              </div>
              <div className="text-center bg-gray-50 px-6 py-4 rounded-2xl flex-1">
                <div className="text-2xl font-bold text-primary">4.8★</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="text-center bg-gray-50 px-6 py-4 rounded-2xl flex-1">
                <div className="text-2xl font-bold text-primary">24/7</div>
                <div className="text-sm text-gray-600">Support</div>
              </div>
            </div> */}
          </motion.div>

          {/* Right Circular Image Slider - Larger and Circular */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Circular Image Container - Larger Size */}
              <div className="relative w-[400px] h-[400px] md:w-[500px] md:h-[500px] lg:w-[550px] lg:h-[550px] xl:w-[600px] xl:h-[600px] rounded-full overflow-hidden shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-4 border-white">
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
                  {heroSlides.map((slide, index) => (
                    <SwiperSlide key={slide.id}>
                      <div className="relative w-full h-full">
                        <Image
                          src={slide.image}
                          alt={slide.alt}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation - Outside the circle */}
                <div className="hero-swiper-button-prev absolute -left-8 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 bg-white hover:bg-gray-50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg border border-gray-200">
                  <svg
                    className="w-6 h-6 text-gray-700"
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

                <div className="hero-swiper-button-next absolute -right-8 top-1/2 transform -translate-y-1/2 z-10 w-14 h-14 bg-white hover:bg-gray-50 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg border border-gray-200">
                  <svg
                    className="w-6 h-6 text-gray-700"
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

                {/* Custom Pagination - Below the circle */}
                <div className="hero-swiper-pagination absolute -bottom-10 left-1/2 transform -translate-x-1/2 z-10 flex gap-2 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-md"></div>
              </div>

              {/* Decorative Circular Elements - Adjusted for larger size */}
              <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary/10 rounded-full blur-lg"></div>
              <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-secondary/10 rounded-full blur-lg"></div>
              <div className="absolute top-1/4 -left-12 w-12 h-12 bg-gray-200/50 rounded-full blur-sm"></div>
              <div className="absolute bottom-1/4 -right-12 w-14 h-14 bg-primary/5 rounded-full blur-md"></div>
            </div>
          </motion.div>
        </div>
      </Container>

      <style jsx>{`
        .hero-swiper-bullet {
          width: 10px;
          height: 10px;
          background: rgba(156, 163, 175, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
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
