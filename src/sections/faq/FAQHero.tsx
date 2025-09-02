"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

const FAQHero = () => {
  return (
    <section className="pt-24 pb-16 relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
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
            Frequently Asked Questions
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-foreground">Got</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Questions?
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground/70 mb-8 leading-relaxed"
          >
            Find answers to the most common questions about our beauty services,
            booking process, and policies. Can&apos;t find what you&apos;re
            looking for?
            <br />
            Contact our support team for personalized assistance.
          </motion.p>
        </div>
      </Container>
    </section>
  );
};

export default FAQHero;
