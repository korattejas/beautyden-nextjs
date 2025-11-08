"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HiEye, HiHeart, HiSparkles } from "react-icons/hi2";
import { useSettings } from "@/hooks/useApi";

const AboutMission = () => {
  const { data: settingsData, isLoading, error } = useSettings();

  const settings = settingsData?.data || [];

  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    return settings.find((setting) => setting.key === key)?.value || "";
  };

  // Get mission, vision, and values from API
  const ourMission = getSetting("our_mission");
  const ourVision = getSetting("our_vision");
  const ourValues = getSetting("our_values");

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-r from-accent/10 to-muted/10">
        <Container>
          <div className="text-center">
            <div className="inline-flex items-center gap-3 text-primary">
              <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
              <span className="text-lg font-medium">Loading our story...</span>
            </div>
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-gradient-to-r from-accent/10 to-muted/10">
        <Container>
          <div className="text-center">
            <p className="text-red-500">Unable to load our mission & vision</p>
          </div>
        </Container>
      </section>
    );
  }

  const missionVisionItems = [
    {
      icon: HiEye,
      title: "Our Mission",
      description:
        ourMission ||
        "To make professional beauty services accessible and convenient for everyone by bringing certified experts directly to your doorstep with premium quality products and personalized care.",
      color: "from-red-400 to-pink-500",
    },
    {
      icon: HiSparkles,
      title: "Our Vision",
      description:
        ourVision ||
        "To become the leading platform for at-home beauty services, setting new standards for convenience, quality, and customer satisfaction in the beauty industry.",
      color: "from-blue-400 to-indigo-500",
    },
    {
      icon: HiHeart,
      title: "Our Values",
      description:
        ourValues ||
        "Excellence, integrity, innovation, and customer-centricity drive everything we do. We believe in empowering beauty professionals and delighting our clients.",
      color: "from-purple-400 to-pink-500",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-accent/10 to-muted/10 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

      <Container>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium text-primary mb-6 shadow-lg border border-primary/10"
          >
            <HiHeart className="w-4 h-4" />
            Our Story
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-foreground">Our Mission &</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Vision
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed"
          >
            We are committed to transforming the beauty industry through
            innovation, convenience, and exceptional service quality.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {missionVisionItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10 text-center group"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <item.icon className="w-8 h-8 text-white" />
              </div>

              <h3 className="font-heading text-2xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-left text-foreground/70 leading-relaxed text-base">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AboutMission;
