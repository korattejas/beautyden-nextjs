"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import { HiSparkles, HiHeart, HiStar } from "react-icons/hi2";
import Image from "next/image";
import { useSettings } from "@/hooks/useApi";

const AboutHero = () => {
  const { data: settingsData } = useSettings();
  const settings = settingsData?.data || [];

  const getSetting = (key: string): string => {
    return settings.find((s: any) => s.key === key)?.value || "";
  };

  const ratingFromSettings = getSetting("rating");
  const ratingDisplay = (() => {
    const parsed = parseFloat(ratingFromSettings || "");
    if (isNaN(parsed)) return "4.9";
    return parsed.toFixed(1);
  })();

  const happyClients = getSetting("happy_clients") || "10K+";
  const experts = getSetting("experts") || "50+";

  // Use first image from settings homePageSlides if available
  const firstSlideImage = (settingsData?.homePageSlides?.[0]?.image as string) ||
    "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80";

  return (
    <section className="pt-24 pb-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-20 right-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-36 h-36 bg-accent/10 rounded-full blur-3xl" />

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-3 rounded-full text-sm font-medium text-primary mb-8 shadow-lg border border-primary/10"
            >
              <HiSparkles className="w-4 h-4" />
              About BeautyDen
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading text-5xl md:text-6xl font-bold mb-6 leading-tight"
            >
              <span className="text-foreground">Bringing Beauty</span>
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                To Your Doorstep
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-foreground/70 mb-8 leading-relaxed"
            >
              At BeautyDen, we revolutionize the beauty industry by bringing
              professional, certified beauty services directly to your home.
              Experience luxury, convenience, and exceptional results with our
              expert team.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 mb-12"
            >
              <Button
                href="/services"
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Explore Services
              </Button>
              <Button
                href="/contact"
                variant="outline"
                size="lg"
                className="border-2 border-primary/30 text-primary hover:bg-primary/5 px-8 py-4 rounded-full font-semibold"
              >
                Contact Us
              </Button>
            </motion.div>

            {/* Trust Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-6"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{happyClients}</div>
                <div className="text-sm text-foreground/60">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-3xl font-bold text-primary">{ratingDisplay}</span>
                  <HiStar className="w-6 h-6 text-yellow-400 ml-1" />
                </div>
                <div className="text-sm text-foreground/60">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">{experts}</div>
                <div className="text-sm text-foreground/60">
                  Expert Professionals
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <Image
                src={firstSlideImage}
                alt="Professional beauty services"
                width={600}
                height={400}
                className="rounded-3xl shadow-2xl object-cover"
                unoptimized
              />

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -left-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <HiHeart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      100% Satisfaction
                    </div>
                    <div className="text-sm text-foreground/60">
                      Guaranteed Results
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [10, -10] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-4 -right-4 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                    <HiSparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      Premium Quality
                    </div>
                    <div className="text-sm text-foreground/60">
                      Professional Products
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default AboutHero;
