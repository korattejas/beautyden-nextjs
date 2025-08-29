"use client";

import { motion } from "framer-motion";
import { categories } from "@/data/categories";

interface ServiceFilterProps {
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const ServiceFilter = ({
  activeCategory,
  onCategoryChange,
}: ServiceFilterProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {categories.map((category, index) => {
        const IconComponent = category.icon;
        return (
          <motion.button
            key={category.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                : "bg-white/80 backdrop-blur-md text-foreground/70 hover:text-primary hover:bg-primary/5 border border-primary/10"
            }`}
          >
            <IconComponent className="w-4 h-4" />
            {category.name}
          </motion.button>
        );
      })}
    </motion.div>
  );
};

export default ServiceFilter;
