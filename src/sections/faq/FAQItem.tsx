"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiChevronDown, HiPlus, HiMinus } from "react-icons/hi2";
import { FAQ } from "@/types/faq";

interface FAQItemProps {
  faq: FAQ;
  index: number;
}

const FAQItem = ({ faq, index }: FAQItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white/80 backdrop-blur-md rounded-2xl border border-primary/10 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-6 text-left focus:outline-none focus:ring-2 focus:ring-primary/20 focus:ring-inset group"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-300 pr-4 leading-relaxed">
            {faq.question}
          </h3>
          <div className="flex-shrink-0">
            <motion.div
              animate={{ rotate: isOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300"
            >
              {isOpen ? (
                <HiMinus className="w-4 h-4 text-primary" />
              ) : (
                <HiPlus className="w-4 h-4 text-primary" />
              )}
            </motion.div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pt-0 border-t border-primary/10">
              <div className="text-foreground/80 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQItem;
