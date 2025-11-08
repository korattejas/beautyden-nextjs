import FAQHero from "@/sections/faq/FAQHero";
import FAQList from "@/sections/faq/FAQList";

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <FAQHero />
      <FAQList />
    </div>
  );
}
