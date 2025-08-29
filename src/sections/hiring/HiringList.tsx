"use client";

import Container from "@/components/ui/Container";
import HiringCard from "./HiringCard";
import { Hiring } from "@/types/hiring";

interface HiringListProps {
  jobs: Hiring[];
}

const HiringList = ({ jobs }: HiringListProps) => {
  return (
    <section className="pb-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, index) => (
            <HiringCard key={job.id} job={job} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HiringList;
