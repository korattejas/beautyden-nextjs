import PolicyContent from "@/sections/policy/PolicyContent";
import PolicyHero from "@/sections/policy/PolicyHero";

export default function TermsConditionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PolicyHero type="terms_conditions" />
      <PolicyContent type="terms_conditions" />
    </div>
  );
}
