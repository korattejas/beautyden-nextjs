"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HiStar, HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp, FaYoutube } from "react-icons/fa";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useRef, useState, useEffect } from "react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useReviews, useSettings } from "@/hooks/useApi";
import { Review } from "@/types/reviews";

const TestimonialsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: reviewsData, isLoading, error } = useReviews({ page: currentPage });
  const { data: settingsData } = useSettings();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasLoadedMore, setHasLoadedMore] = useState(false);

  // Reset hasLoadedMore when new data arrives
  useEffect(() => {
    if (reviewsData?.data?.data) {
      setHasLoadedMore(false);
    }
  }, [reviewsData?.data?.data]);

  const reviews: Review[] = reviewsData?.data?.data || [];

  const getSetting = (key: string): string | undefined => {
    return settingsData?.data?.find((s) => s.key === key)?.value;
  };

  const normalizeUrl = (url?: string): string | undefined => {
    if (!url) return undefined;
    if (url.startsWith("http://") || url.startsWith("https://")) return url;
    return `https://${url}`;
  };

  const ratingFromSettings = getSetting("rating");
  const ratingDisplay = (() => {
    const parsed = parseFloat(ratingFromSettings || "");
    if (isNaN(parsed)) return "4.5";
    return parsed.toFixed(1);
  })();

  const facebookUrl = normalizeUrl(getSetting("facebook_id"));
  const instagramUrl = normalizeUrl(getSetting("instagram_id"));
  const whatsappUrl = getSetting("whatsapp_phone_number");
  const youtubeUrl = normalizeUrl(getSetting("youtub_id"));

  const getInitials = (name: string): string => {
    if (!name) return "UN";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  const renderStars = (rating: string | null) => {
    const ratingNum = parseFloat(rating || "0");
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <HiStar
            key={index}
            className={`w-3 h-3 sm:w-4 sm:h-4 ${
              index < Math.floor(ratingNum)
                ? "text-orange-400 fill-current"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        </Container>
      </section>
    );
  }

  if (error || reviews.length === 0) {
    return (
      <section className="py-12 sm:py-16 bg-white">
        <Container>
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Love from our customers
            </h2>
            <p className="text-gray-600">No reviews available at the moment</p>
          </div>
        </Container>
      </section>
    );
  }

  const testimonialReviews = reviews
    .filter(
      (review) =>
        review.review && review.rating && parseFloat(review.rating) >= 4
    )
    // .slice(0, 8);

  const totalSlides = Math.ceil(testimonialReviews.length / 2);

  // Handle pagination when reaching the end of current reviews
  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex);
    
    // Check if we're near the end and need to load more reviews
    const currentReviews = testimonialReviews.length;
    const currentSlide = swiper.activeIndex;
    const slidesPerView = 2; // Fixed slides per view for desktop
    const threshold = Math.max(0, currentReviews - slidesPerView * 2);
    
    if (currentSlide >= threshold && !hasLoadedMore && reviewsData?.data?.next_page_url) {
      setCurrentPage(prev => prev + 1);
      setHasLoadedMore(true);
    }
  };

  console.log("testimonialReviews--->",testimonialReviews)

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white overflow-x-hidden">
      <Container>
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">
          {/* Left Side - Stats & Social */}
          <div className="w-full lg:col-span-4 space-y-4 sm:space-y-6 lg:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
                Love from our customers
              </h2>

              {/* Rating Display */}
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <div className="flex items-center gap-1 sm:gap-2">
                  <HiStar className="w-8 h-8 sm:w-10 sm:h-10 text-orange-400 fill-current" />
                  <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900">
                    {ratingDisplay}
                  </span>
                </div>
              </div>

              <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
                {reviewsData?.data?.total || "49.6K"} reviews
              </p>

              {/* Social Links */}
              <div className="mb-4 sm:mb-6">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2 sm:mb-3">
                  Let&apos;s Get Social
                </h3>
                <div className="flex items-center gap-2 sm:gap-3">
                  <a
                    href={facebookUrl || "#"}
                    target={facebookUrl ? "_blank" : undefined}
                    rel={facebookUrl ? "noopener noreferrer" : undefined}
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <FaFacebook className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href={instagramUrl || "#"}
                    target={instagramUrl ? "_blank" : undefined}
                    rel={instagramUrl ? "noopener noreferrer" : undefined}
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <FaInstagram className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                  <a
                  href={`https://wa.me/${whatsappUrl}?text=Hi%20BeautyDen!%20I%20want%20services%20in%20my%20city.`}
                    target={whatsappUrl ? "_blank" : undefined}
                    rel={whatsappUrl ? "noopener noreferrer" : undefined}
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <FaWhatsapp className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                  <a
                    href={youtubeUrl || "#"}
                    target={youtubeUrl ? "_blank" : undefined}
                    rel={youtubeUrl ? "noopener noreferrer" : undefined}
                    className="w-8 h-8 sm:w-9 sm:h-9 bg-gray-100 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <FaYoutube className="w-3 h-3 sm:w-4 sm:h-4" />
                  </a>
                </div>
              </div>

              {/* Rating Breakdown */}
              <div className="mt-4 sm:mt-6">
                <div className="flex items-center gap-2 sm:gap-3 text-base sm:text-lg">
                  <span className="font-bold text-xl sm:text-2xl">4</span>
                  <span className="text-gray-600">/5</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Reviews Carousel */}
          <div className="w-full lg:col-span-8 relative overflow-hidden lg:overflow-visible">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Custom Navigation - Mobile: Top, Desktop: Inline */}
              <div className="flex justify-center lg:justify-start mb-4 sm:mb-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => swiperInstance?.slidePrev()}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors duration-300"
                    disabled={!swiperInstance}
                  >
                    <HiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                  <button
                    onClick={() => swiperInstance?.slideNext()}
                    className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 hover:bg-primary hover:text-white rounded-full flex items-center justify-center transition-colors duration-300"
                    disabled={!swiperInstance}
                  >
                    <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>

              <Swiper
                modules={[Navigation, Autoplay]}
                autoHeight={false} 
                onSwiper={setSwiperInstance}
                onSlideChange={handleSlideChange}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={false}
                spaceBetween={12}
                slidesPerView={1}
                breakpoints={{
                  480: {
                    slidesPerView: 1.2,
                    spaceBetween: 12,
                  },
                  640: {
                    slidesPerView: 1.5,
                    spaceBetween: 16,
                  },
                  768: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                  },
                  1024: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1280: {
                    slidesPerView: 2.2,
                    spaceBetween: 20,
                  },
                }}
                className="reviews-swiper !px-2 sm:!px-0"
                style={{ paddingBottom: "10px" }}
              >
                {testimonialReviews.map((review, index) => (
                  <SwiperSlide key={review.id} className="flex">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100 flex flex-col flex-1 h-[240px] sm:h-[260px] lg:h-[280px]"
                    >
                      {/* Customer Profile */}
                      <div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
                        <div className="relative flex-shrink-0">
                          {review.customer_photo ? (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden">
                              <Image
                                src={review.customer_photo}
                                alt={review.customer_name}
                                width={48}
                                height={48}
                                className="object-cover w-full h-full"
                                unoptimized
                              />
                            </div>
                          ) : (
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center text-xs sm:text-sm font-bold text-primary">
                              {getInitials(review.customer_name)}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-xs sm:text-sm truncate">
                            {review.customer_name}
                          </h4>
                          <div className="mt-1">
                            {renderStars(review.rating)}
                          </div>
                        </div>
                      </div>

                      {/* Review Text */}
                      <div className="flex-1">
                        <p className="text-gray-600 leading-relaxed text-xs sm:text-sm line-clamp-4 sm:line-clamp-5">
                          {review.review ||
                            "Great service! Professional and convenient. The team was punctual and delivered excellent results. Would definitely recommend to others."}
                        </p>
                      </div>

                      {/* Service Info */}
                      {review.service_name && (
                        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                          <p className="text-xs text-primary font-medium truncate">
                            {review.service_name}
                          </p>
                        </div>
                      )}
                    </motion.div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Dots Indicator - Only show on mobile */}
              <div className="flex justify-center mt-4 gap-1 sm:gap-2 lg:hidden">
                {Array.from({ length: Math.min(totalSlides, 5) }).map(
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => swiperInstance?.slideTo(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                        index === activeIndex % 5
                          ? "bg-gray-800"
                          : "bg-gray-300"
                      }`}
                    />
                  )
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
