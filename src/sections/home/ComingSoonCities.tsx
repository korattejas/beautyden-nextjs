"use client";

import { motion } from "framer-motion";
import Image from "next/image";
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
import { useCities } from "@/hooks/useHiring";

const ComingSoonCities = () => {
  const { data: citiesData, isLoading, error } = useCities();
  const cities = citiesData?.data ?? [];

  // Filter cities with launch_quarter for upcoming display
  const upcomingCities = cities.filter((city) => city.launch_quarter);

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

  if (error || cities.length === 0 || upcomingCities.length === 0) {
    return null;
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
            <span className="text-foreground">Coming Soon in</span>
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

        {/* Cities Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {upcomingCities.map((city, index) => (
              <motion.div
                key={city.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10 group-hover:border-primary/30">
                  {/* City Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    {city.icon ? (
                      <Image
                        src={city.icon}
                        alt={city.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, (max-width: 1280px) 25vw, 20vw"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                        <HiMapPin className="w-12 h-12 text-primary/40" />
                      </div>
                    )}

                    {/* Coming Soon Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-primary to-secondary text-white px-3 py-2 rounded-full text-sm font-bold shadow-lg">
                      <span className="flex items-center gap-1">
                        <HiSparkles className="w-3 h-3" />
                        Coming Soon
                      </span>
                    </div>
                  </div>

                  {/* City Information - Below Image */}
                  <div className="p-5">
                    <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-1">
                      {city.name}
                    </h4>

                    <div className="flex items-center gap-2 text-foreground/60 mb-3">
                      <HiMapPin className="w-4 h-4 flex-shrink-0" />
                      <p className="text-sm line-clamp-1">
                        {city.area && `${city.area}, `}
                        {city.state}
                      </p>
                    </div>

                    {city.launch_quarter && (
                      <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-2 rounded-full text-sm font-medium">
                        <HiClock className="w-4 h-4" />
                        <span className="text-xs">
                          Expected: {city.launch_quarter}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

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
