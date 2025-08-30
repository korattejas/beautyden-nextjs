"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { motion } from "framer-motion";

const ReviewCardSkeleton = ({ index }: { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-primary/10"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1">
          <Skeleton className="h-4 w-24 mb-2" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="w-4 h-4 rounded" />
        ))}
      </div>

      {/* Review Text */}
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-4" />

      {/* Photos */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Skeleton className="aspect-square rounded-lg" />
        <Skeleton className="aspect-square rounded-lg" />
      </div>

      {/* Footer */}
      <div className="flex justify-between pt-4 border-t border-primary/10">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
    </motion.div>
  );
};

export default ReviewCardSkeleton;
