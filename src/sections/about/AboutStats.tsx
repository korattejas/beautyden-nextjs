"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HiUsers, HiStar, HiMapPin, HiSparkles } from "react-icons/hi2";

const AboutStats = () => {
  const stats = [
    {
      icon: HiUsers,
      number: "10,000+",
      label: "Happy Customers",
      description: "Satisfied clients who trust our services",
    },
    {
      icon: HiStar,
      number: "4.9/5",
      label: "Average Rating",
      description: "Based on thousands of genuine reviews",
    },
    {
      icon: HiMapPin,
      number: "25+",
      label: "Cities Served",
      description: "Expanding across major cities in India",
    },
    {
      icon: HiSparkles,
      number: "50+",
      label: "Expert Professionals",
      description: "Certified and experienced beauty experts",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/5">
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-foreground">Our</span>
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-3">
              Achievements
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-foreground/70 max-w-3xl mx-auto"
          >
            Numbers that speak for our commitment to excellence and customer
            satisfaction.
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10 group-hover:border-primary/20">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-primary mb-2 group-hover:text-secondary transition-colors duration-300">
                  {stat.number}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm text-foreground/60">{stat.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AboutStats;
