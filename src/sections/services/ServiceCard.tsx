"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { HiStar, HiClock, HiArrowRight } from "react-icons/hi2";
import Image from "next/image";
import { formatPrice } from "@/data";
import { Service } from "@/services/services.service";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-primary-10"
    >
      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={service.icon || defaultImageForCategory(service.category_name)}
          alt={service.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-xs font-medium text-primary capitalize">
          {service.category_name}
        </div>
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 text-sm">
          <HiStar className="text-yellow-400 w-3 h-3" />
          <span>{service.rating ?? "N/A"}</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {service.name}
        </h3>
        <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
          {service.description}
        </p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1 text-foreground/60">
            <HiClock />
            <span className="text-sm">{service.duration}</span>
          </div>
          <div className="text-sm text-foreground/60">
            {service.reviews ?? 0} reviews
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {(service.includes || []).slice(0, 5).map((feat, i) => (
            <span
              key={i}
              className="bg-accent/50 text-primary text-xs px-2 py-1 rounded-full"
            >
              {feat}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-2xl font-bold text-primary">
            {formatPrice(Number(service.discount_price ?? service.price))}
          </span>
          <Button
            href={`/book?service=${service.id}`}
            size="sm"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 font-medium hover:scale-105 transition"
          >
            Book Now <HiArrowRight />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Default fallback images based on category, adjust paths accordingly
function defaultImageForCategory(category: string) {
  console.log("category: ", category);
  const map: Record<string, string> = {
    hair: "/images/services/hair-default.jpg",
    face: "/images/services/face-default.jpg",
    nails: "/images/services/nails-default.jpg",
    makeup: "/images/services/makeup-default.jpg",
    wellness: "/images/services/wellness-default.jpg",
  };
  return map[category] || "/images/services/hair-default.jpg";
}

export default ServiceCard;
