"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HiSparkles, HiUsers, HiTrophy, HiHeart } from "react-icons/hi2";
import { HiringFilters as FilterTypes } from "@/types/hiring";
import { useHiring } from "@/hooks/useHiring";
import HiringHero from "@/sections/hiring/HiringHero";
import HiringFilters from "@/sections/hiring/HiringFilters";
import HiringCardSkeleton from "@/sections/hiring/loading/HiringCardSkeleton";
import HiringList from "@/sections/hiring/HiringList";
import { useDebounce } from "@/hooks/useDebounce";

export default function HiringPageContent() {
  const [filters, setFilters] = useState<FilterTypes>({
    search: "",
    city: "",
    experienceLevel: "",
  });

  // Debounce search to avoid too many API calls
  const debouncedFilters = useDebounce(filters, 500);

  const { data, error, isLoading } = useHiring(debouncedFilters);

  const jobs = data?.data ?? [];

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">💼</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Unable to load job listings
          </h2>
          <p className="text-foreground/60 mb-6">
            We&apos;re having trouble loading our current openings. Please try
            again.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <HiringHero />

      <section className="py-8">
        <Container>
          <HiringFilters filters={filters} onFiltersChange={setFilters} />
        </Container>
      </section>

      {isLoading ? (
        <section className="pb-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array.from({ length: 6 }, (_, index) => (
                <HiringCardSkeleton key={index} index={index} />
              ))}
            </div>
          </Container>
        </section>
      ) : (
        <>
          {jobs.length === 0 ? (
            <section className="pb-20">
              <Container>
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    No jobs match your criteria
                  </h3>
                  <p className="text-foreground/60 mb-6">
                    Try adjusting your filters or check back later for new
                    opportunities.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({ search: "", city: "", experienceLevel: "" })
                    }
                    className="bg-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300"
                  >
                    Clear All Filters
                  </button>
                </div>
              </Container>
            </section>
          ) : (
            <HiringList jobs={jobs} />
          )}
        </>
      )}

      {/* Custom Bottom Section */}
      <section className="py-20 bg-muted/20">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-6">
              <HiSparkles className="w-4 h-4" />
              Why Join BeautyDen?
            </div>

            <h2 className="text-4xl md:text-5xl sm:text-3xl font-bold text-foreground mb-6">
              Build Your Career with Us
            </h2>

            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              Join our growing team of beauty professionals and be part of
              India&apos;s leading at-home beauty service platform. We offer
              competitive packages, flexible schedules, and opportunities for
              growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HiUsers className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Great Team
              </h3>
              <p className="text-foreground/70">
                Work with passionate professionals who love what they do
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HiTrophy className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Growth Opportunities
              </h3>
              <p className="text-foreground/70">
                Advance your career with training programs and skill development
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-warning/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HiSparkles className="w-8 h-8 text-warning" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Flexible Schedule
              </h3>
              <p className="text-foreground/70">
                Choose your working hours and maintain work-life balance
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-success/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HiHeart className="w-8 h-8 text-success" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Competitive Benefits
              </h3>
              <p className="text-foreground/70">
                Attractive salary packages with performance bonuses and benefits
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-foreground/60 mb-6">
              Ready to start your journey with BeautyDen? Apply now and join our
              amazing team!
            </p>
            <button
              onClick={() => {
                const message =
                  "Hi! I'm interested in career opportunities at BeautyDen. Could you please provide more information?";
                const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
                  message
                )}`;
                window.open(whatsappUrl, "_blank");
              }}
              className="bg-primary text-white px-8 py-4 rounded-full font-semibold hover:bg-primary/90 transition-all duration-300 inline-flex items-center gap-2"
            >
              <HiSparkles className="w-5 h-5" />
              Start Your Journey
            </button>
          </motion.div>
        </Container>
      </section>
    </div>
  );
}


