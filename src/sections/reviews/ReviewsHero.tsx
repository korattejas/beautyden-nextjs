"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HiStar, HiSparkles, HiUsers, HiClock } from "react-icons/hi2";
import { useHomeCounters } from "@/hooks/useApi";

const ReviewsHero = () => {
  const { data: countersData, isLoading, error } = useHomeCounters();

  const counters = countersData?.data || [];

  // Helper function to get counter value by label
  const getCounterValue = (labelKeyword: string) => {
    const counter = counters.find((counter) =>
      counter.label.toLowerCase().includes(labelKeyword.toLowerCase())
    );
    return counter?.value || "N/A";
  };

  // Helper function to get appropriate icon for counter
  const getCounterIcon = (label: string) => {
    const iconMap = {
      rating: HiStar,
      clients: HiUsers,
      customers: HiUsers,
      support: HiClock,
      professionals: HiSparkles,
      experts: HiSparkles,
    };

    const matchedKey = Object.keys(iconMap).find((key) =>
      label.toLowerCase().includes(key)
    );

    return matchedKey
      ? iconMap[matchedKey as keyof typeof iconMap]
      : HiSparkles;
  };

  // Extract specific counters from API
  const ratingValue = getCounterValue("rating");
  const clientsValue = getCounterValue("clients");
  const supportValue = getCounterValue("support");
  const expertsValue =
    getCounterValue("professionals") !== "N/A"
      ? getCounterValue("professionals")
      : getCounterValue("experts");

  return (
    <section className="pt-24 pb-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium text-primary mb-8 shadow-lg border border-primary/10"
          >
            <HiSparkles className="w-4 h-4" />
            Customer Reviews & Testimonials
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-foreground">What Our Clients</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Say About Us
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground/70 mb-8 leading-relaxed"
          >
            Real experiences from real customers who have transformed their
            beauty routine with BeautyDen. Read genuine reviews and see actual
            results from our professional services.
          </motion.p>

          {/* Trust Stats - Dynamic from API */}
          {isLoading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 max-w-md mx-auto"
            >
              {[1, 2, 3].map((i) => (
                <div key={i} className="text-center">
                  <div className="h-10 bg-gray-200 animate-pulse rounded-lg mb-2" />
                  <div className="h-4 bg-gray-200 animate-pulse rounded w-20 mx-auto" />
                </div>
              ))}
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 max-w-md mx-auto"
            >
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-primary">4.9</span>
                  <HiStar className="w-6 h-6 text-yellow-400 ml-1" />
                </div>
                <div className="text-sm text-foreground/60">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100+</div>
                <div className="text-sm text-foreground/60">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-foreground/60">Support</div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto"
            >
              {counters.map((counter, index) => {
                const IconComponent = getCounterIcon(counter.label);
                const isRating = counter.label.toLowerCase().includes("rating");

                return (
                  <motion.div
                    key={counter.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="text-center bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-primary/10 shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-center justify-center mb-2">
                      {isRating ? (
                        <>
                          <span className="text-2xl md:text-3xl font-bold text-primary">
                            {counter.value}
                          </span>
                          <HiStar className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 ml-1" />
                        </>
                      ) : (
                        <>
                          <IconComponent className="w-5 h-5 md:w-6 md:h-6 text-primary mr-2" />
                          <span className="text-2xl md:text-3xl font-bold text-primary">
                            {counter.value}
                          </span>
                        </>
                      )}
                    </div>
                    <div className="text-xs md:text-sm text-foreground/60 font-medium">
                      {counter.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* Additional Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-foreground/60"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Verified Reviews Only</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>Real Customer Experiences</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>Professional Service Quality</span>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ReviewsHero;
