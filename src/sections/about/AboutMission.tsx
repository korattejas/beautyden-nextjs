"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HiEye, HiHeart } from "react-icons/hi2";

const AboutMission = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-accent/10 to-muted/10">
      <Container>
        <div className="text-center mb-16">
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
            className="text-xl text-foreground/70 max-w-3xl mx-auto"
          >
            We are committed to transforming the beauty industry through
            innovation, convenience, and exceptional service quality.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: HiEye,
              title: "Our Mission",
              description:
                "To make professional beauty services accessible and convenient for everyone by bringing certified experts directly to your doorstep with premium quality products and personalized care.",
              color: "from-red-400 to-pink-500",
            },
            {
              icon: HiEye,
              title: "Our Vision",
              description:
                "To become the leading platform for at-home beauty services, setting new standards for convenience, quality, and customer satisfaction in the beauty industry.",
              color: "from-blue-400 to-indigo-500",
            },
            {
              icon: HiHeart,
              title: "Our Values",
              description:
                "Excellence, integrity, innovation, and customer-centricity drive everything we do. We believe in empowering beauty professionals and delighting our clients.",
              color: "from-purple-400 to-pink-500",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10 text-center"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}
              >
                <item.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
                {item.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
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
