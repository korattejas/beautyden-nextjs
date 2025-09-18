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
    <section
      className={`relative overflow-hidden py-12 sm:py-16 md:py-20 ${className}`}
    >
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

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-10">
        <div className="absolute top-10 left-10 w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-secondary/5 rounded-full blur-3xl" />
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
              className={`inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full text-xs sm:text-sm font-medium mb-6 sm:mb-8 shadow-lg border ${
                variant === "image"
                  ? "bg-white/20 backdrop-blur-md text-white border-white/20"
                  : "bg-white/80 backdrop-blur-md text-primary border-primary/10"
              }`}
            >
              {badge.icon}
              {badge.text}
            </motion.div>
          )}

          {/* Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
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
            className={`text-base sm:text-lg md:text-xl mb-8 sm:mb-10 md:mb-12 leading-relaxed max-w-2xl sm:max-w-3xl mx-auto ${
              variant === "image" ? "text-white/90" : "text-foreground/70"
            }`}
          >
            {description}
          </motion.p>

          {/* Features */}
          {features && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12"
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-sm sm:text-base"
                >
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
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
          >
            <Button
              href={primaryButton.href}
              // size="lg"
              className="group bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-semibold text-base sm:text-lg shadow-2xl hover:shadow-primary/25 transform hover:scale-105 transition-all duration-300"
            >
              {primaryButton.icon}
              {primaryButton.text}
            </Button>

            {secondaryButton && (
              <Button
                href={secondaryButton.href}
                variant="outline"
                // size="lg"
                className={`px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 ${
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
