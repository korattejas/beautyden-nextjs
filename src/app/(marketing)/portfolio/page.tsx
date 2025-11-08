"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { HiSparkles } from "react-icons/hi2";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

// Generate portfolio items from p-1.jpg to p-97.jpg
const generatePortfolioItems = () => {
  const items = [];
  const titles = [
    "Bridal Glam", "Editorial Look", "Cocktail Party", "Mehendi Ceremony",
    "Natural Radiance", "Glam Editorial", "Sangeet Glow", "Classic Beauty",
    "Evening Elegance", "Daytime Fresh", "Festive Glow", "Studio Shoot",
    "Wedding Ready", "Party Perfect", "Natural Beauty", "Glamorous Look"
  ];
  const descriptions = [
    "Signature bridal makeover with luminous finish.",
    "High-fashion editorial styling for magazine shoot.",
    "Soft glam makeover perfect for evening events.",
    "Vibrant festive makeover for pre-wedding ritual.",
    "Minimal makeup with dewy glow for daytime occasions.",
    "Dramatic eyes with glossy lips for studio shoot.",
    "Radiant evening look with shimmer accents.",
    "Timeless makeup featuring bold liner and soft curls.",
    "Elegant evening transformation.",
    "Fresh and natural daytime look.",
    "Festive celebration ready.",
    "Professional studio photography look.",
    "Complete wedding day transformation.",
    "Perfect for any party occasion.",
    "Natural beauty enhancement.",
    "Glamorous and sophisticated style."
  ];

  for (let i = 1; i <= 97; i++) {
    items.push({
      src: `/images/portfolio/p-${i}.jpg`,
      // title: titles[(i - 1) % titles.length] + ` ${i}`,
      // description: descriptions[(i - 1) % descriptions.length],
    });
  }
  return items;
};

const portfolioItems = generatePortfolioItems();

export default function PortfolioPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(12); // Start with 12 images

  // Load more images on scroll
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1000) {
      setVisibleCount((prev) => Math.min(prev + 12, portfolioItems.length));
    }
  };

  // Load more images on scroll
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const visibleItems = useMemo(() => portfolioItems.slice(0, visibleCount), [visibleCount]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
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
              Explore a curated collection featuring our bridal, editorial, and occasion-ready looks.
              Each makeover blends premium products with expert artistry to bring your vision to life.
            </p>
          </div>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="mb-10 flex flex-col gap-2 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
              Handpicked Highlights
            </h2>
            <p className="text-sm text-gray-500 md:text-base">
              Tap on any look to see the details up close inside the lightbox gallery.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {visibleItems.map((item, localIndex) => {
              const globalIndex = portfolioItems.findIndex(p => p.src === item.src);
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
                    alt={`Portfolio image ${localIndex + 1}`}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    loading={localIndex < 12 ? "eager" : "lazy"}
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 transition group-hover:opacity-100" />
                </div>
                {/* <div className="absolute inset-x-0 bottom-0 z-10 p-4 text-left text-white">
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="text-xs text-white/80">{item.description}</p>
                </div> */}
              </button>
              );
            })}
          </div>
        </Container>
      </section>

      {activeIndex !== null && (
        <Lightbox
          open={activeIndex !== null}
          close={() => setActiveIndex(null)}
          index={activeIndex}
          slides={portfolioItems.map((item) => ({
            src: item.src,
            // description: item.description,
          }))}
        />
      )}
    </div>
  );
}



