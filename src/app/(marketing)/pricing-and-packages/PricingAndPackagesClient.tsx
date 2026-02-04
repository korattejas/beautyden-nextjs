"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";
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
        <Container className="relative py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-primary shadow-sm mb-6">
              <HiSparkles className="h-4 w-4" />
              Pricing & Packages
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
                Transparent Pricing, Premium Results
              </h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12">
                <div className="bg-white/70 p-4 rounded-xl border border-gray-200">
                  <div className="text-2xl">✨</div>
                  <div className="font-semibold text-gray-900">Trusted by 1000+ Happy Customers</div>
                  <div className="text-sm text-gray-600">💖</div>
                </div>
                <div className="bg-white/70 p-4 rounded-xl border border-gray-200">
                  <div className="text-2xl">✅</div>
                  <div className="font-semibold text-gray-900">1000+ Appointments Successfully Completed</div>
                  <div className="text-sm text-gray-600">Quality Assured</div>
                </div>
                <div className="bg-white/70 p-4 rounded-xl border border-gray-200">
                  <div className="text-2xl">🌟</div>
                  <div className="font-semibold text-gray-900">Professional Service | Hygiene Maintained | Best Results Guaranteed</div>
                  <div className="text-sm text-gray-600">Premium Standards</div>
                </div>
              </div>
              
              <p className="mt-8 text-base text-gray-600 sm:text-lg max-w-3xl mx-auto">
                At BeautyDen, we believe in delivering premium beauty services with complete hygiene, experienced professionals, and visible results.
                Choose from our wide range of services and affordable packages, thoughtfully designed to suit your beauty needs and preferences.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Main Sections - Grid */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl text-center mb-12">
              Choose Your Perfect Package
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Full Price List Card */}
              <div 
                className={`bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer hover:shadow-lg ${
                  activeTab === 'all' ? 'border-primary shadow-lg' : 'border-gray-200'
                }`}
                onClick={() => setActiveTab('all')}
              >
                <div className="text-3xl mb-4">📋</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Full Price List</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Explore our complete range of individual beauty services with transparent and affordable pricing.
                  Perfect for clients who prefer selecting services individually.
                </p>
                <a 
                  href="/documents/Beautyden-company-combo-package-price-list.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm"
                >
                  View Details <HiArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Combo Packages Card */}
              <div 
                className={`bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer hover:shadow-lg ${
                  activeTab === 'combo' ? 'border-primary shadow-lg' : 'border-gray-200'
                }`}
                onClick={() => setActiveTab('combo')}
              >
                <div className="text-3xl mb-4">🎁</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Combo Packages</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Save more with our specially curated combo packages that offer complete beauty care at the best value.
                  Ideal for regular maintenance and special occasions.
                </p>
                <a 
                  href="/documents/Beautyden-company-combo-package-price-list2.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm"
                >
                  View Details <HiArrowRight className="w-4 h-4" />
                </a>
              </div>

              {/* Bridal Packages Card */}
              <div 
                className={`bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer hover:shadow-lg ${
                  activeTab === 'bridal' ? 'border-primary shadow-lg' : 'border-gray-200'
                }`}
                onClick={() => setActiveTab('bridal')}
              >
                <div className="text-3xl mb-4">👰</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Bridal Packages</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Our exclusive bridal packages are designed to make you look radiant and confident on your special day.
                  Customized care, premium products, and expert professionals included.
                </p>
                <a 
                  href="/documents/Beautyden-company-bridal-package-price-list.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-primary font-medium text-sm"
                >
                  View Details <HiArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
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