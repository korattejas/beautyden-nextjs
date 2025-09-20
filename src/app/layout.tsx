import type { Metadata } from "next";
import { Raleway, Poppins } from "next/font/google";
import "./globals.css";
import RootWrapper from "@/components/RootWrapper";

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
  title: "BeautyDen - Professional Beauty At Your Doorstep",
  description:
    "Experience luxury beauty services in the comfort of your home. Our certified professionals bring salon-quality treatments directly to you.",
  keywords:
    "beauty services, home beauty, professional makeup, skincare, nail care",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${raleway.variable} antialiased`}>
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  );
}
