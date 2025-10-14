import Container from "@/components/ui/Container";
import ContactForm from "@/sections/contact/ContactForm";
import ContactHero from "@/sections/contact/ContactHero";
// import ContactImageSection from "@/sections/contact/ContactImageSection";
import type { Metadata } from "next";
import { createSEOMetadata, siteUrl } from "@/lib/seo";

export const metadata: Metadata = createSEOMetadata({
  titleDefault: "Contact BeautyDen - Book Home Beauty Services",
  description: "Get in touch with BeautyDen for home beauty services. Contact us for booking, support, or inquiries. Professional beauty services delivered to your doorstep.",
  keywords: [
    "contact beauty services",
    "beauty service booking",
    "beauty customer support",
    "beauty service inquiry",
    "beauty service contact",
    "home beauty booking",
    "beauty service help",
    "beauty service support",
    "beauty appointment booking",
    "beauty service customer care"
  ],
  canonical: `${siteUrl}/contact`,
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 mt-16">
      <ContactHero />

      <section className="py-12 sm:py-16 md:py-20">
        {/* <Container> */}
          {/* <div className="max-w-2xl mx-auto"> */}
          <ContactForm />
          {/* </div> */}
        {/* </Container> */}
      </section>
      {/* <ContactImageSection /> */}
    </div>
  );
}
