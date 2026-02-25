"use client";

import { motion } from "framer-motion";
import { HiSparkles, HiShieldCheck, HiClock, HiHeart } from "react-icons/hi2";
import Container from "@/components/ui/Container";

const WhyChooseUsSection = () => {
  const features = [
    {
      icon: HiShieldCheck,
      title: "Certified Professionals",
      description:
        "All our beauty experts are certified, trained, and experienced in their respective fields.",
    },
    {
      icon: HiClock,
      title: "Flexible Scheduling",
      description:
        "Book appointments at your convenience with our flexible scheduling system.",
    },
    {
      icon: HiHeart,
      title: "100% Satisfaction",
      description:
        "We guarantee your satisfaction with our services or your money back.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/5 to-accent/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-secondary/5 rounded-full blur-3xl" />

      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-primary mb-6 shadow-lg border border-primary/10"
          >
            <HiSparkles className="w-4 h-4" />
            Why 10,000+ Clients Trust Us
          </motion.div>

          {/* COMMENTED OUT: Beauty Excellence Delivered to You heading */}
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">
            <span className="text-foreground">Beauty Excellence</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Delivered to You
            </span>
          </h2>

          <p className="text-lg text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            Experience the difference of professional beauty services in the
            comfort of your home. Here&apos;s what makes us the preferred choice
            for discerning clients.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-4">
                {feature.title}
              </h3>
              <p className="text-foreground/70 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-primary/10 shadow-xl">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied clients who trust BeautyDen for their
              beauty needs. Book your appointment today and discover why we&apos;re
              the preferred choice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/book"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                Book Now
              </a>
              <a
                href="/book"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-primary/30 text-primary font-semibold rounded-full hover:bg-primary/5 transition-all duration-300"
              >
                View Services
              </a>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyChooseUsSection;
