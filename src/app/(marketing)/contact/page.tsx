import Container from "@/components/ui/Container";
import ContactForm from "@/sections/contact/ContactForm";
import ContactHero from "@/sections/contact/ContactHero";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <ContactHero />

      <section className="py-20">
        <Container>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </Container>
      </section>
    </div>
  );
}
