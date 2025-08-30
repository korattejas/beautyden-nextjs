"use client";

import Container from "@/components/ui/Container";
import { motion } from "framer-motion";
import { HiUsers, HiStar, HiAcademicCap } from "react-icons/hi2";
import Image from "next/image";
import { useTeamMembers } from "@/hooks/useApi";
import TeamMemberSkeleton from "./loading/TeamMemberSkeleton";
import { TeamMember } from "@/types/team";

const AboutTeam = () => {
  const { data, isLoading, error } = useTeamMembers();

  const teamMembers = data?.data ?? [];

  return (
    <section className="py-20 bg-gradient-to-r from-muted/10 to-accent/10">
      <Container>
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-foreground">Meet Our</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Expert Team
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl text-foreground/70 max-w-3xl mx-auto"
          >
            Our team of certified beauty professionals is dedicated to bringing
            you exceptional service and helping you look and feel your best.
          </motion.p>
        </div>

        {error && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">👥</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Unable to load team
            </h3>
            <p className="text-foreground/60">
              We&apos;re having trouble loading our team members. Please try
              again later.
            </p>
          </div>
        )}

        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {Array.from({ length: 8 }, (_, index) => (
              <TeamMemberSkeleton key={index} index={index} />
            ))}
          </div>
        ) : teamMembers.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              No team members found
            </h3>
            <p className="text-foreground/60">
              Our team information will be available soon.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={member.id} member={member} index={index} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard = ({ member, index }: TeamMemberCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="bg-white/80 backdrop-blur-md rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-primary/10 group"
    >
      {/* Photo Section */}
      <div className="aspect-square overflow-hidden relative bg-gradient-to-br from-primary/10 to-secondary/10">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-24 h-24 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {member.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}

        {/* Popular Badge */}
        {member.is_popular === 1 && (
          <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <HiStar className="w-3 h-3" />
            Popular
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
          {member.name}
        </h3>

        <p className="text-primary font-medium mb-3">{member.role}</p>

        {member.experience_years && (
          <div className="flex items-center gap-2 text-sm text-foreground/60 mb-3">
            <HiUsers className="w-4 h-4" />
            <span>{member.experience_years} years experience</span>
          </div>
        )}

        {member.bio && (
          <p className="text-foreground/70 text-sm leading-relaxed mb-4 line-clamp-3">
            {member.bio}
          </p>
        )}

        {/* Specialties */}
        {member.specialties && member.specialties.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Specialties:
            </h4>
            <div className="flex flex-wrap gap-2">
              {member.specialties.slice(0, 3).map((specialty, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                >
                  {specialty}
                </span>
              ))}
              {member.specialties.length > 3 && (
                <span className="text-xs text-foreground/60">
                  +{member.specialties.length - 3} more
                </span>
              )}
            </div>
          </div>
        )}

        {/* Certifications */}
        {member.certifications && member.certifications.length > 0 && (
          <div className="flex items-center gap-2 text-sm text-foreground/60">
            <HiAcademicCap className="w-4 h-4" />
            <span>
              {member.certifications.length} certification
              {member.certifications.length > 1 ? "s" : ""}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default AboutTeam;
