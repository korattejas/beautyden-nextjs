import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services - BeautyDen",
  description:
    "Explore our wide range of professional beauty services. From makeup and skincare to nail care and hair styling, we bring salon-quality treatments to your doorstep.",
  keywords:
    "beauty services, home beauty services, makeup services, skincare, nail care, hair styling, beauty treatments",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

