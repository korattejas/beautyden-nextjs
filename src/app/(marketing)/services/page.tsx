import { Suspense } from "react";
import ServicesPageContent from "./ServicesPageContent";
import ServiceHero from "@/sections/services/ServiceHero";
import Container from "@/components/ui/Container";
import ServiceFilterSkeleton from "@/components/loading/ServiceFilterSkeleton";
import ServiceGridSkeleton from "@/components/loading/ServiceGridSkeleton";

// Loading fallback component
function ServicesPageFallback() {
  return (
    <div className="min-h-screen bg-background">
      <ServiceHero />
      <section className="pb-12 md:pb-16">
        <Container>
          <ServiceFilterSkeleton />
        </Container>
      </section>
      <ServiceGridSkeleton />
    </div>
  );
}

export default function ServicesPage() {
  return (
    <Suspense fallback={<ServicesPageFallback />}>
      <ServicesPageContent />
    </Suspense>
  );
}
