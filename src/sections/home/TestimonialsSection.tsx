"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    service: "Bridal Makeup",
    rating: 5,
    text: "Amazing service! The makeup was perfect and lasted all day. Highly recommend!",
    image:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Kavya Patel",
    service: "Facial Treatment",
    rating: 5,
    text: "My skin feels incredible! The professional was so skilled and gentle.",
    image:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Ananya Singh",
    service: "Hair Styling",
    rating: 5,
    text: "Perfect haircut! The stylist understood exactly what I wanted.",
    image:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=400&q=80",
  },

  {
    id: 11,
    name: "Priya Sharma",
    service: "Bridal Makeup",
    rating: 5,
    text: "Amazing service! The makeup was perfect and lasted all day. Highly recommend!",
    image:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 12,
    name: "Kavya Patel",
    service: "Facial Treatment",
    rating: 5,
    text: "My skin feels incredible! The professional was so skilled and gentle.",
    image:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 13,
    name: "Ananya Singh",
    service: "Hair Styling",
    rating: 5,
    text: "Perfect haircut! The stylist understood exactly what I wanted.",
    image:
      "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?auto=format&fit=crop&w=400&q=80",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16  relative">
      <Container>
        {/* Header */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4"
          >
            What Our Clients Say
          </motion.h2>
          <p className="text-lg text-foreground/70">
            Real feedback from our happy clients
          </p>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mb-12"
          style={{ paddingBottom: "40px" }} // Space for pagination
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={testimonial.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all h-full flex flex-col justify-between"
              >
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <HiStar key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-foreground/80 mb-6 leading-relaxed">
                  &quot;{testimonial.text}&quot;
                </p>

                {/* Client */}
                <div className="flex items-center gap-3 mt-auto">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-primary">
                      {testimonial.service}
                    </p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Container>
    </section>
  );
};

export default TestimonialsSection;
