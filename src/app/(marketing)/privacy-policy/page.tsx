import PolicyContent from "@/sections/policy/PolicyContent";
import PolicyHero from "@/sections/policy/PolicyHero";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PolicyHero type="privacy_policy" />
      <PolicyContent type="privacy_policy" />
    </div>
  );
}
