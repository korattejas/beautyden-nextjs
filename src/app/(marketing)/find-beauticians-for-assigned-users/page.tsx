"use client";

import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";

// Dynamically import the map component to avoid SSR issues with Leaflet
const BeauticianLocator = dynamic(
    () => import("./BeauticianLocator"),
    {
        ssr: false,
        loading: () => (
            <div className="h-[600px] w-full flex items-center justify-center bg-gray-50 rounded-xl">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
                    <p className="text-gray-500 font-medium">Loading Map...</p>
                </div>
            </div>
        )
    }
);

export default function FindBeauticiansPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 pb-8">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-white border-b border-gray-100 pt-20 md:pt-24">
                <Container className="py-8 md:py-12">
                    <div className="text-center max-w-4xl mx-auto px-4">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
                            Find Experts Near You
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-600 px-2 md:px-0 max-w-3xl mx-auto leading-relaxed">
                            Locate our top-rated beauticians in your area. Enter your location to see who is available to bring professional beauty services to your doorstep.
                        </p>
                    </div>
                </Container>
            </div>

            {/* Locator Component */}
            <div className="px-0 sm:px-0 pt-6">
                <Container>
                    <BeauticianLocator />
                </Container>
            </div>
        </div>
    );
}