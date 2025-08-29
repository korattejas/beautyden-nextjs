"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
  HiMapPin,
  HiClock,
  HiBanknotes,
  HiUserGroup,
  HiArrowRight,
} from "react-icons/hi2";
import { Hiring } from "@/types/hiring";

interface HiringCardProps {
  job: Hiring;
  index: number;
}

const HiringCard = ({ job, index }: HiringCardProps) => {
  const experienceText = job.max_experience
    ? `${job.min_experience} - ${job.max_experience} years`
    : `${job.min_experience}+ years`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10 h-full flex flex-col"
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-xl flex items-center justify-center">
            <HiUserGroup className="w-6 h-6 text-primary" />
          </div>
          {job.is_popular === "1" && (
            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Popular
            </span>
          )}
        </div>

        <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {job.title}
        </h3>

        <p className="text-foreground/70 text-sm leading-relaxed mb-4">
          {job.description}
        </p>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Required Skills:
        </h4>
        <div className="flex flex-wrap gap-2">
          {job.required_skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs bg-accent/50 text-primary px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="space-y-3 mb-6 flex-grow">
        <div className="flex items-center gap-2 text-foreground/70">
          <HiMapPin className="w-4 h-4 text-primary" />
          <span className="text-sm">{job.city}</span>
        </div>

        <div className="flex items-center gap-2 text-foreground/70">
          <HiClock className="w-4 h-4 text-primary" />
          <span className="text-sm">Experience: {experienceText}</span>
        </div>

        <div className="flex items-center gap-2 text-foreground/70">
          <HiBanknotes className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            {job.salary_range}
          </span>
        </div>
      </div>

      {/* Apply Button */}
      <div className="mt-auto">
        <Button
          href={`/hiring/apply?job=${job.id}`}
          size="sm"
          className="w-full bg-gradient-to-r from-primary to-secondary text-white py-3 rounded-full font-medium transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
        >
          Apply Now
          <HiArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default HiringCard;
