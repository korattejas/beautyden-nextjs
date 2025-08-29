"use client";

import Container from "@/components/ui/Container";
import ServiceCardSkeleton from "./ServiceCardSkeleton";

const ServiceGridSkeleton = () => {
  return (
    <section className="pb-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }, (_, index) => (
            <ServiceCardSkeleton key={index} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServiceGridSkeleton;
