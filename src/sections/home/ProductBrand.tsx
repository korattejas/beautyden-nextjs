"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HiMapPin } from "react-icons/hi2";
import Container from "@/components/ui/Container";
import { useSettings, useProductBrands } from "@/hooks/useApi";

const ProductBrand = () => {
  const { data: brandsData, isLoading, error } = useProductBrands();
  const { data: settingsData, isLoading: settingsLoading, error: settingsError } = useSettings();

  const brands = brandsData?.data ?? [];

  if (isLoading || settingsLoading) {
    return (
      <section className="py-16">
        <Container>
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
          </div>
        </Container>
      </section>
    );
  }

  if (error || settingsError || brands.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-12 bg-gradient-to-r from-primary/5 to-secondary/5">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative overflow-hidden"
        >
          {/* Marquee wrapper */}
          <div className="marquee">
            <div className="marquee__inner">
              {brands.concat(brands).map((brand, index) => (
                <div key={index} className="flex-shrink-0 text-center px-4">
                  <div className="w-16 h-16 md:w-20 md:h-20 mx-auto overflow-hidden">
                    {brand.icon ? (
                      <Image
                        src={brand.icon}
                        alt={brand.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-contain"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-gray-200 flex items-center justify-center">
                        <HiMapPin className="w-6 h-6 md:w-8 md:h-8 text-primary/60" />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
      
      <style jsx>{`
        .marquee {
          width: 100%;
          overflow: hidden;
          position: relative;
        }
        
        .marquee__inner {
          display: flex;
          width: fit-content;
          animation: marquee 30s linear infinite;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .marquee:hover .marquee__inner {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default ProductBrand;
