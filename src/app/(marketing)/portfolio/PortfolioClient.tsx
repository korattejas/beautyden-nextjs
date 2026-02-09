"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import PlaceholderImage from "@/components/ui/PlaceholderImage";
import { HiSparkles } from "react-icons/hi2";
import CategoryGalleryModal from "@/components/portfolio/CategoryGalleryModal";
import { PortfolioCategory } from "@/types/portfolio";
import { useSettings } from "@/hooks/useApi";

interface PortfolioClientProps {
  portfolioCategories: PortfolioCategory[];
}

const PortfolioClient = ({ portfolioCategories }: PortfolioClientProps) => {
  const [selectedCategory, setSelectedCategory] = useState<PortfolioCategory | null>(null);
  
  // Get settings from API
  const { data: settingsData } = useSettings();
  const settings = settingsData?.data ?? [];
  
  // Helper function to get setting value by key
  const getSetting = (key: string) => {
    const setting = settings.find((s: any) => s.key === key);
    return setting?.value || "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-primary/10 via-primary/5 to-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,105,180,0.15),_transparent_55%)]" />
        <Container className="relative py-20 md:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-sm font-medium text-primary shadow-sm">
              <HiSparkles className="h-4 w-4" />
              BeautyDen Portfolio
            </div>
            <h1 className="mt-6 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl">
              A Glimpse Into Our Signature Transformations
            </h1>
            <p className="mt-4 text-base text-gray-600 sm:text-lg">
              Explore our curated collection of bridal, editorial, and occasion-ready looks.
              Each makeover blends premium products with expert artistry to bring your vision to life.
            </p>
          </div>
        </Container>
      </section>

      {/* Portfolio Categories Grid */}
      <section className="py-12 md:py-16">
        <Container>
          <div className="mb-10 flex flex-col gap-2 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 md:text-3xl">
              Our Portfolio Categories
            </h2>
            <p className="text-sm text-gray-500 md:text-base">
              Click on any category to explore our beautiful transformations
            </p>
          </div>

          {portfolioCategories.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Portfolio Items Available</h3>
              <p className="text-gray-600">We're working on adding beautiful portfolio items for you.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {portfolioCategories.map((category) => (
                <div
                  key={category.id}
                  className="group relative overflow-hidden rounded-2xl bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer border border-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2"
                  onClick={() => setSelectedCategory(category)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setSelectedCategory(category);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View ${category.name} portfolio with ${category.photos.length} photos`}
                >
                  <div className="relative h-80 w-full bg-gray-100">
                    {category.photos.length > 0 ? (
                      <img
                        src={category.photos[0]}
                        alt={`${category.name} portfolio`}
                        className="absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105"
                        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          // Show placeholder when image fails to load
                          const parent = target.parentElement;
                          if (parent) {
                            const placeholder = document.createElement('div');
                            placeholder.className = 'absolute inset-0';
                            placeholder.innerHTML = '<div class="flex items-center justify-center h-full w-full bg-gray-200"><div class="text-gray-400 text-center"><div class="text-4xl mb-2">📸</div><div class="text-sm">Image not available</div></div></div>';
                            parent.appendChild(placeholder);
                          }
                        }}
                      />
                    ) : (
                      <PlaceholderImage 
                        message="No images available" 
                        className="absolute inset-0"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 transition group-hover:opacity-100" />
                    
                    {/* Photo Count Badge */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-semibold text-gray-900 shadow-lg">
                      {category.photos.length} photos
                    </div>
                    
                    {/* Category Name Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 transition-transform group-hover:translate-y-0">
                      <h3 className="text-xl font-bold mb-1">{category.name}</h3>
                      <p className="text-sm opacity-90">View Collection</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* WhatsApp Message Section */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-green-50 to-teal-50">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl px-6 py-4 shadow-md mb-6">
              <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6 text-white">
                  <path fill="currentColor" d="M17.507 14.307l-.007.077c0 2.485-2.847 5.485-2.847 5.485C13.743 20.346 13 20.5 12 20.5s-1.743-.154-2.653-.631c0 0-2.847-3-2.847-5.485v-.077C6.473 14.09 6 13.184 6 12c0-1.184.473-2.09.473-2.09s2.847-2.908 2.847-2.908c.91 0 1.653-.154 2.653-.631 0 0 2.847 3 2.847 5.485v.077c0 .283-.047.554-.047.554l2.354 1.346c.326.185.4.631.185.985l-.007.019c-.215.354-.631.446-.957.261l-2.146-1.231zm-5.507 3.693c.8 0 1.453-.654 1.453-1.453s-.654-1.453-1.453-1.453-1.453.654-1.453 1.453.654 1.453 1.453 1.453zM12 2C6.477 2 2 6.477 2 12c0 1.63.398 3.165 1.09 4.523L2 22l5.477-1.09c1.358.692 2.893 1.09 4.523 1.09 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                </svg>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="font-semibold text-gray-900">Want to see more photos?</h3>
                <p className="text-sm text-gray-600">Contact us on WhatsApp for additional portfolio items</p>
              </div>
            </div>
            
            <a 
              href={`https://wa.me/91${getSetting("phone_number")}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
            >
              <span className="flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0">
                  <path fill="currentColor" d="M17.507 14.307l-.007.077c0 2.485-2.847 5.485-2.847 5.485C13.743 20.346 13 20.5 12 20.5s-1.743-.154-2.653-.631c0 0-2.847-3-2.847-5.485v-.077C6.473 14.09 6 13.184 6 12c0-1.184.473-2.09.473-2.09s2.847-2.908 2.847-2.908c.91 0 1.653-.154 2.653-.631 0 0 2.847 3 2.847 5.485v.077c0 .283-.047.554-.047.554l2.354 1.346c.326.185.4.631.185.985l-.007.019c-.215.354-.631.446-.957.261l-2.146-1.231zm-5.507 3.693c.8 0 1.453-.654 1.453-1.453s-.654-1.453-1.453-1.453-1.453.654-1.453 1.453.654 1.453 1.453 1.453zM12 2C6.477 2 2 6.477 2 12c0 1.63.398 3.165 1.09 4.523L2 22l5.477-1.09c1.358.692 2.893 1.09 4.523 1.09 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
                </svg>
                <span>Message us on WhatsApp</span>
              </span>
            </a>
            
            <p className="mt-4 text-xs sm:text-sm text-gray-500">
              We'll share our complete portfolio with you instantly
            </p>
          </div>
        </Container>
      </section>

      {/* Category Gallery Modal */}
      <CategoryGalleryModal 
        category={selectedCategory} 
        onClose={() => setSelectedCategory(null)} 
      />
    </div>
  );
};

export default PortfolioClient;