"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { motion } from "framer-motion";

const ServiceCardSkeleton = ({ index }: { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border border-primary/10"
    >
      {/* Image Skeleton */}
      <div className="aspect-[4/3] relative">
        <Skeleton className="w-full h-full" />
        {/* Category Badge Skeleton */}
        <div className="absolute top-4 left-4">
          <Skeleton className="w-16 h-6 rounded-full" />
        </div>
        {/* Rating Badge Skeleton */}
        <div className="absolute top-4 right-4">
          <Skeleton className="w-12 h-6 rounded-full" />
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4 mb-3" />

        {/* Description Skeleton */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-4" />

        {/* Service Details Skeleton */}
        <div className="flex items-center justify-between mb-4">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Features Skeleton */}
        <div className="flex flex-wrap gap-2 mb-6">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>

        {/* Price and Button Skeleton */}
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-10 w-24 rounded-full" />
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCardSkeleton;
