"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { motion } from "framer-motion";

const HiringCardSkeleton = ({ index }: { index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg border border-primary/10 h-full flex flex-col"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="w-12 h-12 rounded-xl" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>

      {/* Title and Description */}
      <Skeleton className="h-6 w-3/4 mb-3" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-4/5 mb-4" />

      {/* Skills */}
      <div className="mb-6">
        <Skeleton className="h-4 w-24 mb-3" />
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-14 rounded-full" />
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-6 flex-grow">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-36" />
      </div>

      {/* Button */}
      <Skeleton className="h-12 w-full rounded-full" />
    </motion.div>
  );
};

export default HiringCardSkeleton;
