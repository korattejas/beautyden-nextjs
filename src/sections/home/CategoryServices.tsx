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
      <section className="py-20 bg-gradient-to-br from-background to-muted/10">
        <Container>
          <div className="text-center mb-16">
            <div className="h-10 bg-gray-200 animate-pulse rounded-full max-w-sm mx-auto mb-6" />
            <div className="h-12 bg-gray-200 animate-pulse rounded-lg max-w-2xl mx-auto mb-4" />
            <div className="h-6 bg-gray-200 animate-pulse rounded-lg max-w-3xl mx-auto" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }, (_, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-gray-200 animate-pulse rounded-3xl mx-auto mb-4" />
                <div className="h-4 bg-gray-200 animate-pulse rounded w-20 mx-auto" />
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center">
            <p className="text-red-500">Unable to load categories</p>
          </div>
        </Container>
      </section>
    );
  }

  // Only show categories with is_popular="1" and limit to 10

  const popularCategories = categories
    .filter((category) => category?.is_popular === 1)
    .slice(0, 10);

  // Don't render section if no popular categories
  if (popularCategories.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-br from-background to-muted/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

      <Container>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium text-primary mb-8 shadow-lg border border-primary/10"
          >
            <HiSparkles className="w-4 h-4" />
            Popular Service Categories
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-6"
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
            className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our most requested and highly-rated beauty services,
            curated based on customer favorites and expert recommendations
          </motion.p>
        </div>

        {/* Popular Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {popularCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8, scale: 1.05 }}
              className="group cursor-pointer relative"
            >
              <Link href={`/services?category=${category.id}`}>
                <div className="bg-white/70 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10 group-hover:border-primary/30 relative overflow-hidden">
                  {/* Popular Badge - Always show since we're only displaying popular categories */}
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1 shadow-md">
                    <HiStar className="w-3 h-3" />
                    Popular
                  </div>

                  {/* Category Icon/Image */}
                  <div className="relative mb-4">
                    <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10 shadow-md group-hover:shadow-lg transition-all duration-300">
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
                          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {category.name.charAt(0)}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </div>

                  {/* Category Name */}
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300 text-center text-sm leading-tight">
                    {category.name}
                  </h3>

                  {/* Description */}
                  {category.description && (
                    <p className="text-xs text-foreground/60 mt-2 line-clamp-2 group-hover:text-foreground/80 transition-colors duration-300 text-center">
                      {category.description}
                    </p>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All Services CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 border border-primary/10">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Want to Explore More?
            </h3>
            <p className="text-foreground/70 mb-6 max-w-2xl mx-auto">
              These are our most popular services, but we offer much more!
              Discover our complete range of professional beauty treatments.
            </p>
            <Link
              href="/services"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              View All Services
              <HiArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default CategoryShowcase;
