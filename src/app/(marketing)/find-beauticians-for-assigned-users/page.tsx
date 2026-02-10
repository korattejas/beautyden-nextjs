"use client";

import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";
import styles from './page.module.css';

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
        <div className="min-h-screen bg-white pb-24">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-white border-b border-gray-100">
                <Container className="pt-10 sm:pt-12 md:pt-16 pb-6 sm:pb-8">
                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 pt-6 sm:pt-8">
                            Find Experts Near You
                        </h1>
                        <p className="text-sm sm:text-base text-gray-600 px-2">
                            Locate our top-rated beauticians in your area. Enter your location to see who is available to bring professional beauty services to your doorstep.
                        </p>
                    </div>
                </Container>
            </div>

            {/* Locator Component */}
            <div className={`${styles.container} flex-1 min-h-0 overflow-hidden`}>
                <BeauticianLocator />
            </div>
        </div>
    );
}