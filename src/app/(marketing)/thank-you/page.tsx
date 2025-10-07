import { Suspense } from "react";
import ThankYouPageContent from "./ThankYouPageContent";
import Container from "@/components/ui/Container";
import { HiCheckCircle } from "react-icons/hi2";

// Loading fallback component
function ThankYouPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-secondary/5 flex items-center justify-center py-12">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          {/* Loading icon */}
          <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
            <HiCheckCircle className="w-12 h-12 text-white" />
          </div>

          {/* Loading content */}
          <div className="space-y-4">
            <div className="h-12 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-80 mx-auto animate-pulse"></div>
            <div className="h-20 bg-gray-200 rounded-2xl w-64 mx-auto animate-pulse mt-8"></div>
          </div>

          {/* Loading cards */}
          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-primary/10 mt-8">
            <div className="space-y-4">
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-5/6 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-4/6 animate-pulse"></div>
              <div className="h-6 bg-gray-200 rounded w-3/6 animate-pulse"></div>
            </div>
          </div>

          {/* Loading contact cards */}
          <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-3xl p-8 md:p-12 border border-primary/10 mt-8">
            <div className="h-8 bg-gray-200 rounded w-48 mx-auto mb-6 animate-pulse"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-50 rounded-2xl p-6 border animate-pulse"
                >
                  <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded w-20 mx-auto mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-32 mx-auto"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Loading buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <div className="h-14 bg-gray-200 rounded-2xl w-48 animate-pulse"></div>
            <div className="h-14 bg-gray-200 rounded-2xl w-48 animate-pulse"></div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<ThankYouPageSkeleton />}>
      <ThankYouPageContent />
    </Suspense>
  );
}

// Metadata for the page
export const metadata = {
  title: "Thank You - Booking Confirmed | BeautyDen",
  description:
    "Thank you for booking with BeautyDen. Your appointment has been confirmed and we'll be in touch soon.",
  keywords:
    "booking confirmation, thank you, appointment confirmed, beauty services",
  robots: "noindex, nofollow", // Typically you don't want thank you pages indexed
};

// Opt this page into dynamic rendering to ensure URL search params are available in production builds
export const dynamic = "force-dynamic";