"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { usePolicy, useSettings } from "@/hooks/useApi";
import { PolicyType } from "@/types/policy";
import Button from "@/components/ui/Button";
import { HiEnvelope, HiQuestionMarkCircle } from "react-icons/hi2";

interface PolicyContentProps {
  type: PolicyType;
}

// HTML decoder utility
const decodeHTML = (html: string) => {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

const PolicyContent = ({ type }: PolicyContentProps) => {
  const { data, isLoading, error } = usePolicy(type);
  const { data: settingsData } = useSettings();

  const settings = settingsData?.data ?? [];

  const getSetting = (key: string) => {
    const setting = settings.find((s:any) => s.key === key);
    return setting?.value || "";
  };

  if (isLoading) {
    return (
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-lg border border-primary/10">
              <div className="space-y-6">
                {Array.from({ length: 8 }, (_, index) => (
                  <div key={index} className="space-y-3">
                    <div className="h-6 bg-gray-200 animate-pulse rounded w-1/3" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-full" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-4/5" />
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4" />
                  </div>
                ))}
              </div>
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
  }

  if (error) {
    return (
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Unable to load policy
            </h3>
            <p className="text-foreground/60 mb-6">
              We&apos;re having trouble loading this policy. Please try again
              later.
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

  const policy = data?.data?.[0];

  if (!policy) {
    return (
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <div className="text-6xl mb-4">📄</div>
            <h3 className="text-2xl font-bold text-foreground mb-2">
              Policy not found
            </h3>
            <p className="text-foreground/60">
              The requested policy is not available at the moment.
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
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-lg border border-primary/10"
          >
            <div
              className="prose prose-lg max-w-none policy-content"
              dangerouslySetInnerHTML={{
                __html: decodeHTML(policy.description),
              }}
            />
          </motion.article>

          {/* Last Updated */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mt-12"
          >
            <p className="text-foreground/60 text-sm">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div> */}
        </div>
      </Container>

    
    </section>
  );
};

export default PolicyContent;
