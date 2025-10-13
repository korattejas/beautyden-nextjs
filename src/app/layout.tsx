import type { Metadata } from "next";
import { Raleway, Poppins } from "next/font/google";
import "./globals.css";
import RootWrapper from "@/components/RootWrapper";
import Script from "next/script";
import { GoogleAnalytics } from "@next/third-parties/google";
import CookieConsent from "@/components/CookieConsent";
import { createSEOMetadata } from "@/lib/seo";

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

export const metadata: Metadata = createSEOMetadata();

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
