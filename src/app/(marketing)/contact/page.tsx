import Container from "@/components/ui/Container";
import ContactForm from "@/sections/contact/ContactForm";
import ContactHero from "@/sections/contact/ContactHero";
// import ContactImageSection from "@/sections/contact/ContactImageSection";

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
