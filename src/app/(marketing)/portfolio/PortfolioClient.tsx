"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { HiSparkles } from "react-icons/hi2";

type PortfolioItem = {
  src: string;
};

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

interface PortfolioClientProps {
  portfolioItems: PortfolioItem[];
}

const PortfolioClient = ({ portfolioItems }: PortfolioClientProps) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(12);
  const [missingImages, setMissingImages] = useState<string[]>([]);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const loadingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const filteredItems = useMemo(() => {
    if (!missingImages.length) return portfolioItems;
    const missingSet = new Set(missingImages);
    return portfolioItems.filter((item) => !missingSet.has(item.src));
  }, [portfolioItems, missingImages]);

  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount]
  );

  const loadMoreItems = useCallback(() => {
    if (isLoadingMore || visibleCount >= filteredItems.length) return;

    setIsLoadingMore(true);
    loadingTimeoutRef.current = setTimeout(() => {
      setVisibleCount((prev) =>
        Math.min(prev + 12, filteredItems.length)
      );
      setIsLoadingMore(false);
    }, 500);
  }, [filteredItems.length, isLoadingMore, visibleCount]);

  const handleScroll = useCallback(() => {
    if (typeof window === "undefined") return;

    const threshold = Math.max(
      document.documentElement.scrollHeight - window.innerHeight - 1000,
      0
    );

    if (window.scrollY >= threshold) {
      loadMoreItems();
    }
  }, [loadMoreItems]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  useEffect(() => {
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (activeIndex === null) return;
    if (!filteredItems.length) {
      setActiveIndex(null);
      return;
    }
    if (activeIndex >= filteredItems.length) {
      setActiveIndex(filteredItems.length - 1);
    }
  }, [activeIndex, filteredItems]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,105,180,0.15),_transparent_55%)]" />
        <Container className="relative py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-primary shadow-sm">
              <HiSparkles className="h-4 w-4" />
              BeautyDen Portfolio
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              A Glimpse Into Our Signature Transformations
            </h1>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              Explore a curated collection featuring our bridal, editorial, and
              occasion-ready looks. Each makeover blends premium products with
              expert artistry to bring your vision to life.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-12 md:py-16">
        <Container>
          <div className="mb-10 flex flex-col gap-2 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
              Handpicked Highlights
            </h2>
            <p className="text-sm text-gray-500 md:text-base">
              Tap on any look to see the details up close inside the lightbox
              gallery.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {visibleItems.map((item, localIndex) => {
              const globalIndex = filteredItems.findIndex(
                (p) => p.src === item.src
              );
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setActiveIndex(globalIndex)}
                  className="group relative overflow-hidden rounded-2xl bg-gray-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={item.src}
                      alt="Portfolio image"
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      loading={localIndex < 12 ? "eager" : "lazy"}
                      sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      onError={() =>
                        setMissingImages((prev) =>
                          prev.includes(item.src)
                            ? prev
                            : [...prev, item.src]
                        )
                      }
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>
                </button>
              );
            })}
          </div>
        </Container>
      </section>

      {isLoadingMore && visibleItems.length < filteredItems.length && (
        <div className="flex justify-center py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
        </div>
      )}

      {activeIndex !== null && (
        <Lightbox
          open={activeIndex !== null}
          close={() => setActiveIndex(null)}
          index={activeIndex}
          slides={filteredItems.map((item) => ({
            src: item.src,
          }))}
        />
      )}
    </div>
  );
};

export default PortfolioClient;

