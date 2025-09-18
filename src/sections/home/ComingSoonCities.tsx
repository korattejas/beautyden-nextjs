"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  HiEnvelope,
  HiChatBubbleLeftRight,
  HiMapPin,
  HiClock,
  HiSparkles,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useCities } from "@/hooks/useHiring";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ComingSoonCities = () => {
  const { data: citiesData, isLoading, error } = useCities();
  const cities = citiesData?.data ?? [];

  // Filter cities with launch_quarter for upcoming display
  const upcomingCities = cities.filter((city) => city.launch_quarter);

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-muted/5 to-accent/5">
        <Container>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-primary">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-lg font-medium">Loading cities...</span>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (error || cities.length === 0 || upcomingCities.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-muted/5 to-accent/5 relative overflow-hidden">
    {/* Background Elements */}
    <div className="absolute top-0 left-0 w-24 h-24 md:w-32 md:h-32 bg-primary/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-28 h-28 md:w-40 md:h-40 bg-secondary/5 rounded-full blur-3xl" />
  
    <Container>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl md:max-w-4xl mx-auto mb-12 md:mb-16 px-4"
      >
        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 md:px-6 py-2 md:py-3 rounded-full text-xs md:text-sm font-medium text-primary mb-6 shadow-md border border-primary/10">
          <HiSparkles className="w-4 h-4" />
          Expanding Soon
        </div>
  
        <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4 md:mb-6">
          <span className="text-foreground">Coming Soon in</span>
          <br />
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            These Cities
          </span>
        </h2>
  
        <p className="text-base md:text-xl text-foreground/70 leading-relaxed">
          We&apos;re expanding across Gujarat and beyond! Beauty services will
          soon be available in these cities.
        </p>
      </motion.div>
  
      {/* Cities Slider */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="mb-12 md:mb-16 relative"
      >
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          className="!pb-10 md:!pb-12"
        >
          {/* Prev Button */}
          <div className="swiper-button-prev-custom absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </div>
  
          {/* Next Button */}
          <div className="swiper-button-next-custom absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white cursor-pointer transition-all duration-300">
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
  
          {upcomingCities.map((city, index) => (
            <SwiperSlide key={city.id}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -6 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-primary/10 group-hover:border-primary/30">
                  {/* City Image */}
                  <div className="relative h-40 md:h-48 overflow-hidden">
                    {city.icon ? (
                      <Image
                        src={city.icon}
                        alt={city.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <HiMapPin className="w-10 h-10 md:w-12 md:h-12 text-primary/40" />
                      </div>
                    )}
  
                    {/* Badge */}
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 bg-gradient-to-r from-primary to-secondary text-white px-2.5 md:px-3 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-bold shadow-lg">
                      <span className="flex items-center gap-1">
                        <HiSparkles className="w-3 h-3" />
                        Coming Soon
                      </span>
                    </div>
                  </div>
  
                  {/* Info */}
                  <div className="p-4 md:p-5">
                    <h4 className="text-base md:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {city.name}
                    </h4>
  
                    <div className="flex items-center gap-2 text-foreground/60 mb-2 md:mb-3">
                      <HiMapPin className="w-4 h-4 flex-shrink-0" />
                      <p className="text-xs md:text-sm line-clamp-1">
                        {city.area && `${city.area}, `}
                        {city.state}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
  
          {/* Pagination */}
          <div className="swiper-pagination-custom absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 md:gap-3"></div>
        </Swiper>
      </motion.div>
  
      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl md:rounded-3xl p-6 md:p-12 border border-primary/20 text-center"
      >
        <div className="max-w-2xl md:max-w-3xl mx-auto">
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3 md:mb-4">
            Want Us in Your City?
          </h3>
  
          <p className="text-base md:text-lg text-foreground/70 mb-6 md:mb-8 leading-relaxed px-2 md:px-0">
            Don&apos;t see your city listed? We&apos;re always looking to expand.
            Let us know where you&apos;d like BeautyDen services next!
          </p>
  
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <Button
              href="mailto:expand@beautyden.com?subject=Request BeautyDen in My City&body=Hi BeautyDen Team,%0A%0AI would like to request BeautyDen services in my city.%0A%0ACity: %0AState: %0A%0AThank you!"
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2 md:gap-3 text-sm md:text-base"
            >
              <HiEnvelope className="w-4 h-4 md:w-5 md:h-5" />
              Request Your City
            </Button>
  
            <Button
              href="https://wa.me/919876543210?text=Hi%20BeautyDen!%20I%20want%20BeautyDen%20services%20in%20my%20city.%20Please%20let%20me%20know%20when%20you'll%20be%20expanding%20to%20my%20area."
              variant="outline"
              className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-6 py-3 md:px-8 md:py-4 rounded-xl md:rounded-2xl font-semibold transition-all duration-300 inline-flex items-center gap-2 md:gap-3 text-sm md:text-base"
            >
              <FaWhatsapp className="w-4 h-4 md:w-5 md:h-5" />
              WhatsApp Us
            </Button>
          </div>
  
          <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 text-xs md:text-sm">
            <div className="flex items-center justify-center gap-2 text-foreground/60">
              <HiSparkles className="w-4 h-4 text-primary" />
              Fast Response
            </div>
            <div className="flex items-center justify-center gap-2 text-foreground/60">
              <HiMapPin className="w-4 h-4 text-primary" />
              Strategic Expansion
            </div>
            <div className="flex items-center justify-center gap-2 text-foreground/60">
              <HiChatBubbleLeftRight className="w-4 h-4 text-primary" />
              Community Driven
            </div>
          </div>
        </div>
      </motion.div>
    </Container>
  </section>
  
  );
};

export default ComingSoonCities;
