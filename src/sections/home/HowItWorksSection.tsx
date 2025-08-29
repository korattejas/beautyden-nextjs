import Container from "@/components/ui/Container";
import {
  HiOutlineSearch,
  HiOutlineCalendar,
  HiOutlineTruck,
  HiOutlineSparkles,
} from "react-icons/hi";

const steps = [
  {
    number: "01",
    icon: HiOutlineSearch,
    title: "Choose Service",
    description:
      "Browse our extensive range of professional beauty services and select what you need",
  },
  {
    number: "02",
    icon: HiOutlineCalendar,
    title: "Pick Date & Time",
    description:
      "Choose your preferred date and time slot that fits your schedule perfectly",
  },
  {
    number: "03",
    icon: HiOutlineTruck,
    title: "Professional Arrives",
    description:
      "Our certified beauty expert arrives at your location with all equipment",
  },
  {
    number: "04",
    icon: HiOutlineSparkles,
    title: "Enjoy Your Service",
    description:
      "Relax and enjoy your personalized beauty treatment in the comfort of your home",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-16">
      <Container>
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
            How It Works
          </h2>
          <p className="text-xl text-foreground/70 max-w-2xl mx-auto">
            Book your beauty service in just 4 simple steps and experience
            luxury at your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="relative group">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 text-center shadow-lg group-hover:shadow-xl transition-all duration-300 border border-primary/10 group-hover:border-primary/20">
                  {/* Step number */}
                  <div className="absolute -top-4 left-4 bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm px-3 py-1 rounded-full">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-12 h-12 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* Content */}
                  <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                    {step.title}
                  </h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Connecting line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-to-r from-primary/30 to-secondary/30" />
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;
