"use client";

import Container from "@/components/ui/Container";
import ServiceCard from "./ServiceCard";
import { Service } from "@/services/services.service";

interface ServiceGridProps {
  services: Service[];
}

const ServiceGrid = ({ services }: ServiceGridProps) => {
  console.log("services: ", services);
  return (
    <section className="pb-20">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default ServiceGrid;
