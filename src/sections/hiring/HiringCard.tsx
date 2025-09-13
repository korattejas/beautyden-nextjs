"use client";

import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import {
  HiMapPin,
  HiClock,
  HiBriefcase,
  HiUserGroup,
  HiArrowRight,
  HiStar,
} from "react-icons/hi2";
import { Hiring } from "@/types/hiring";

interface HiringCardProps {
  job: Hiring;
  index: number;
}

const HiringCard = ({ job, index }: HiringCardProps) => {
  // Calculate days ago
  const getDaysAgo = (createdAt: string) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffTime = Math.abs(now.getTime() - created.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const daysAgo = getDaysAgo(job.created_at);

  // Experience level icons
  const getExperienceLevelIcon = (minExp: string, maxExp: string | null) => {
    const min = parseInt(minExp);
    if (min === 0) return "🌱"; // Entry level
    if (min <= 2) return "⭐"; // Mid level
    return "👑"; // Senior level
  };

  const experienceText = job.max_experience
    ? `${job.min_experience} - ${job.max_experience} years`
    : `${job.min_experience}+ years`;

  // WhatsApp redirect function
  const handleApplyNow = () => {
    const message = `🌟 *BeautyDen Job Application*

*Position:* ${job.title}
*Location:* ${job.city}
*Experience:* ${experienceText}

Hi! I'm interested in applying for this position. Please share more details about the role, requirements, and application process.

Thank you! 🙏`;

    const whatsappUrl = `https://wa.me/919574758282?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group bg-card backdrop-blur-md rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 border border-border h-full flex flex-col"
    >
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-start justify-between mb-3">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
            <HiUserGroup className="w-6 h-6 text-primary" />
          </div>

          {/* Experience Level in top-right box */}
          <div className="bg-accent/50 px-3 py-1 rounded-full flex items-center gap-1">
            <span className="text-sm">
              {getExperienceLevelIcon(job.min_experience, job.max_experience)}
            </span>
            <span className="text-xs font-medium text-foreground/70">
              {experienceText}
            </span>
          </div>
        </div>

        <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {job.title}
        </h3>

        <p className="text-foreground/70 text-sm leading-relaxed mb-4">
          {job.description}
        </p>
      </div>

      {/* Hiring Type Box */}
      {/* {job.hiring_type && (
        <div className="mb-4">
          <div className="bg-primary/10 border border-primary/20 rounded-2xl p-3">
            <div className="flex items-center gap-2">
              <HiBriefcase className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                {job.hiring_type}
              </span>
            </div>
          </div>
        </div>
      )} */}

      {/* Skills */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-foreground mb-3">
          Required Skills:
        </h4>
        <div className="flex flex-wrap gap-2">
          {job.required_skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-xs bg-muted text-primary px-2 py-1 rounded-full border border-border"
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

        {/* Show Hiring Type instead of Salary Range if available */}
        {job.hiring_type ? (
          <div className="flex items-center gap-2 text-foreground/70">
            <HiBriefcase className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              {job.hiring_type}
            </span>
          </div>
        ) : // Commented out salary range as requested
        // <div className="flex items-center gap-2 text-foreground/70">
        //   <HiBanknotes className="w-4 h-4 text-primary" />
        //   <span className="text-sm font-medium text-primary">
        //     {job.salary_range}
        //   </span>
        // </div>
        null}
      </div>

      {/* Posted X days ago */}
      <div className="mb-4">
        <p className="text-xs text-foreground/50">
          Posted {daysAgo} {daysAgo === 1 ? "day" : "days"} ago
        </p>
      </div>

      {/* Apply Button - Redirects to WhatsApp */}
      <div className="mt-auto">
        <Button
          onClick={handleApplyNow}
          size="sm"
          className="w-full bg-primary text-white py-3 rounded-full font-medium hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2"
        >
          Apply Now
          <HiArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default HiringCard;
