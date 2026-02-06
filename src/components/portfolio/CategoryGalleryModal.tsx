"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiXMark, HiChevronLeft, HiChevronRight, HiViewColumns, HiArrowsPointingOut } from "react-icons/hi2";

interface CategoryGalleryModalProps {
  category: {
    id: number;
    name: string;
    photos: string[];
  } | null;
  onClose: () => void;
}

const CategoryGalleryModal = ({ category, onClose }: CategoryGalleryModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'full'>('grid');
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const minSwipeDistance = 50;

  const photos = category?.photos || [];

  useEffect(() => {
    if (category) {
      setCurrentIndex(0);
      setIsLoading(true);
      setViewMode('grid');
    }
  }, [category]);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  }, [photos.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  }, [photos.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (viewMode === 'full' && e.key === "ArrowLeft") {
      goToPrevious();
    } else if (viewMode === 'full' && e.key === "ArrowRight") {
      goToNext();
    }
  }, [goToPrevious, goToNext, onClose, viewMode]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (viewMode === 'full') {
      if (isLeftSwipe) {
        goToNext();
      } else if (isRightSwipe) {
        goToPrevious();
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!category) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col bg-black rounded-xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-black/80 backdrop-blur-sm text-white border-b border-white/10">
            <div>
              <h2 className="text-xl font-bold">{category.name}</h2>
              <p className="text-sm text-gray-300">{photos.length} photos</p>
            </div>
            <div className="flex items-center gap-2">
              {viewMode === 'full' && photos.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Previous image"
                  >
                    <HiChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    aria-label="Next image"
                  >
                    <HiChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors ml-2"
                aria-label="Close gallery"
              >
                <HiXMark className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div 
            className="flex-1 relative overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {viewMode === 'grid' ? (
              // Thumbnail Grid View
              <div className="w-full h-full overflow-y-auto">
                <div className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative group cursor-pointer rounded-lg overflow-hidden bg-gray-800 border border-gray-700 hover:border-white/30 transition-all duration-300"
                        onClick={() => {
                          setCurrentIndex(index);
                          setViewMode('full');
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setCurrentIndex(index);
                            setViewMode('full');
                          }
                        }}
                        tabIndex={0}
                        role="button"
                        aria-label={`View photo ${index + 1}`}
                      >
                        <div className="aspect-square relative">
                          <img
                            src={photo}
                            alt={`${category.name} - Photo ${index + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                parent.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-gray-700 text-gray-400"><div class="text-center"><div class="text-2xl mb-1">📸</div><div class="text-xs">Image not available</div></div></div>';
                              }
                            }}
                          />
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                          <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center">
                            <HiArrowsPointingOut className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Full View
              <>
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                )}

                <div className="relative w-full h-full">
                  <img
                    src={photos[currentIndex]}
                    alt={`${category.name} - Image ${currentIndex + 1}`}
                    className="absolute inset-0 w-full h-full object-contain select-none"
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsLoading(false)}
                    draggable={false}
                  />
                </div>

                {/* Navigation Arrows for Full View */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevious}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                      aria-label="Previous image"
                    >
                      <HiChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
                      aria-label="Next image"
                    >
                      <HiChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-black/80 backdrop-blur-sm text-white border-t border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-white text-black' 
                    : 'bg-white/10 hover:bg-white/20'
                }`}
              >
                <HiViewColumns className="w-4 h-4 inline mr-1" />
                Grid View
              </button>
              {viewMode === 'full' && (
                <span className="text-sm text-gray-300">
                  {currentIndex + 1} of {photos.length}
                </span>
              )}
            </div>
            
            {viewMode === 'grid' && (
              <div className="text-sm text-gray-300">
                Click any photo to view full size
              </div>
            )}
            
            {viewMode === 'full' && photos.length > 1 && (
              <div className="flex gap-2">
                {photos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentIndex ? "bg-white" : "bg-white/30"
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CategoryGalleryModal;