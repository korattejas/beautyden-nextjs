"use client";

import { motion } from "framer-motion";
import Container from "@/components/ui/Container";
import { usePolicy } from "@/hooks/useApi";
import { PolicyType } from "@/types/policy";

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
          <motion.div
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
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default PolicyContent;
