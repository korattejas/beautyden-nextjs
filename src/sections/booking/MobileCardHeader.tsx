"use client";

import { HiShoppingBag, HiArrowRight } from "react-icons/hi2";

interface MobileCartHeaderProps {
  totalItems: number;
  totalPrice: number;
  onNext: () => void;
}

const MobileCartHeader = ({ totalItems, totalPrice, onNext }: MobileCartHeaderProps) => {
  if (totalItems === 0) return null; // Hide if no items selected

  return (
    <div
      className="sticky top-[56px] sm:top-[64px] md:hidden 
                 z-40 bg-white/95 backdrop-blur-md 
                 border-b border-border shadow-md 
                 px-4 py-2 flex items-center rounded-lg justify-between"
    >
      {/* Left side */}
      <div className="flex items-center gap-2">
        <HiShoppingBag className="w-5 h-5 text-primary" />
        <span className="text-sm font-medium text-foreground">
          {totalItems} {totalItems > 1 ? "services" : "service"}
        </span>
        <span className="text-sm font-semibold text-primary">
          ₹{totalPrice.toLocaleString()}
        </span>
      </div>

      {/* Right side */}
      <button
        onClick={onNext}
        className="bg-primary text-white text-xs px-3 py-1.5 rounded-lg 
                   flex items-center gap-1 
                   hover:bg-primary/90 active:scale-95 transition"
      >
        Continue
        <HiArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MobileCartHeader;
