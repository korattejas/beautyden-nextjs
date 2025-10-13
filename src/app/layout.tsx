import type { Metadata } from "next";
import { Raleway, Poppins } from "next/font/google";
import "./globals.css";
import RootWrapper from "@/components/RootWrapper";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieConsent from "@/components/CookieConsent";

const poppins = Poppins({
  variable: "--font-base",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const raleway = Raleway({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://beautyden.in"), // Replace with your domain
  title: {
    default: "BeautyDen - Professional Beauty Services at Your Doorstep",
    template: "%s | BeautyDen",
  },
  description:
    "Experience premium beauty services at home. Professional makeup, skincare, hair care, spa treatments delivered by certified experts across India.",
  keywords: [
    "beauty services",
    "home beauty service",
    "professional makeup",
    "bridal makeup",
    "skincare",
    "hair care",
    "spa at home",
    "beauty salon at home",
    "beauty parlour at home",
  ],
  authors: [{ name: "BeautyDen" }],
  creator: "BeautyDen",
  publisher: "BeautyDen",
  alternates: {
    canonical: "https://beautyden.in",
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://beautyden.in",
    title: "BeautyDen - Professional Beauty Services at Your Doorstep",
    description:
      "Experience premium beauty services at home. Professional makeup, skincare, hair care delivered by certified experts.",
    siteName: "BeautyDen",
    images: [
      {
        url: "https://beautyden.in/logo.png",
        width: 1200,
        height: 630,
        alt: "BeautyDen Beauty Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BeautyDen - Professional Beauty Services at Your Doorstep",
    description:
      "Experience premium beauty services at home delivered by certified experts.",
    images: ["https://beautyden.in/twitter-image.jpg"],
    creator: "@beautyden",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${raleway.variable} antialiased`}>
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        <RootWrapper>{children}</RootWrapper>
        <CookieConsent />

        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Vrushik Visavadiya",
              jobTitle: "Frontend Developer",
              url: "https://vrushikvisavadiya.com/",
              worksFor: {
                "@type": "Organization",
                name: "Beauty Den",
              },
            }),
          }}
        />
      </body>
    </html>
  );
}
