"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import {
  HiUsers,
  HiStar,
  HiMapPin,
  HiSparkles,
  HiClock,
} from "react-icons/hi2";
import { useHomeCounters, useSettings } from "@/hooks/useApi";

// Icon mapping based on label names
const getIconForLabel = (label: string) => {
  const iconMap = {
    "Happy Clients": HiUsers,
    "Average Rating": HiStar,
    "Cities Served": HiMapPin,
    "Expert Professionals": HiSparkles,
    "Customer Support": HiClock,
  };

  // Find matching icon or return default
  const matchedKey = Object.keys(iconMap).find((key) =>
    label.toLowerCase().includes(key.toLowerCase().split(" ")[0])
  );

  return matchedKey ? iconMap[matchedKey as keyof typeof iconMap] : HiSparkles;
};

// Get description based on label
const getDescriptionForLabel = (label: string, value: string) => {
  const descriptions = {
    "Happy Clients": "Satisfied clients who trust our services",
    "Average Rating": "Based on thousands of genuine reviews",
    "Cities Served": "Expanding across major cities in India",
    "Expert Professionals": "Certified and experienced beauty experts",
    "Customer Support": "Available round the clock for assistance",
  };

  const matchedKey = Object.keys(descriptions).find((key) =>
    label.toLowerCase().includes(key.toLowerCase().split(" ")[0])
  );

  return matchedKey
    ? descriptions[matchedKey as keyof typeof descriptions]
    : "Excellence in beauty services";
};

const AboutStats = () => {
  const { data: countersData, isLoading, error } = useHomeCounters();
  const { data: settingsData } = useSettings();

  const settings = settingsData?.data || [];
  const getSetting = (key: string) => {
    const setting = settings.find((s) => s.key === key);
    return setting?.value || "";
  };

  const stats = countersData?.data || [];

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <Container>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-primary">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-lg font-medium">
                Loading achievements...
              </span>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (error || stats.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
        <Container>
          <div className="text-center">
            <p className="text-red-500">Unable to load statistics</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-br from-primary/5 to-secondary/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

      <Container>
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium text-primary mb-6 shadow-lg border border-primary/10"
          >
            <HiStar className="w-4 h-4" />
            Our Success Story
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-foreground">Our</span>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-3">
              Achievements
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base sm:text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed px-4"
          >
            Numbers that speak for our commitment to excellence and customer
            satisfaction in the beauty industry.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = getIconForLabel(stat.label);
            const description = getDescriptionForLabel(stat.label, stat.value);

            return (
              <motion.div
                key={stat.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10 group-hover:border-primary/20 h-full flex flex-col justify-between">
                  <div>
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-r from-primary to-secondary rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                    </div>

                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                      {stat?.label == "Happy Clients" ?
                       getSetting("happy_clients") 
                      : stat?.label == ("Average Rating") ? 
                       getSetting("rating") 
                      : stat.value}
                    </div>

                    <h3 className="font-semibold text-foreground mb-3 sm:mb-4 text-sm sm:text-base lg:text-lg">
                      {stat.label}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
                    {description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default AboutStats;
