"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
  HiMapPin,
  //   HiOfficeBuilding,
  HiHome,
  HiSparkles,
  HiClock,
} from "react-icons/hi2";
import Image from "next/image";

const serviceAreas = [
  {
    icon: HiMapPin,
    title: "Business Districts",
    description: "Corporate offices, co-working spaces, and commercial areas",
    color: "from-blue-400 to-blue-600",
  },
  {
    icon: HiHome,
    title: "Residential Areas",
    description: "Apartments, condos, and private homes across the city",
    color: "from-green-400 to-green-600",
  },
  {
    icon: HiSparkles,
    title: "Hotels & Venues",
    description: "Luxury hotels, event venues, and destination locations",
    color: "from-purple-400 to-purple-600",
  },
  {
    icon: HiClock,
    title: "Flexible Scheduling",
    description: "Early morning to late evening appointments available",
    color: "from-orange-400 to-orange-600",
  },
];

const ServiceAreaSection = () => {
  return (
    <section className="py-20  relative overflow-hidden">
      {/* Background Elements */}
      {/* <div className="absolute top-20 right-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" /> */}
      {/* <div className="absolute bottom-20 left-10 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" /> */}

      <Container>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            {/* Section Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-primary mb-6 shadow-lg border border-primary/10"
            >
              <HiMapPin className="w-4 h-4" />
              Service Coverage Area
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="font-heading text-4xl md:text-5xl font-bold mb-6"
            >
               <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-snug">
              <span className="text-foreground">We Come</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Directly to You
              </span>
            </h2>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-lg text-foreground/70 mb-8 leading-relaxed"
            >
               <p className="text-base sm:text-lg text-foreground/70 mb-8 leading-relaxed">
              Experience premium beauty services in the comfort of your chosen
              location. Whether you&apos;re at home, office, or celebrating at a
              special venue, our certified professionals bring the salon
              experience directly to you.
            </p>

            </motion.p>

            {/* Coverage Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8"
            >
              
              {serviceAreas.map((area, index) => {
                const IconComponent = area.icon;
                return (
                  <motion.div
                    key={area.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3 p-4 bg-white/60 backdrop-blur-md rounded-xl border border-primary/10 hover:shadow-md transition-all duration-300"
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-r ${area.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm sm:text-base mb-1">
                        {area.title}
                      </h3>
                      <p className="text-foreground/60 text-xs sm:text-sm leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
      
            </motion.div>

            {/* Service Radius */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="hidden bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-2xl mb-8 border border-primary/20"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                  <HiMapPin className="w-4 h-4 text-white" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground">
                  Service Coverage
                </h3>
              </div>
              <p className="text-foreground/80">
                <span className="font-semibold text-primary">
                  30-mile radius
                </span>{" "}
                from Mumbai city center
                <br />
                <span className="text-sm text-foreground/60">
                  Covering Andheri, Bandra, Juhu, Powai, Thane, and surrounding
                  areas
                </span>
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4"
            >
               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                href="/book"
                // size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Book Your Service
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="sm"
                className="border-2 border-primary/30 text-primary hover:bg-primary/5 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300"
              >
                Check Coverage Area
              </Button>
            </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 relative"
          >
            {/* Main Image Container */}
            <div className="relative max-w-lg mx-auto">
              {/* Background Decoration */}
              <div className="absolute -inset-6 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-3xl opacity-60" />

              {/* Image Container */}
              <div className="relative w-full aspect-square">
                <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-8 border-white/20 backdrop-blur-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Professional beauty service at client location"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg">
                  <HiSparkles className="w-8 h-8 text-primary" />
                </div>

                {/* Bottom Overlay Card */}
                <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-primary/10 min-w-[200px]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                      <HiMapPin className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">
                        Available Now
                      </h4>
                      <p className="text-xs text-foreground/60">
                        Serving your area
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Decorative Circles */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -top-8 -left-8 w-24 h-24 border-4 border-primary/30 rounded-full"
              />

              <motion.div
                animate={{
                  rotate: [360, 0],
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -bottom-4 -right-4 w-16 h-16 border-3 border-secondary/30 rounded-full"
              />

              {/* Small Floating Elements */}
              <motion.div
                animate={{ y: [-8, 8] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute top-1/4 -right-12 w-4 h-4 bg-primary/40 rounded-full"
              />

              <motion.div
                animate={{ y: [8, -8] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute bottom-1/4 -left-8 w-6 h-6 bg-secondary/40 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceAreaSection;
