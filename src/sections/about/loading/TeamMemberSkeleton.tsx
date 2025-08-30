"use client";

import { Skeleton } from "@/components/ui/Skeleton";
import { motion } from "framer-motion";

interface TeamMemberSkeletonProps {
  index: number;
}

const TeamMemberSkeleton = ({ index }: TeamMemberSkeletonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg border border-primary/10"
    >
      {/* Photo Skeleton */}
      <Skeleton className="aspect-square w-full" />

      {/* Content Skeleton */}
      <div className="p-6">
        {/* Name */}
        <Skeleton className="h-6 w-3/4 mb-2" />

        {/* Role */}
        <Skeleton className="h-4 w-1/2 mb-3" />

        {/* Experience */}
        <Skeleton className="h-4 w-2/3 mb-3" />

        {/* Bio */}
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5 mb-4" />

        {/* Specialties */}
        <div className="mb-4">
          <Skeleton className="h-4 w-20 mb-2" />
          <div className="flex gap-2">
            <Skeleton className="h-6 w-16 rounded-full" />
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-14 rounded-full" />
          </div>
        </div>

        {/* Certifications */}
        <Skeleton className="h-4 w-24" />
      </div>
    </motion.div>
  );
};

export default TeamMemberSkeleton;
