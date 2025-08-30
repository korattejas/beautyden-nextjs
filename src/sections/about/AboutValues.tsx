"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import {
  HiShieldCheck,
  HiSparkles,
  HiHeart,
  HiLightBulb,
  HiUserGroup,
  HiTrophy,
} from "react-icons/hi2";

const AboutValues = () => {
  const values = [
    {
      icon: HiShieldCheck,
      title: "Quality Assurance",
      description:
        "We maintain the highest standards in all our services with certified professionals and premium products.",
    },
    {
      icon: HiSparkles,
      title: "Innovation",
      description:
        "Constantly evolving and adopting new techniques and technologies to enhance your beauty experience.",
    },
    {
      icon: HiHeart,
      title: "Customer Care",
      description:
        "Your satisfaction is our priority. We go above and beyond to ensure exceptional service delivery.",
    },
    {
      icon: HiLightBulb,
      title: "Expertise",
      description:
        "Our team consists of skilled professionals with years of experience in the beauty industry.",
    },
    {
      icon: HiUserGroup,
      title: "Accessibility",
      description:
        "Making professional beauty services accessible to everyone, wherever you are, whenever you need.",
    },
    {
      icon: HiTrophy,
      title: "Excellence",
      description:
        "We strive for excellence in every interaction, ensuring you receive the best possible experience.",
    },
  ];

  return (
    <section className="py-20">
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-foreground">What We</span>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-3">
              Stand For
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-foreground/70 max-w-3xl mx-auto"
          >
            Our core values guide every decision we make and every service we
            provide.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/60 backdrop-blur-md rounded-2xl p-6 hover:bg-white/80 transition-all duration-300 border border-primary/10 hover:border-primary/20 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <value.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AboutValues;
