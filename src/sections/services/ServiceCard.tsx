"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { HiStar, HiClock, HiArrowRight, HiSparkles } from "react-icons/hi2";
import Image from "next/image";
// import { formatPrice } from "@/data";
import { Service } from "@/services/services.service";

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard = ({ service, index }: ServiceCardProps) => {
  // Calculate pricing display
  const hasDiscount =
    service.discount_price &&
    parseFloat(service.discount_price) > 0 &&
    parseFloat(service.discount_price) < parseFloat(service.price);

  const displayPrice = hasDiscount
    ? parseFloat(service.discount_price!)
    : parseFloat(service.price);

  const originalPrice = parseFloat(service.price);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.05 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border border-primary/10 hover:border-primary/20 h-full flex flex-col"
    >
      {/* Service Image */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <Image
          src={service.icon || defaultImageForCategory(service.category_name)}
          alt={service.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
          unoptimized
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-xs font-semibold text-primary">
          {service.category_name}
        </div>

        {/* Rating Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full px-2 py-1 flex items-center gap-1 text-sm font-medium">
          <HiStar className="text-yellow-400 w-3 h-3" />
          <span className="text-xs">{service.rating || "N/A"}</span>
        </div>

        {/* Popular Badge */}
        {service?.is_popular === 1 && (
          <div className="absolute bottom-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <HiSparkles className="w-3 h-3" />
            Popular
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Title */}
        <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {service.name}
        </h3>

        {/* Description */}
        <p className="text-foreground/70 text-sm mb-3 line-clamp-2 leading-relaxed">
          {service.description}
        </p>

        {/* Duration and Reviews */}
        <div className="flex items-center justify-between mb-3 text-xs text-foreground/60">
          <div className="flex items-center gap-1">
            <HiClock className="w-3 h-3" />
            <span>{service.duration}</span>
          </div>
          <span>{service.reviews || 0} reviews</span>
        </div>

        {/* Includes - Show max 3 */}
        {service.includes && service.includes.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {service.includes.slice(0, 3).map((feature, i) => (
              <span
                key={i}
                className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full font-medium"
              >
                {feature}
              </span>
            ))}
            {service.includes.length > 3 && (
              <span className="text-xs text-foreground/50 self-center">
                +{service.includes.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Pricing and Book Button */}
        <div className="mt-auto">
          {/* Price Display */}
          <div className="mb-3">
            <div className="flex items-baseline gap-2">
              <span className="text-sm font-medium text-foreground/70">
                Starts at
              </span>
              <span className="text-xl font-bold text-primary">
                ₹{displayPrice.toLocaleString()}
              </span>
            </div>

            {/* Strike-through original price if there's a discount */}
            {hasDiscount && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-foreground/50 line-through">
                  ₹{originalPrice.toLocaleString()}
                </span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-semibold">
                  Save ₹{(originalPrice - displayPrice).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Book Button */}
          <Button
            href={`/book?service=${service.id}`}
            size="sm"
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-secondary text-white py-2.5 font-semibold hover:scale-105 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Book Now
            <HiArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Default fallback images based on category
function defaultImageForCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    "Hair Services": "/images/services/hair-default.jpg",
    "Face & Skin": "/images/services/facial-default.jpg",
    "Nail Care": "/images/services/nails-default.jpg",
    Makeup: "/images/services/makeup-default.jpg",
    Massage: "/images/services/massage-default.jpg",
    Wellness: "/images/services/wellness-default.jpg",
  };

  return categoryMap[category] || "/images/services/beauty-default.jpg";
}

export default ServiceCard;
