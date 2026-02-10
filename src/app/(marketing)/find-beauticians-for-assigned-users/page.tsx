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
        <div className="min-h-screen bg-white pb-6">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-white border-b border-gray-100 pt-20 md:pt-24">
                <Container className="py-8 md:py-12">
                    <div className="text-center max-w-3xl mx-auto px-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
                            Find Experts Near You
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 px-2 md:px-0">
                            Locate our top-rated beauticians in your area. Enter your location to see who is available to bring professional beauty services to your doorstep.
                        </p>
                    </div>
                </Container>
            </div>

            {/* Locator Component */}
            <div className="flex-1 px-2 sm:px-4">
                <BeauticianLocator />
            </div>
        </div>
    );
}