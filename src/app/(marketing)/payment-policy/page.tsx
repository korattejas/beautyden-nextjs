import PolicyContent from "@/sections/policy/PolicyContent";
import PolicyHero from "@/sections/policy/PolicyHero";

export default function PaymentPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <PolicyHero type="payment_policy" />
      <PolicyContent type="payment_policy" />
    </div>
  );
}
