"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

const heroSlides = [
  {
    id: 1,
    title: "Professional Beauty Services",
    subtitle: "At Your Doorstep",
    description:
      "Experience premium beauty treatments in the comfort of your home.",
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    buttonText: "Book Now",
  },
  {
    id: 2,
    title: "Bridal & Party Makeup",
    subtitle: "Look Stunning",
    description:
      "Transform your special moments with our expert makeup artists.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    buttonText: "Explore Services",
  },
  {
    id: 3,
    title: "Skincare & Wellness",
    subtitle: "Glow Naturally",
    description:
      "Rejuvenate your skin with our premium facials and treatments.",
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    buttonText: "Learn More",
  },
];

const HeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        effect="fade"
        slidesPerView={1}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        pagination={{
          el: ".swiper-pagination-custom",
          clickable: true,
          bulletClass: "swiper-pagination-bullet-custom",
          bulletActiveClass: "swiper-pagination-bullet-active-custom",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1000}
        loop={true}
        className="h-full w-full"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            {/* Background Image */}
            <div className="relative h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/20" />
            </div>

            {/* Content */}
            <div className="absolute inset-0 flex items-center z-10">
              <Container size="full">
                <div className="max-w-2xl">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    viewport={{ once: false }}
                  >
                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 leading-tight">
                      {slide.title}
                      <br />
                      <span className="text-primary">{slide.subtitle}</span>
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed">
                      {slide.description}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        href="/services"
                        size="lg"
                        className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                      >
                        {slide.buttonText}
                      </Button>
                      <Button
                        href="/contact"
                        variant="outline"
                        size="lg"
                        className="border-2 border-white text-white hover:bg-white hover:text-foreground px-8 py-4 rounded-lg font-semibold transition-all duration-300"
                      >
                        Contact Us
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </Container>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation Buttons */}
        <div className="swiper-button-prev-custom absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300">
          <svg
            className="w-6 h-6"
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
        <div className="swiper-button-next-custom absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-20 w-12 h-12 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300">
          <svg
            className="w-6 h-6"
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

        {/* Custom Pagination */}
        <div className="swiper-pagination-custom absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-3"></div>
      </Swiper>
    </section>
  );
};

export default HeroSection;
