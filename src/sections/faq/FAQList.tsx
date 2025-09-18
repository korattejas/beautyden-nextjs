"use client";

import { useFAQs, useSettings } from "@/hooks/useApi";
import Container from "@/components/ui/Container";
import FAQItem from "./FAQItem";
import { motion } from "framer-motion";
import { HiQuestionMarkCircle, HiEnvelope } from "react-icons/hi2";
import Button from "@/components/ui/Button";

const FAQList = () => {
  const { data, isLoading, error } = useFAQs();
  const { data: settingsData } = useSettings();

  const faqs = data?.data || [];
  const settings = settingsData?.data ?? [];

  const getSetting = (key: string) => {
    const setting = settings.find((s:any) => s.key === key);
    return setting?.value || "";
  };

  if (isLoading) {
    return (
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            {Array.from({ length: 5 }, (_, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 animate-pulse rounded mb-2" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                  </div>
                  <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full ml-4" />
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">❓</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Unable to load FAQs
            </h3>
            <p className="text-foreground/60 mb-6">
              We&apos;re having trouble loading the FAQ section. Please try
              again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        </Container>
      </section>
    );
  }

  if (faqs.length === 0) {
    return (
      <section className="py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">🤔</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              No FAQs Available
            </h3>
            <p className="text-foreground/60 mb-6">
              We&apos;re working on adding frequently asked questions. Please
              check back soon!
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-b from-muted/5 to-background">
      <Container>
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 mb-16">
            {faqs.map((faq, index) => (
              <FAQItem key={faq.id} faq={faq} index={index} />
            ))}
          </div>

          {/* Still have questions section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 border border-primary/20"
          >
            <div className="max-w-2xl mx-auto">
              <HiQuestionMarkCircle className="w-16 h-16 text-primary mx-auto mb-6" />

              <h3 className="font-heading text-3xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h3>

              <p className="text-foreground/70 text-lg mb-8 leading-relaxed">
                Can&apos;t find the answer you&apos;re looking for? Our friendly
                support team is here to help you with any questions about our
                services.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  href="/contact"
                  className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
                >
                  <HiEnvelope className="w-5 h-5" />
                  Contact Support
                </Button>

                <Button
                  // href="tel:+911234567890"
                  href={`tel:${getSetting("phone_number")}`}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-300"
                >
                  Call Us Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default FAQList;
