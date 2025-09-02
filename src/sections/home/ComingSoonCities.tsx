"use client";

import { motion } from "framer-motion";
import {
  HiEnvelope,
  HiChatBubbleLeftRight,
  HiMapPin,
  HiClock,
  HiSparkles,
} from "react-icons/hi2";
import { FaWhatsapp } from "react-icons/fa";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";

import Image from "next/image";
import { useCities } from "@/hooks/useHiring";

const ComingSoonCities = () => {
  const { data: citiesData, isLoading, error } = useCities();
  //   console.log("citiesData: ", citiesData);
  const cities = citiesData?.data ?? [];
  console.log("cities: ", cities);

  // Filter cities to show upcoming launches (you can modify this logic)
  const upcomingCities = cities.filter((city) => city.launch_quarter);
  const popularCities = cities.filter((city) => city.is_popular === "1");

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-muted/5 to-accent/5">
        <Container>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-primary">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-lg font-medium">Loading cities...</span>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (error || cities.length === 0) {
    return null; // Don't show section if no cities
  }

  return (
    <section className="py-20 bg-gradient-to-br from-muted/5 to-accent/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium text-primary mb-6 shadow-lg border border-primary/10">
            <HiSparkles className="w-4 h-4" />
            Expanding Soon
          </div>

          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">🚀 Coming Soon in</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              These Cities
            </span>
          </h2>

          <p className="text-xl text-foreground/70 leading-relaxed">
            We&apos;re expanding across Gujarat and beyond! Beauty services will
            soon be available in these cities.
          </p>
        </motion.div>

        {/* Popular Cities Grid */}
        {popularCities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              🌟 Popular Upcoming Locations
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularCities.slice(0, 6).map((city, index) => (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {city.icon && (
                      <div className="w-12 h-12 rounded-2xl overflow-hidden bg-primary/10 flex items-center justify-center">
                        <Image
                          src={city.icon}
                          alt={city.name}
                          width={32}
                          height={32}
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">
                        {city.name}
                      </h4>
                      <p className="text-sm text-foreground/60">
                        {city.area}, {city.state}
                      </p>
                    </div>
                  </div>

                  {city.launch_quarter && (
                    <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-2 rounded-full">
                      <HiClock className="w-4 h-4" />
                      Expected: {city.launch_quarter}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* All Upcoming Cities */}
        {cities.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
              📍 All Upcoming Cities
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {cities.map((city, index) => (
                <motion.div
                  key={city.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-primary/10 text-center hover:bg-white/80 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-center mb-2">
                    <HiMapPin className="w-5 h-5 text-primary" />
                  </div>
                  <h5 className="font-semibold text-foreground text-sm mb-1">
                    {city.name}
                  </h5>
                  <p className="text-xs text-foreground/60">{city.state}</p>
                  {city.launch_quarter && (
                    <p className="text-xs text-primary font-medium mt-1">
                      {city.launch_quarter}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-8 md:p-12 border border-primary/20 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="font-heading text-3xl font-bold text-foreground mb-4">
              Want Us in Your City?
            </h3>

            <p className="text-lg text-foreground/70 mb-8 leading-relaxed">
              Don&apos;t see your city listed? We&apos;re always looking to
              expand to new locations. Let us know where you&apos;d like to see
              BeautyDen services next!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                href="mailto:expand@beautyden.com?subject=Request BeautyDen in My City&body=Hi BeautyDen Team,%0A%0AI would like to request BeautyDen services in my city.%0A%0ACity: %0AState: %0A%0AThank you!"
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
              >
                <HiEnvelope className="w-5 h-5" />
                Request Your City
              </Button>

              <Button
                href="https://wa.me/919876543210?text=Hi%20BeautyDen!%20I%20want%20BeautyDen%20services%20in%20my%20city.%20Please%20let%20me%20know%20when%20you'll%20be%20expanding%20to%20my%20area."
                // target="_blank"
                variant="outline"
                className="border-2 border-green-500 text-green-600 hover:bg-green-50 px-8 py-4 rounded-2xl font-semibold transition-all duration-300 inline-flex items-center gap-3"
              >
                <FaWhatsapp className="w-5 h-5" />
                WhatsApp Us
              </Button>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="flex items-center justify-center gap-2 text-foreground/60">
                <HiSparkles className="w-4 h-4 text-primary" />
                Fast Response
              </div>
              <div className="flex items-center justify-center gap-2 text-foreground/60">
                <HiMapPin className="w-4 h-4 text-primary" />
                Strategic Expansion
              </div>
              <div className="flex items-center justify-center gap-2 text-foreground/60">
                <HiChatBubbleLeftRight className="w-4 h-4 text-primary" />
                Community Driven
              </div>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default ComingSoonCities;
