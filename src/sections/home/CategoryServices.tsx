"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useServiceCategories } from "@/hooks/useApi";
import { HiSparkles, HiArrowRight, HiStar } from "react-icons/hi2";
import Container from "@/components/ui/Container";

const CategoryShowcase = () => {
  const { data: categoriesData, isLoading, error } = useServiceCategories();
  const categories = categoriesData?.data || [];

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-background to-muted/10">
        <Container>
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <div className="h-8 sm:h-10 bg-gray-200 animate-pulse rounded-full max-w-sm mx-auto mb-4 sm:mb-6" />
            <div className="h-10 sm:h-12 bg-gray-200 animate-pulse rounded-lg max-w-2xl mx-auto mb-3 sm:mb-4" />
            <div className="h-5 sm:h-6 bg-gray-200 animate-pulse rounded-lg max-w-3xl mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-200 animate-pulse rounded-2xl sm:rounded-3xl mx-auto mb-3 sm:mb-4" />
                <div className="h-3 sm:h-4 bg-gray-200 animate-pulse rounded w-16 sm:w-20 mx-auto" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 sm:py-16 md:py-20">
        <Container>
          <div className="text-center">
            <p className="text-red-500 text-sm sm:text-base">
              Unable to load categories
            </p>
          </div>
        </Container>
      </section>
    );
  }

  const popularCategories = categories
    .filter((category) => category?.is_popular === 1)
    .slice(0, 10);

  if (popularCategories.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-background to-muted/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-primary/5 rounded-full blur-2xl sm:blur-3xl" />
      <div className="absolute bottom-0 right-0 w-28 sm:w-40 h-28 sm:h-40 bg-secondary/5 rounded-full blur-2xl sm:blur-3xl" />

      <Container>
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium text-primary mb-6 sm:mb-8 shadow-lg border border-primary/10"
          >
            <HiSparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            Popular Service Categories
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6"
          >
            <span className="text-foreground">Most Loved</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Beauty Services
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base md:text-lg text-foreground/70 max-w-2xl md:max-w-3xl mx-auto leading-relaxed"
          >
            Discover our most requested and highly-rated beauty services,
            curated based on customer favorites and expert recommendations.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {popularCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.03 }}
              className="group cursor-pointer"
            >
              <Link href={`/services?category=${category.id}`}>
                <div className="bg-white/70 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10 group-hover:border-primary/30 relative">
                  {/* Badge */}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold flex items-center gap-1 shadow-md">
                    <HiStar className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    Popular
                  </div>

                  {/* Icon/Image */}
                  <div className="relative mb-3 sm:mb-4">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md group-hover:shadow-lg transition-all duration-300">
                      {category.icon ? (
                        <Image
                          src={category.icon}
                          alt={category.name}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {category.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-300 text-center text-xs sm:text-sm md:text-base leading-tight">
                    {category.name}
                  </h3>

                  {/* Description */}
                  {category.description && (
                    <p className="hidden sm:block text-xs text-foreground/60 mt-2 line-clamp-2 group-hover:text-foreground/80 transition-colors duration-300 text-center">
                      {category.description}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-12 sm:mt-14 md:mt-16"
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-primary/10">
            <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4">
              Want to Explore More?
            </h3>
            <p className="text-sm sm:text-base text-foreground/70 mb-5 sm:mb-6 max-w-xl md:max-w-2xl mx-auto">
              These are our most popular services, but we offer much more!
              Discover our complete range of professional beauty treatments.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-primary to-secondary text-white px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-sm sm:text-base"
            >
              View All Services
              <HiArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CategoryShowcase;
