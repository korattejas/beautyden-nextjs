"use client";

import { HiShoppingBag, HiArrowRight } from "react-icons/hi2";

interface MobileCartHeaderProps {
  totalItems: number;
  totalPrice: number;
  onNext: () => void;
}

const MobileCartHeader = ({ totalItems, totalPrice, onNext }: MobileCartHeaderProps) => {
  // Always show the header, even when no items (but with different styling)
  if (totalItems === 0) {
    return (
      <div
        className="sticky top-0 lg:hidden 
                   z-50 bg-white/95 backdrop-blur-md 
                   border-b border-border shadow-lg 
                   px-4 py-4 flex items-center rounded-lg justify-between
                   mx-4 -mx-4"
      >
        <div className="flex items-center gap-2">
          <HiShoppingBag className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-foreground/60">
            No services selected
          </span>
        </div>
        <button
          disabled
          className="bg-gray-300 text-gray-500 text-sm px-4 py-2 rounded-lg 
                     flex items-center gap-2 font-semibold cursor-not-allowed"
        >
          Continue
          <HiArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      className="sticky top-0 lg:hidden 
                 z-50 bg-white/95 backdrop-blur-md 
                 border-b border-border shadow-lg 
                 px-4 py-4 flex items-center rounded-lg justify-between
                 mx-4 -mx-4"
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
        className="bg-gradient-to-r from-primary to-secondary text-white text-sm px-4 py-2 rounded-lg 
                   flex items-center gap-2 font-semibold
                   hover:from-primary/90 hover:to-secondary/90 active:scale-95 transition-all duration-200
                   shadow-lg hover:shadow-xl"
      >
        Continue
        <HiArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default MobileCartHeader;
