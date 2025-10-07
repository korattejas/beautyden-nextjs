"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useServiceCategories } from "@/hooks/useApi";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

const CategoryShowcase = () => {
  const { data: categoriesData, isLoading, error } = useServiceCategories();
  const categories = categoriesData?.data || [];

  if (isLoading) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <Container>
          <div className="text-center mb-16">
            <div className="h-8 bg-gray-200 animate-pulse rounded-full max-w-xs mx-auto mb-4" />
            <div className="h-12 bg-gray-200 animate-pulse rounded-2xl max-w-md mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 animate-pulse rounded-full mx-auto mb-4" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-20 mx-auto" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (error) return null;

  const popularCategories = categories
    .filter((category) => category?.is_popular === 1)
    .slice(0, 12);

  if (popularCategories.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-white">
      <Container>
        {/* Simple Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full text-sm font-medium text-gray-700 mb-6"
          >
            <HiSparkles className="w-4 h-4 text-primary" />
            Popular Services
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Choose Your Service
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Professional beauty treatments delivered to your home
          </motion.p>
        </div>

        {/* Simple Grid with Large Circles */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 md:gap-12">
          {popularCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group text-center"
            >
              <Link href={`/services?category=${category.id}`}>
                {/* Large Circular Image */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-full overflow-hidden bg-gray-100 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    {category.icon ? (
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={160}
                        height={160}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-gray-200">
                        <span className="text-3xl md:text-4xl font-bold text-primary">
                          {category.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Hover Arrow */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                      <HiArrowRight className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </div>

                {/* Category Name */}
                <h3 className="text-base md:text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                  {category.name}
                </h3>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Simple CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          {/* <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-primary hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
          >
            View All Services
            <HiArrowRight className="w-5 h-5" />
          </Link> */}
          <Button
                href="/services"
                size="sm"
                className="inline-flex items-center gap-2 bg-primary hover:bg-gray-800 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
              >
                View All Services
                <HiArrowRight className="w-5 h-5" />
              </Button>
        </motion.div>
      </Container>
    </section>
  );
};

export default CategoryShowcase;
