"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HiMapPin, HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import { HiMail } from "react-icons/hi";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { useCities } from "@/hooks/useHiring";
import { useSettings } from "@/hooks/useApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";

const ComingSoonCities = () => {
  const { data: citiesData, isLoading, error } = useCities();
  const { data: settingsData, isLoading: settingsLoading, error: settingsError } = useSettings();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  const cities = citiesData?.data ?? [];
  const upcomingCities = cities.filter((city) => city.status === 1);

  // Helper to read setting by key
  const getSettingValue = (key: string): string => {
    const settings = settingsData?.data || [];
    const found = settings.find((s: any) => s.key === key);
    return found?.value || "";
  };

  const emailId = getSettingValue("email_id");
  const whatsappPhone = getSettingValue("whatsapp_phone_number");

  if (isLoading || settingsLoading) {
    return (
      <section className="py-16">
        <Container>
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        </Container>
      </section>
    );
  }

  if (error || settingsError || cities.length === 0 || upcomingCities.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24">
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Coming Soon
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Beauty services expanding to these cities
          </motion.p>
        </div>

        {/* Cities Slider */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative mb-12"
        >
          {/* Navigation */}
          <div className="flex justify-end gap-4 mb-8">
            <button
              onClick={() => swiperInstance?.slidePrev()}
              className="w-12 h-12 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
              disabled={!swiperInstance}
            >
              <HiArrowLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => swiperInstance?.slideNext()}
              className="w-12 h-12 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-all duration-300 shadow-sm"
              disabled={!swiperInstance}
            >
              <HiArrowRight className="w-5 h-5" />
            </button>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={setSwiperInstance}
            spaceBetween={32}
            slidesPerView={2}
            centeredSlides={true}
            breakpoints={{
              640: {
                slidesPerView: 3,
                spaceBetween: 40,
                centeredSlides: true,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 48,
                centeredSlides: false,
              },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={upcomingCities.length > 3}
            className="!pb-4"
          >
            {upcomingCities.map((city, index) => (
              <SwiperSlide key={city.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group text-center"
                >
                  {/* Circular Image Container */}
                  <div className="relative mb-4">
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 border-4 border-white">
                      {city.icon ? (
                        <Image
                          src={city.icon}
                          alt={city.name}
                          width={160}
                          height={160}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/20 to-gray-200 flex items-center justify-center">
                          <HiMapPin className="w-8 h-8 md:w-10 md:h-10 text-primary/60" />
                        </div>
                      )}
                    </div>

                    {/* Coming Soon Badge */}
                    {/* <div className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-primary text-white px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold shadow-lg">
                      Soon
                    </div> */}
                  </div>

                  {/* City Name */}
                  <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                    {city.name}
                  </h3>

                  {/* State */}
                  <p className="text-sm text-gray-500 mt-1">{city.state}</p>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Simple CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center bg-gray-50 rounded-3xl p-8 md:p-12"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Request Your City
          </h3>

          <p className="text-gray-600 mb-6 max-w-xl mx-auto">
            Don&apos;t see your city? Let us know where you&apos;d like
            BeautyDen next.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={`mailto:${emailId || "contact@beautyden.in"}?subject=Request BeautyDen in My City`}
              className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
            >
              <HiMail className="w-4 h-4" />
              Email Us
            </Button>

            <Button
              href={`https://wa.me/${whatsappPhone || "919876543210"}?text=Hi%20BeautyDen!%20I%20want%20services%20in%20my%20city.`}
              variant="outline"
              className="border-2 border-green-500 hover:bg-green-50 px-6 py-3 rounded-full font-semibold transition-all duration-300 inline-flex items-center gap-2"
            >
              <FaWhatsapp className="w-4 h-4" />
              WhatsApp
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ComingSoonCities;
