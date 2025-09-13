// src/sections/contact/ContactImageSection.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Container from "@/components/ui/Container";
import { HiSparkles, HiHeart, HiStar, HiShieldCheck } from "react-icons/hi2";
import { useSettings } from "@/hooks/useApi";

const ContactImageSection = () => {
  const { data: settingsData } = useSettings();
  const settings = settingsData?.data ?? [];

  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    const setting = settings.find((s) => s.key === key);
    return setting?.value || "";
  };

  const stats = [
    {
      icon: <HiStar className="w-6 h-6" />,
      value: getSetting("rating") || "4.9",
      label: "Rating",
      color: "text-warning",
    },
    {
      icon: <HiHeart className="w-6 h-6" />,
      value: getSetting("happy_clients") || "500+",
      label: "Happy Clients",
      color: "text-secondary",
    },
    {
      icon: <HiShieldCheck className="w-6 h-6" />,
      value: getSetting("experts") || "100+",
      label: "Expert Professionals",
      color: "text-success",
    },
  ];

  return (
    <section className="py-20 bg-muted/20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-primary font-medium mb-6">
              <HiSparkles className="w-4 h-4" />
              Why Choose BeautyDen
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              Experience Beauty
              <span className="block text-primary">Like Never Before</span>
            </h2>

            <div className="space-y-6 mb-8">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">
                  Our Mission
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {getSetting("our_mission") ||
                    "To provide exceptional beauty services at your doorstep with convenience and professional care."}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">
                  Our Vision
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {getSetting("our_vision") ||
                    "To be the leading platform for home beauty services across India and beyond."}
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-foreground">
                  Our Values
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {getSetting("our_values") ||
                    "Trust, professionalism, hygiene, and customer satisfaction guide everything we do."}
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div
                    className={`w-12 h-12 mx-auto mb-3 rounded-2xl bg-${
                      stat.color.split("-")[1]
                    }/10 flex items-center justify-center`}
                  >
                    <div className={stat.color}>{stat.icon}</div>
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/60">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Professional beauty service at home"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Floating Elements */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -top-6 -left-6 bg-card rounded-2xl p-4 shadow-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <HiSparkles className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      Premium Service
                    </div>
                    <div className="text-xs text-foreground/60">
                      At Your Home
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -right-6 bg-card rounded-2xl p-4 shadow-lg border border-border"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-success/10 rounded-xl flex items-center justify-center">
                    <HiShieldCheck className="w-5 h-5 text-success" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-sm">
                      Certified Experts
                    </div>
                    <div className="text-xs text-foreground/60">
                      Trusted & Verified
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Background Decoration */}
            <div className="absolute -inset-4 bg-primary/5 rounded-3xl -z-10" />
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default ContactImageSection;
