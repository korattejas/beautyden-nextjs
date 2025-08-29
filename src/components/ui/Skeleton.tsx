"use client";

import { cn } from "@/lib/cn";

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className }: SkeletonProps) => {
  return (
    <div
      className={cn(
        "animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%] rounded-md",
        className
      )}
      style={{
        animation: "shimmer 1.5s infinite",
      }}
    />
  );
};

// Add this to your global CSS or in a component
// const shimmerStyles = `
//   @keyframes shimmer {
//     0% {
//       background-position: 200% 0;
//     }
//     100% {
//       background-position: -200% 0;
//     }
//   }
// `;
