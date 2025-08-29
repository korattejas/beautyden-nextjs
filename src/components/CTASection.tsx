"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface CTASectionProps {
  variant?: "gradient" | "image" | "simple";
  title: string;
  subtitle?: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
    icon?: ReactNode;
  };
  secondaryButton?: {
    text: string;
    href: string;
  };
  backgroundImage?: string;
  badge?: {
    text: string;
    icon?: ReactNode;
  };
  features?: string[];
  className?: string;
}

const CTASection = ({
  variant = "simple",
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  backgroundImage,
  badge,
  features,
  className = "",
}: CTASectionProps) => {
  return (
    <section className={`py-20 relative overflow-hidden ${className}`}>
      {/* Variant-specific Background */}
      {variant === "image" && backgroundImage && (
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-primary/60" />
        </div>
      )}

      {variant === "gradient" && (
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-10" />
      )}

      {/* Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <Container>
        <div
          className={`relative z-20 text-center max-w-4xl mx-auto ${
            variant === "image" ? "text-white" : "text-foreground"
          }`}
        >
          {/* Badge */}
          {badge && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium mb-8 shadow-lg border ${
                variant === "image"
                  ? "bg-white/20 backdrop-blur-md text-white border-white/20"
                  : "bg-white/80 backdrop-blur-md text-primary border-primary/10"
              }`}
            >
              {badge.icon}
              {badge.text}
            </motion.div>
          )}

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {title}
              {subtitle && (
                <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {subtitle}
                </span>
              )}
            </h2>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className={`text-xl mb-12 leading-relaxed max-w-3xl mx-auto ${
              variant === "image" ? "text-white/90" : "text-foreground/70"
            }`}
          >
            {description}
          </motion.p>

          {/* Features List (if provided) */}
          {features && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6 mb-12"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span
                    className={
                      variant === "image"
                        ? "text-white/80"
                        : "text-foreground/70"
                    }
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </motion.div>
          )}

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button
              href={primaryButton.href}
              size="lg"
              className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-10 py-5 rounded-full font-semibold text-lg shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300"
            >
              {primaryButton.icon}
              {primaryButton.text}
            </Button>

            {secondaryButton && (
              <Button
                href={secondaryButton.href}
                variant="outline"
                size="lg"
                className={`px-10 py-5 rounded-full font-semibold text-lg transition-all duration-300 ${
                  variant === "image"
                    ? "bg-white/10 backdrop-blur-md border-2 border-white/30 text-white hover:bg-white hover:text-primary"
                    : "border-2 border-primary/30 text-primary hover:bg-primary/5"
                }`}
              >
                {secondaryButton.text}
              </Button>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default CTASection;

// import CTASection from "@/components/ui/CTASection";
// import { HiSparkles, HiCalendar, HiHeart } from "react-icons/hi2";

// // Variant 1: Simple Clean CTA
// export const SimpleCTA = () => (
//   <CTASection
//     variant="simple"
//     title="Ready to Transform Your Look?"
//     subtitle="Book Today!"
//     description="Join thousands of satisfied clients who trust BeautyDen for their beauty needs. Professional services, premium products, and exceptional results await you."
//     badge={{
//       text: "Limited Time Offer",
//       icon: <HiSparkles className="w-4 h-4" />
//     }}
//     primaryButton={{
//       text: "Book Your Appointment",
//       href: "/book",
//       icon: <HiCalendar className="w-5 h-5 mr-2" />
//     }}
//     secondaryButton={{
//       text: "View Services",
//       href: "/services"
//     }}
//     features={["Same Day Booking", "Certified Professionals", "100% Satisfaction"]}
//     className="bg-gradient-to-b from-background to-accent/20"
//   />
// );

// // Variant 2: Image Background CTA
// export const ImageCTA = () => (
//   <CTASection
//     variant="image"
//     title="Experience True Beauty"
//     subtitle="At Your Doorstep"
//     description="Transform yourself with premium beauty services delivered right to your location. Our certified professionals bring the salon experience to you with luxury products and personalized care."
//     backgroundImage="https://images.unsplash.com/photo-1516728778615-2d590ea1856f?auto=format&fit=crop&w=1650&q=80"
//     badge={{
//       text: "Your Beauty Transformation Awaits",
//       icon: <HiSparkles className="w-4 h-4" />
//     }}
//     primaryButton={{
//       text: "Book Your Service",
//       href: "/book",
//       icon: <HiCalendar className="w-5 h-5 mr-2" />
//     }}
//     secondaryButton={{
//       text: "Explore Services",
//       href: "/services"
//     }}
//   />
// );

// // Variant 3: Gradient Background CTA
// export const GradientCTA = () => (
//   <CTASection
//     variant="gradient"
//     title="Join Our Beauty Community"
//     subtitle="Start Your Journey"
//     description="Discover the difference that professional beauty services can make. From everyday touch-ups to special occasion glamour, we're here to make you look and feel amazing."
//     badge={{
//       text: "Join 10,000+ Happy Clients",
//       icon: <HiHeart className="w-4 h-4" />
//     }}
//     primaryButton={{
//       text: "Get Started Today",
//       href: "/book",
//       icon: <HiSparkles className="w-5 h-5 mr-2" />
//     }}
//     secondaryButton={{
//       text: "Learn More",
//       href: "/about"
//     }}
//     features={["Professional Team", "Premium Products", "Flexible Scheduling", "Satisfaction Guaranteed"]}
//     className="bg-white"
//   />
// );
