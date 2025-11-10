import { Suspense } from "react";

import Container from "@/components/ui/Container";
import { HiCheckCircle } from "react-icons/hi2";
import ThankYouContent from "./ThankYouPageContent";

// Loading fallback component
function ThankYouLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex items-center justify-center py-12">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <HiCheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Thank You! 💖
          </h1>
          <p className="text-xl text-foreground/70 mb-6">
            Loading your booking confirmation...
          </p>
        </div>
      </Container>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouLoading />}>
      <ThankYouContent />
    </Suspense>
  );
}
