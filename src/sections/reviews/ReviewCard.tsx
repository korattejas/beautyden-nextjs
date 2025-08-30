"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HiStar, HiPhoto, HiVideoCamera, HiHeart } from "react-icons/hi2";
import Image from "next/image";
import { CustomerReview } from "@/types/reviews";
import ReviewMediaModal from "./ReviewMediaModal";

interface ReviewCardProps {
  review: CustomerReview;
  index: number;
}

const ReviewCard = ({ review, index }: ReviewCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  const rating = review.rating ? parseFloat(review.rating) : 0;
  const hasMedia = review.photos.length > 0 || review.video;

  // Show only first 3 photos as thumbnails
  const thumbnails = review.photos.slice(0, 3);

  const handlePhotoClick = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedPhotoIndex(index);
    setIsModalOpen(true);
  };

  const handleMoreClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelectedPhotoIndex(3);
    setIsModalOpen(true);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        viewport={{ once: true }}
        className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10"
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              {review.customer_photo ? (
                <Image
                  src={review.customer_photo}
                  alt={review.customer_name}
                  width={48}
                  height={48}
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-center">
                  <span className="text-lg font-semibold text-primary">
                    {review.customer_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">
                {review.customer_name}
              </h3>
              <p className="text-sm text-foreground/60">{review.review_date}</p>
            </div>
          </div>

          {hasMedia && (
            <div className="flex gap-2">
              {review.photos.length > 0 && (
                <div className="flex items-center gap-1 text-primary">
                  <HiPhoto className="w-4 h-4" />
                  <span className="text-xs">{review.photos.length}</span>
                </div>
              )}
              {review.video && (
                <div className="flex items-center text-primary">
                  <HiVideoCamera className="w-4 h-4" />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <HiStar
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? "text-yellow-400" : "text-gray-200"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm font-medium">{rating}.0</span>
          </div>
        )}

        {/* Review Text */}
        {review.review && (
          <p className="text-foreground/80 mb-4 leading-relaxed">
            &quot;{review.review}&quot;
          </p>
        )}

        {/* Photos Grid - Show max 3 thumbnails */}
        {thumbnails.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            {thumbnails.map((photo, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-lg overflow-hidden bg-gray-100 cursor-pointer group"
                onClick={(e) => handlePhotoClick(idx, e)}
              >
                <Image
                  src={photo}
                  alt={`Review photo ${idx + 1}`}
                  width={150}
                  height={150}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                />
              </div>
            ))}

            {/* Show remaining count if more than 3 photos */}
            {review.photos.length > 3 && (
              <div
                className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center text-foreground/60 cursor-pointer hover:bg-gray-200 transition-colors duration-300"
                onClick={handleMoreClick}
              >
                <div className="text-center">
                  <HiPhoto className="w-6 h-6 mx-auto mb-1" />
                  <span className="text-sm font-medium">
                    +{review.photos.length - 3}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Video Thumbnail */}
        {review.video && (
          <div className="mb-4">
            <div
              className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 cursor-pointer group"
              onClick={() => setIsModalOpen(true)}
            >
              <video className="w-full h-full object-cover" muted>
                <source src={review.video} type="video/mp4" />
              </video>
              {/* Play button overlay */}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-all duration-300">
                <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                  <HiVideoCamera className="w-8 h-8 text-gray-800 ml-1" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-primary/10">
          <div className="text-sm text-foreground/60">
            {review.service_name && `Service: ${review.service_name}`}
          </div>
          <button className="flex items-center gap-2 text-sm text-foreground/60 hover:text-primary transition-colors">
            <HiHeart className="w-4 h-4" />
            Helpful ({review.helpful_count})
          </button>
        </div>
      </motion.div>

      {/* Media Modal */}
      <ReviewMediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        photos={review.photos}
        video={review.video}
        initialIndex={selectedPhotoIndex}
        customerName={review.customer_name}
        customerPhoto={review.customer_photo}
        reviewText={review.review}
        rating={rating}
        reviewDate={review.review_date}
        serviceName={review.service_name}
        helpfulCount={review.helpful_count}
      />
    </>
  );
};

export default ReviewCard;
