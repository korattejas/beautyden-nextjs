"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import {
  HiShieldCheck,
  HiSparkles,
  HiHeart,
  HiLocationMarker,
  HiStar,
  HiUsers,
} from "react-icons/hi";

const features = [
  {
    icon: HiShieldCheck,
    title: "Certified Professionals",
    description:
      "All our beauty experts are licensed, insured, and have years of experience in premium salons.",
    iconColor: "text-green-500",
    bgColor: "bg-green-100",
  },
  {
    icon: HiSparkles,
    title: "Premium Products Only",
    description:
      "We use only high-end, cruelty-free brands like MAC, Urban Decay, and professional-grade skincare.",
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: HiLocationMarker,
    title: "Convenient Home Service",
    description:
      "Skip the salon wait times. We bring the full spa experience directly to your comfortable space.",
    iconColor: "text-blue-500",
    bgColor: "bg-blue-100",
  },
  {
    icon: HiHeart,
    title: "Personalized Care",
    description:
      "Every treatment is customized to your skin type, preferences, and lifestyle for perfect results.",
    iconColor: "text-pink-500",
    bgColor: "bg-pink-100",
  },
  {
    icon: HiStar,
    title: "Satisfaction Guaranteed",
    description:
      "Not happy with your service? We'll make it right with a full refund or complimentary redo.",
    iconColor: "text-yellow-500",
    bgColor: "bg-yellow-100",
  },
  {
    icon: HiUsers,
    title: "10,000+ Happy Clients",
    description:
      "Join thousands of satisfied customers who trust us for their regular beauty treatments.",
    iconColor: "text-purple-500",
    bgColor: "bg-purple-100",
  },
];

const WhyChooseUsSection = () => {
  return (
    <section className="py-16 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

      <Container>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium text-primary mb-6 shadow-lg border border-primary/10"
          >
            <HiSparkles className="w-4 h-4" />
            Why 10,000+ Clients Trust Us
          </motion.div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="group"
              >
                {/* Simple Card */}
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 h-full border border-gray-100">
                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <IconComponent className={`w-8 h-8 ${feature.iconColor}`} />
                  </div>

                  {/* Title */}
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-foreground/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 hidden"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto border border-gray-100">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-4">
              Ready to Experience the Difference?
            </h3>
            <p className="text-foreground/70 mb-6 text-lg">
              Join thousands of satisfied clients who&apos;ve made the switch to
              premium home beauty services.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Book Your First Service
            </motion.button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default WhyChooseUsSection;
