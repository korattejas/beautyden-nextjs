"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useReviews } from "@/hooks/useApi";
import { Review } from "@/types/reviews";

const TestimonialsSection = () => {
  // Fetch reviews - limit to first page for testimonials
  const { data: reviewsData, isLoading, error } = useReviews({ page: 1 });

  // Fix: Access nested data structure correctly
  const reviews: Review[] = reviewsData?.data?.data || [];

  // Helper function to get customer initials
  const getInitials = (name: string): string => {
    if (!name) return "UN";
    const names = name.trim().split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Helper function to render stars
  const renderStars = (rating: string | null) => {
    const ratingNum = parseFloat(rating || "0");
    const fullStars = Math.floor(ratingNum);
    const hasHalfStar = ratingNum % 1 !== 0;

    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) => (
          <HiStar
            key={index}
            className={`w-5 h-5 ${
              index < fullStars
                ? "text-warning fill-current"
                : index === fullStars && hasHalfStar
                ? "text-warning/50 fill-current"
                : "text-muted"
            }`}
          />
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <section className="py-16 relative bg-background">
        <Container>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-primary">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-lg font-medium">
                Loading testimonials...
              </span>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (error || reviews.length === 0) {
    return (
      <section className="py-16 relative bg-background">
        <Container>
          <div className="text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="font-heading text-4xl md:text-5xl font-bold mb-4"
            >
              What Our Clients Say
            </motion.h2>
            <p className="text-lg text-foreground/70 mb-8">
              No reviews available at the moment
            </p>
          </div>
        </Container>
      </section>
    );
  }

  // Filter and limit reviews for testimonials (only show reviews with text and good ratings)
  const testimonialReviews = reviews
    .filter(
      (review) =>
        review.review && review.rating && parseFloat(review.rating) >= 4
    )
    .slice(0, 9); // Limit to 9 reviews for better performance

  return (
    <section className="py-16 bg-muted/20 relative">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

      <Container>
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-card backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium text-primary mb-6 shadow-lg border border-border"
          >
            <HiStar className="w-4 h-4" />
            Customer Reviews
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-foreground">What Our</span>
            <br />
            <span className="text-primary">Clients Say</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-foreground/70 max-w-2xl mx-auto"
          >
            Real feedback from our happy clients who experienced our
            professional beauty services
          </motion.p>
        </div>

        {/* Swiper Slider */}
        {testimonialReviews.length > 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1024: { slidesPerView: 3, spaceBetween: 30 },
              }}
              className="testimonials-swiper"
              style={{ paddingBottom: "50px" }}
            >
              {testimonialReviews.map((review, index) => (
                <SwiperSlide key={review.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-card backdrop-blur-md p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border border-border group h-full flex flex-col justify-between"
                  >
                    {/* Rating */}
                    <div className="flex items-center mb-6">
                      {renderStars(review.rating)}
                      <span className="ml-2 text-sm text-foreground/60 font-medium">
                        ({review.rating || "0"}/5)
                      </span>
                    </div>

                    {/* Review Text */}
                    <div className="flex-1 mb-6">
                      <p className="text-foreground/80 leading-relaxed text-lg italic">
                        &quot;
                        {review.review || "Great service! Highly recommended."}
                        &quot;
                      </p>
                    </div>

                    {/* Client Info */}
                    <div className="flex items-center gap-4 pt-4 border-t border-border">
                      <div className="relative">
                        {review.customer_photo ? (
                          <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                            <Image
                              src={review.customer_photo}
                              alt={review.customer_name}
                              width={56}
                              height={56}
                              className="object-cover w-full h-full"
                              unoptimized
                            />
                          </div>
                        ) : (
                          <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-lg font-bold text-primary ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-300">
                            {getInitials(review.customer_name)}
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <h4 className="font-bold text-foreground text-lg group-hover:text-primary transition-colors duration-300">
                          {review.customer_name}
                        </h4>
                        <p className="text-primary/80 font-medium text-sm">
                          {review.service_name || "Beauty Service"}
                        </p>
                        <p className="text-foreground/50 text-xs mt-1">
                          {new Date(review.review_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                            }
                          )}
                        </p>
                      </div>

                      {/* Popular Badge */}
                      {review.is_popular === 1 && (
                        <div className="bg-warning text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Popular
                        </div>
                      )}
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-foreground/60 text-lg">
              No testimonials available at the moment.
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-foreground/70 mb-6">
            Join thousands of satisfied customers who trust us with their beauty
            needs
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-foreground/60">
            <div className="flex items-center gap-2">
              <HiStar className="w-4 h-4 text-warning" />
              <span>4.9+ Average Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>{reviewsData?.data?.total || 500}+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>100+ Expert Professionals</span>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* Custom Swiper Styles */}
      <style jsx global>{`
        .testimonials-swiper .swiper-pagination {
          bottom: 10px !important;
        }

        .testimonials-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: var(--color-primary);
          opacity: 0.3;
          transition: all 0.3s ease;
        }

        .testimonials-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          transform: scale(1.2);
        }

        .testimonials-swiper .swiper-slide {
          height: auto;
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
