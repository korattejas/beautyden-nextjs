"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HiSparkles, HiDocumentText } from "react-icons/hi2";

const BlogHero = () => {
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
            <HiDocumentText className="w-4 h-4" />
            Beauty Blog & Tips
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-5xl md:text-6xl font-bold mb-6"
          >
            <span className="text-foreground">Beauty</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Insights & Tips
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-foreground/70 mb-8 leading-relaxed"
          >
            Discover expert beauty tips, latest trends, and professional
            insights from our team of certified beauty specialists.
          </motion.p>
        </div>
      </Container>
    </section>
  );
};

export default BlogHero;
