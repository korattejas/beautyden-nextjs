"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

const ServiceHero = () => {
  return (
    <section className="pt-24 pb-16 relative overflow-hidden min-h-[60vh]">
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

      <Container className="h-full min-h-[60vh]">
        <div className="text-center max-w-4xl mx-auto flex flex-col items-center justify-center h-full min-h-[60vh]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-primary mb-6 shadow-lg border border-primary/10"
          >
            <HiSparkles className="w-4 h-4" />
            Professional Beauty Services
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-foreground">Our Beauty</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Services
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground/70 mb-8 leading-relaxed"
          >
            From head to toe, we offer comprehensive beauty treatments delivered
            by certified professionals right to your doorstep.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              href="/book"
              size="lg"
              className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Book Now
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              className="border-2 border-primary/30 text-primary hover:bg-primary/5 px-8 py-4 rounded-full font-semibold"
            >
              Free Consultation
            </Button>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ServiceHero;
