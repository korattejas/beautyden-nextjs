import CTASection from "@/components/CTASection";
import CategoryServices from "@/sections/home/CategoryServices";
import HeroSection from "@/sections/home/HeroSection";
import HowItWorksSection from "@/sections/home/HowItWorksSection";
import PopularServicesSection from "@/sections/home/PopularServicesSection";
import ServiceAreaSection from "@/sections/home/ServiceAreaSection";
import TestimonialsSection from "@/sections/home/TestimonialsSection";
import WhyChooseUsSection from "@/sections/home/WhyChooseUsSection";
import { HiCalendar, HiHeart, HiSparkles } from "react-icons/hi";
// import FeaturedServicesSection from "@/sections/home/FeaturedServicesSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryServices />
      <WhyChooseUsSection />
      <PopularServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ServiceAreaSection />

      <CTASection
        variant="gradient"
        title="Join Our Beauty Community"
        subtitle="Start Your Journey"
        description="Discover the difference that professional beauty services can make. From everyday touch-ups to special occasion glamour, we're here to make you look and feel amazing."
        badge={{
          text: "Join 10,000+ Happy Clients",
          icon: <HiHeart className="w-4 h-4" />,
        }}
        primaryButton={{
          text: "Get Started Today",
          href: "/book",
          icon: <HiSparkles className="w-5 h-5 mr-2" />,
        }}
        secondaryButton={{
          text: "Learn More",
          href: "/about",
        }}
        features={[
          "Professional Team",
          "Premium Products",
          "Flexible Scheduling",
          "Satisfaction Guaranteed",
        ]}
        className="bg-white"
      />
      {/* <FeaturedServicesSection /> */}
    </>
  );
}
