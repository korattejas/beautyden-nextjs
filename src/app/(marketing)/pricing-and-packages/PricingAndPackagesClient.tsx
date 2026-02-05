"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";
import { useSettings } from "@/hooks/useApi";
interface PricingPackage {
  id: string;
  title: string;
  description: string;
  price: string;
  duration: string;
  features: string[];
}

const PricingAndPackagesClient = () => {
  const [activeTab, setActiveTab] = useState<'combo' | 'all' | 'bridal'>('all');

  // Fetch settings for discount calculations
  const { data: settingsData, isLoading: settingsLoading } = useSettings();
  const settings = settingsData?.data || [];

  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    return settings.find((setting: any) => setting.key === key)?.value || "";
  };

  // Parse number from setting value
  const parseNumberFromSetting = (
    value: string | number | undefined,
    fallback = 0
  ) => {
    if (value === undefined || value === null) return fallback;
    const cleaned = value.toString().replace(/[^[0-9].]/g, "");
    const parsed = parseFloat(cleaned);
    return Number.isNaN(parsed) ? fallback : parsed;
  };

  // Get discount settings
  const specialOfferPercentageSetting = getSetting("special_offer_percentage");
  const specialOfferThresholdSetting = getSetting(
    "special_offer_above_order_discount_amount"
  );
  const specialOfferPercentage = parseNumberFromSetting(
    specialOfferPercentageSetting,
    0
  );
  const specialOfferThreshold = parseNumberFromSetting(
    specialOfferThresholdSetting,
    2500 // Default threshold of 2500 if not set
  );

  // Function to calculate discount for a given price
  const calculateDiscount = (price: string) => {
    // Extract numeric value from price string (remove currency symbols, commas, etc.)
    const numericPrice = parseFloat(price.replace(/[^[0-9].]/g, ""));
    
    // Check if price is above threshold and discount percentage exists
    if (numericPrice >= specialOfferThreshold && specialOfferPercentage > 0) {
      const discountAmount = (numericPrice * specialOfferPercentage) / 100;
      return {
        hasDiscount: true,
        discountAmount: discountAmount,
        finalPrice: numericPrice - discountAmount,
        percentage: specialOfferPercentage
      };
    }
    
    return {
      hasDiscount: false,
      discountAmount: 0,
      finalPrice: numericPrice,
      percentage: 0
    };
  };


  // Sample data for combo packages
  const comboPackages: PricingPackage[] = [
    {
      id: "basic-combo",
      title: "Basic Combo Package",
      description: "Essential services for everyday beauty needs",
      price: "₹2,800",
      duration: "3 hrs",
      features: ["Facial", "Manicure", "Pedicure", "Hair Wash & Style"]
    },
    {
      id: "deluxe-combo",
      title: "Deluxe Combo Package",
      description: "Premium combination of our most popular services",
      price: "₹4,500",
      duration: "5 hrs",
      features: ["Premium Facial", "Full Body Massage", "Manicure & Pedicure", "Hair Spa & Styling"]
    },
    {
      id: "ultimate-combo",
      title: "Ultimate Combo Package",
      description: "Complete beauty transformation experience",
      price: "₹7,200",
      duration: "8 hrs",
      features: ["Premium Facial", "Body Scrub", "Body Wrap", "Manicure & Pedicure", "Hair Treatment", "Makeup"]
    }
  ];

  // Sample data for bridal packages
  const bridalPackages: PricingPackage[] = [
    {
      id: "bridal-prep",
      title: "Bridal Preparation Package",
      description: "Complete pre-wedding beauty regimen",
      price: "₹15,000",
      duration: "Multiple Sessions",
      features: ["6 Facials", "Waxing Sessions", "Manicure & Pedicure", "Trial Makeup", "Skincare Consultation"]
    },
    {
      id: "bridal-day",
      title: "Bridal Day Package",
      description: "Complete wedding day beauty services",
      price: "₹25,000",
      duration: "Full Day",
      features: ["Preparation Makeup", "Hair Styling", "Touch-ups", "Assistant for Day", "Emergency Kit"]
    },
    {
      id: "bridal-complete",
      title: "Complete Bridal Package",
      description: "Full wedding week beauty services",
      price: "₹45,000",
      duration: "Wedding Week",
      features: ["Pre-wedding Regimen", "Mehendi Day", "Sangeet", "Wedding Day", "Post-Wedding Touch-up"]
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Top Section - Description */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,105,180,0.15),_transparent_55%)]" />
        <Container className="relative py-20 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-primary shadow-sm mb-6">
              <HiSparkles className="h-4 w-4" />
              Pricing & Packages
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                Transparent Pricing, Premium Results
              </h1>
              
        {/* Service Coverage Boxes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {/* Box 1 - Service Coverage */}
                <div className="bg-white/70 p-6 rounded-xl border border-gray-200">
                  <div className="text-xl mb-3">🏠</div>
                  <div className="font-semibold text-gray-900 mb-2">We Come to You</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Home Services</li>
                    <li>• Events</li>
                    <li>• Functions</li>
                    <li>• Marriages</li>
                    <li>• Special Occasions</li>
                  </ul>
                </div>

                {/* Box 2 - Experience & Reliability */}
                <div className="bg-white/70 p-6 rounded-xl border border-gray-200">
                  <div className="text-xl mb-3">✅</div>
                  <div className="font-semibold text-gray-900 mb-2">1000+ Appointments Successfully Completed</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Quality Assured Services</li>
                    <li>• On-Time & Hassle-Free Experience</li>
                    <li>• Trusted by Regular & Event Clients</li>
                    <li>• Consistent results</li>
                  </ul>
                </div>

                {/* Box 3 - Professional Standards */}
                <div className="bg-white/70 p-6 rounded-xl border border-gray-200">
                  <div className="text-xl mb-3">🌟</div>
                  <div className="font-semibold text-gray-900 mb-2">Premium Service Standards</div>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Professional & Trained Staff</li>
                    <li>• Hygiene Maintained at All Times</li>
                    <li>• Best Results Guaranteed</li>
                    <li>• Premium products & sanitized tools</li>
                  </ul>
                </div>
              </div>
       
            </div>
          </div>
        </Container>
      </section>

      {/* Main Sections - Grid */}
      <section className="py-16 md:py-10">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl text-center mb-12">
              Choose Your Perfect Package
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Full Price List Card */}
              <a 
                href="/documents/Beautyden-Company- Brochure-Price-List_compressed.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`block bg-gradient-to-br from-pink-50 to-blue-50 rounded-2xl p-6 border-2 border-pink-100 transition-all cursor-pointer hover:shadow-lg hover:from-pink-100 hover:to-blue-100`}
              >
                <div className="text-4xl mb-4 relative">
                  📋
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    🔥 Most Popular
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Full Price List</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore our complete range of individual beauty services with transparent and affordable pricing.
                  Perfect for clients who prefer selecting services individually.
                </p>
                <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors shadow-sm">
                  View Services & Prices <HiArrowRight className="w-4 h-4" />
                </button>
              </a>

              {/* Combo Packages Card */}
              <a 
                href="/documents/Beautyden-company-combo-package-price-list_compressed.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`block bg-gradient-to-br from-blue-50 to-pink-50 rounded-2xl p-6 border-2 border-blue-100 transition-all cursor-pointer hover:shadow-lg hover:from-blue-100 hover:to-pink-100`}
              >
                <div className="text-4xl mb-4 relative">
                  🎁
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    💎 Best Value
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Combo Packages</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Save more with our specially curated combo packages that offer complete beauty care at the best value.
                  Ideal for regular maintenance and special occasions.
                </p>
                <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors shadow-sm">
                  View Services & Prices <HiArrowRight className="w-4 h-4" />
                </button>
              </a>

              {/* Bridal Packages Card */}
              <a 
                href="/documents/Beautyden-company-bridal-package-price-list_compressed.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`block bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-6 border-2 border-pink-100 transition-all cursor-pointer hover:shadow-lg hover:from-pink-100 hover:to-purple-100`}
              >
                <div className="text-4xl mb-4 relative">
                  👰
                  <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    👰 Bridal Special
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Bridal Packages</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our exclusive bridal packages are designed to make you look radiant and confident on your special day.
                  Customized care, premium products, and expert professionals included.
                </p>
                <button className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium text-sm px-4 py-2 rounded-lg transition-colors shadow-sm">
                  View Services & Prices <HiArrowRight className="w-4 h-4" />
                </button>
              </a>
            </div>
          </div>
        </Container>
      </section>

 {/* Special Offers Box */}
      <section className="py-4 md:py-6">
        <Container>
          <div className="bg-red-50 border border-red-200 text-red-800 rounded-xl p-6 text-center">
            <h2 className="text-xl md:text-2xl font-bold mb-2">🎉 SPECIAL OFFER ALERT! 🎉</h2>
            <p className="text-base md:text-lg max-w-3xl mx-auto">
              Get {specialOfferPercentage}% discount on all packages worth ₹{specialOfferThreshold} or more!
              Limited time offer - Book now to avail the discount.
            </p>
          </div>
        </Container>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 md:py-20 bg-gradient-to-r from-primary/10 to-purple-50">
        <Container>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-4">
              ✨ Ready to Book Your Appointment?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Book your beauty session with our experts today and experience professional care with guaranteed satisfaction.
            </p>
            <a 
              href="https://beautyden.in/book" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-lg"
            >
              Book Now
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PricingAndPackagesClient;