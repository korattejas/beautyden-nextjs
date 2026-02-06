"use client";

import { usePortfolio } from "@/hooks/useApi";
import PortfolioClient from "./PortfolioClient";
import { PortfolioCategory } from "@/types/portfolio";
import Container from "@/components/ui/Container";

export default function PortfolioPage() {
  const { data, isLoading, error } = usePortfolio();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
        {/* Hero Section Skeleton */}
        <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,105,180,0.15),_transparent_55%)]" />
          <Container className="relative py-20 md:py-28">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2">
                <div className="w-4 h-4 bg-gray-200 rounded-full animate-pulse" />
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="mt-6 space-y-4">
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-12 bg-gray-200 rounded animate-pulse" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mt-4" />
                <div className="h-6 bg-gray-200 rounded animate-pulse w-2/3" />
              </div>
            </div>
          </Container>
        </section>

        {/* Portfolio Grid Skeleton */}
        <section className="py-12 md:py-16">
          <Container>
            <div className="mb-10 flex flex-col gap-2 text-center">
              <div className="h-8 bg-gray-200 rounded animate-pulse w-64 mx-auto" />
              <div className="h-5 bg-gray-200 rounded animate-pulse w-80 mx-auto mt-2" />
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {[1, 2].map((index) => (
                <div key={index} className="rounded-2xl bg-white shadow-sm border border-gray-100 overflow-hidden">
                  <div className="h-80 bg-gray-200 animate-pulse" />
                </div>
              ))}
            </div>
          </Container>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-5xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">We couldn't load the portfolio at the moment. Please try again later.</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const portfolioCategories = data?.data || [];

  return <PortfolioClient portfolioCategories={portfolioCategories} />;
}

