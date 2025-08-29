"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  HiStar,
  HiUsers,
  HiShieldCheck,
  HiSparkles,
  HiHeart,
  HiLocationMarker,
} from "react-icons/hi";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden bg-gradient-to-br from-background via-accent/30 to-muted/40">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/3 to-secondary/3 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10" size="full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content Part */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-primary mb-8 shadow-lg border border-primary/10"
            >
              <HiShieldCheck className="w-4 h-4 text-success" />
              Trusted by 10,000+ Happy Clients
            </motion.div>

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="text-foreground">Transform Your</span>
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Beauty Journey
                </span>
                <br />
                <span className="text-foreground/80 text-4xl md:text-5xl lg:text-6xl">
                  At Home
                </span>
              </h1>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-foreground/70 mb-8 leading-relaxed max-w-xl"
            >
              Experience premium beauty services with our certified
              professionals. From skincare to makeup, we bring salon-quality
              treatments to your doorstep with personalized care and luxury
              products.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button
                href="/services"
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-full font-semibold transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Services
              </Button>
              <Button
                href="/book"
                variant="outline"
                size="lg"
                className="border-2 border-primary/30 text-primary hover:bg-primary/5 px-8 py-4 rounded-full font-semibold backdrop-blur-sm transition-all duration-300"
              >
                Book Consultation
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-primary/10">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <HiStar className="w-5 h-5 text-warning" />
                  <span className="text-2xl font-bold text-foreground">
                    4.9
                  </span>
                </div>
                <div className="text-xs text-foreground/60">Rating</div>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-primary/10">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <HiUsers className="w-5 h-5 text-primary" />
                  <span className="text-2xl font-bold text-foreground">
                    10K+
                  </span>
                </div>
                <div className="text-xs text-foreground/60">Clients</div>
              </div>
              <div className="text-center p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-primary/10">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <HiSparkles className="w-5 h-5 text-secondary" />
                  <span className="text-2xl font-bold text-foreground">
                    500+
                  </span>
                </div>
                <div className="text-xs text-foreground/60">Experts</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Visual Part */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            {/* Main Image Container */}
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl blur-xl" />

              {/* Main image */}
              <div className="relative bg-white/80 backdrop-blur-md rounded-3xl p-8 border border-primary/20 shadow-2xl">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Professional beauty treatment at home"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Floating Service Cards */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-primary/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                  <HiSparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Premium Facial
                  </h4>
                  <p className="text-sm text-foreground/60">Starting ₹2,500</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="absolute -bottom-4 -right-4 bg-white/95 backdrop-blur-lg rounded-2xl p-4 shadow-xl border border-primary/10"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-secondary to-primary rounded-xl flex items-center justify-center">
                  <HiHeart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">
                    Bridal Package
                  </h4>
                  <p className="text-sm text-foreground/60">From ₹15,000</p>
                </div>
              </div>
            </motion.div>

            {/* Location indicator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="absolute top-1/2 -left-8 bg-white/95 backdrop-blur-lg rounded-full px-4 py-3 shadow-lg border border-primary/10"
            >
              <div className="flex items-center gap-2">
                <HiLocationMarker className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-foreground">
                  At Your Location
                </span>
              </div>
            </motion.div>

            {/* Floating decorative elements */}
            <motion.div
              animate={{
                y: [-10, 10],
                rotate: [0, 5, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 right-0 w-6 h-6 bg-primary/20 rounded-full"
            />
            <motion.div
              animate={{
                y: [10, -10],
                rotate: [0, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-1/4 left-0 w-4 h-4 bg-secondary/20 rounded-full"
            />
          </motion.div>
        </div>
      </Container>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.8 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-foreground/40"
        >
          <span className="text-sm">Discover More</span>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-primary/50 rounded-full mt-2"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
