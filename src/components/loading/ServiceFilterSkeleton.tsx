"use client";

import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/Skeleton";

const ServiceFilterSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {Array.from({ length: 6 }, (_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Skeleton className="h-12 w-32 rounded-full" />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ServiceFilterSkeleton;
