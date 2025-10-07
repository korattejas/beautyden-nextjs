"use client";

import { motion } from "framer-motion";
import { HiStar } from "react-icons/hi2";
import Image from "next/image";

import { Review } from "@/types/reviews";

interface ReviewCardProps {
  review: Review;
  index: number;
}

const getInitials = (name: string): string => {
  if (!name) return "UN";
  const parts = name.trim().split(" ");
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const ReviewCard = ({ review, index }: ReviewCardProps) => {
  const rating = review.rating ? parseFloat(review.rating) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-4 sm:p-5 shadow-md border border-gray-100 flex flex-col flex-1"
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
          {rating > 0 && (
            <div className="mt-1 flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <HiStar
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(rating) ? "text-orange-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
          )}
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
  );
};

export default ReviewCard;
