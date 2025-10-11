// "use client";

// import Container from "@/components/ui/Container";
// import Button from "@/components/ui/Button";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { HiHeart, HiSparkles } from "react-icons/hi2";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper/modules";
// import { useSettings } from "@/hooks/useApi";
// import { useState } from "react";

// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// // Fallback slides in case API fails or returns no data
// const fallbackSlides = [
//   {
//     id: 1,
//     image:
//       "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     alt: "Professional Beauty Services",
//   },
//   {
//     id: 2,
//     image:
//       "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     alt: "Bridal & Party Makeup",
//   },
//   {
//     id: 3,
//     image:
//       "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
//     alt: "Skincare & Wellness",
//   },
// ];

// // Fallback content
// const fallbackContent = {
//   title: "Professional Beauty At Your Doorstep",
//   description:
//     "Experience premium beauty treatments in the comfort of your home. Our certified professionals bring salon-quality services directly to you.",
//   badges: [
//     "Certified Professionals",
//     "Premium Products",
//     "Flexible Timing",
//     "Safe & Hygienic",
//   ],
// };

// const HeroSection = () => {
//   const { data: settingsData, isLoading: settingsLoading } = useSettings();
//   const [imageError, setImageError] = useState<Record<string, boolean>>({});

//   // Get homePageSlides from settings
//   const getHomePageSlides = () => {
//     const slides = settingsData?.homePageSlides;

//     if (slides && Array.isArray(slides)) {
//       return slides.map((slide: any, index: number) => ({
//         id: index + 1,
//         image: slide.image,
//         alt: `BeautyDen Professional Service ${index + 1}`,
//       }));
//     }

//     return fallbackSlides;
//   };

//   // Get content from settings
//   const getHomePageContent = () => {
//     const content = settingsData?.homePageSlidesContent;

//     if (content) {
//       return {
//         title: content.title || fallbackContent.title,
//         description: content.description || fallbackContent.description,
//         badges: content.badges || fallbackContent.badges,
//       };
//     }

//     return fallbackContent;
//   };

//   const heroSlides = getHomePageSlides();
//   const heroContent = getHomePageContent();

//   const handleImageError = (slideId: string | number) => {
//     setImageError((prev) => ({ ...prev, [slideId]: true }));
//   };

//   const getImageSrc = (slide: any) => {
//     if (imageError[slide.id]) {
//       return fallbackSlides[0].image;
//     }
//     return slide.image;
//   };

//   if (settingsLoading) {
//     return (
//       <section className="bg-white py-12 md:py-20 lg:py-24 min-h-[80vh] flex items-center">
//         <Container size="xl">
//           <div className="text-center">
//             <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
//             <p className="text-gray-600">Loading...</p>
//           </div>
//         </Container>
//       </section>
//     );
//   }

//   return (
//     <section className="bg-white pt-20 pb-0 sm:pb-12 md:pb-20 lg:pb-24 min-h-[90vh] flex items-center overflow-x-hidden">
//       <Container size="xl">
//         <div className="grid lg:grid-cols-2 gap-0 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
//           {/* Left Content */}
//           <motion.div
//             initial={{ opacity: 0, x: -50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8 }}
//             viewport={{ once: true }}
//             className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1"
//           >
//             {/* Main Headline */}
//             <div className="space-y-3 sm:space-y-4">
//               <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
//                 {heroContent.title}
//               </h1>

//               <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
//                 {heroContent.description}
//               </p>
//             </div>

//             {/* Dynamic Badges/Features */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               {heroContent.badges.map((badge: any, index: number) => (
//                 <motion.div
//                   key={index}
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true }}
//                   className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-primary/5 hover:to-primary/10 rounded-xl sm:rounded-2xl text-xs sm:text-sm transition-all duration-300 group"
//                 >
//                   <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 transition-colors duration-300">
//                     <svg
//                       className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path
//                         fillRule="evenodd"
//                         d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
//                         clipRule="evenodd"
//                       />
//                     </svg>
//                   </div>
//                   <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">
//                     {badge}
//                   </span>
//                 </motion.div>
//               ))}
//             </div>

//             {/* CTA Buttons */}
//             <motion.div
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6, delay: 0.4 }}
//               viewport={{ once: true }}
//               className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
//             >
//               <Button
//                 href="/services"
//                 className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
//               >
//                 Book Service Now
//               </Button>

//               <Button
//                 href="/services"
//                 variant="outline"
//                 className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg transition-all duration-300"
//               >
//                 Explore Services
//               </Button>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, x: 50 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//             className="relative flex justify-center lg:justify-end order-1 lg:order-2 overflow-visible -mx-4 sm:mx-0"
//           >
//             <div className="relative">
//               {/* Rounded 3xl Image Container */}
//               <div className="relative w-full sm:w-[380px] sm:h-[380px] md:w-[430px] md:h-[430px] lg:w-[480px] lg:h-[480px] xl:w-[530px] xl:h-[530px] rounded-none sm:rounded-3xl overflow-hidden shadow-none sm:shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 sm:border-4 border-white h-[320px] sm:min-h-[360px] sm:h-[60vh]">
//                 <Swiper
//                   modules={[Navigation, Pagination, Autoplay]}
//                   slidesPerView={1}
//                   navigation={{
//                     nextEl: ".hero-swiper-button-next",
//                     prevEl: ".hero-swiper-button-prev",
//                   }}
//                   pagination={{
//                     el: ".hero-swiper-pagination",
//                     clickable: true,
//                     bulletClass: "hero-swiper-bullet",
//                     bulletActiveClass: "hero-swiper-bullet-active",
//                   }}
//                   autoplay={{
//                     delay: 4000,
//                     disableOnInteraction: false,
//                     pauseOnMouseEnter: true,
//                   }}
//                   speed={800}
//                   loop={heroSlides.length > 1}
//                   className="w-full h-full"
//                 >
//                   {heroSlides.map((slide: any, index: number) => (
//                     <SwiperSlide key={slide.id} className="!h-full">
//                       <div className="relative w-full h-full">
//                         <Image
//                           src={getImageSrc(slide)}
//                           alt={slide.alt}
//                           fill
//                           className="object-cover group-hover:scale-110 transition-transform duration-700"
//                           priority={index === 0}
//                           onError={() => handleImageError(slide.id)}
//                           unoptimized
//                           sizes="(max-width: 640px) 100vw, (max-width: 1024px) 60vw, 50vw"
//                         />
//                         {/* Overlay gradient */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
//                       </div>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>

//                 {/* Custom Navigation */}
//                 <div className="hero-swiper-button-prev absolute left-2 sm:left-4 lg:left-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white hover:bg-primary hover:text-white backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg border border-gray-200 hover:border-primary">
//                   <svg
//                     className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 19l-7-7 7-7"
//                     />
//                   </svg>
//                 </div>

//                 <div className="hero-swiper-button-next absolute right-2 sm:right-4 lg:right-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white hover:bg-primary hover:text-white backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg border border-gray-200 hover:border-primary">
//                   <svg
//                     className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </div>
//               </div>

//               {/* Decorative Elements */}
//               <motion.div
//                 animate={{ rotate: [0, 360] }}
//                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
//                 className="absolute top-0 right-0 sm:-top-4 sm:-right-4 lg:-top-6 lg:-right-6 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-full blur-lg"
//               />
//               <div className="absolute bottom-0 left-0 sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-6 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gray-200/30 rounded-full blur-lg" />
//               <div className="absolute top-1/4 left-0 sm:-left-8 lg:-left-12 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-primary/5 rounded-full blur-sm" />
//               <div className="absolute bottom-1/4 right-0 sm:-right-8 lg:-right-12 w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14 bg-gray-300/20 rounded-full blur-md" />

//               {/* Floating Info Badges */}
//               <motion.div
//                 animate={{ y: [-10, 10] }}
//                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//                 className="absolute top-1 left-1 sm:-top-6 sm:-left-6 lg:-top-8 lg:-left-8 bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl z-10"
//               >
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
//                     <HiHeart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-foreground text-xs sm:text-sm">
//                       100% Satisfaction
//                     </div>
//                     <div className="text-[10px] sm:text-xs text-foreground/60">
//                       Guaranteed Results
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>

//               <motion.div
//                 animate={{ y: [10, -10] }}
//                 transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
//                 className="absolute bottom-1 right-1 sm:-bottom-6 sm:-right-6 lg:-bottom-8 lg:-right-8 bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl z-10"
//               >
//                 <div className="flex items-center gap-2 sm:gap-3">
//                   <div className="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
//                     <HiSparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
//                   </div>
//                   <div>
//                     <div className="font-semibold text-foreground text-xs sm:text-sm">
//                       Premium Quality
//                     </div>
//                     <div className="text-[10px] sm:text-xs text-foreground/60">
//                       Professional Products
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </div>
//           </motion.div>
//         </div>
//       </Container>

//       <style jsx>{`
//         .hero-swiper-bullet {
//           width: 8px;
//           height: 8px;
//           background: rgba(156, 163, 175, 0.5);
//           border-radius: 50%;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         @media (min-width: 640px) {
//           .hero-swiper-bullet {
//             width: 10px;
//             height: 10px;
//           }
//         }

//         .hero-swiper-bullet-active {
//           background: #000000;
//           transform: scale(1.3);
//         }
//         /* Ensure swiper fills height */
//         :global(.swiper) {
//           height: 100%;
//         }
//         :global(.swiper-wrapper) {
//           height: 100%;
//         }
//         :global(.swiper-slide) {
//           height: 100% !important;
//         }
//       `}</style>
//     </section>
//   );
// };

// export default HeroSection;


"use client";

import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiHeart, HiSparkles } from "react-icons/hi2";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useSettings } from "@/hooks/useApi";
import { useState } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Fallback slides in case API fails or returns no data
const fallbackSlides = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1560066984-138dadb4c035?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Professional Beauty Services",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Bridal & Party Makeup",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Skincare & Wellness",
  },
];

// Fallback content
const fallbackContent = {
  title: "Professional Beauty At Your Doorstep",
  description:
    "Experience premium beauty treatments in the comfort of your home. Our certified professionals bring salon-quality services directly to you.",
  badges: [
    "Certified Professionals",
    "Premium Products",
    "Flexible Timing",
    "Safe & Hygienic",
  ],
};

const HeroSection = () => {
  const { data: settingsData, isLoading: settingsLoading } = useSettings();
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  // Get homePageSlides from settings
  const getHomePageSlides = () => {
    const slides = settingsData?.homePageSlides;

    if (slides && Array.isArray(slides)) {
      return slides.map((slide: any, index: number) => ({
        id: index + 1,
        image: slide.image,
        alt: `BeautyDen Professional Service ${index + 1}`,
      }));
    }

    return fallbackSlides;
  };

  // Get content from settings
  const getHomePageContent = () => {
    const content = settingsData?.homePageSlidesContent;

    if (content) {
      return {
        title: content.title || fallbackContent.title,
        description: content.description || fallbackContent.description,
        badges: content.badges || fallbackContent.badges,
      };
    }

    return fallbackContent;
  };

  const heroSlides = getHomePageSlides();
  const heroContent = getHomePageContent();

  const handleImageError = (slideId: string | number) => {
    setImageError((prev) => ({ ...prev, [slideId]: true }));
  };

  const getImageSrc = (slide: any) => {
    if (imageError[slide.id]) {
      return fallbackSlides[0].image;
    }
    return slide.image;
  };

  if (settingsLoading) {
    return (
      <section className="bg-white py-12 md:py-20 lg:py-24 min-h-[80vh] flex items-center">
        <Container size="xl">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading...</p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-white pt-20 pb-8 sm:pb-12 md:pb-20 lg:pb-24 min-h-[90vh] flex items-center overflow-x-hidden">
      <Container size="xl">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6 lg:space-y-8 order-2 lg:order-1"
          >
            {/* Main Headline */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                {heroContent.title}
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-lg">
                {heroContent.description}
              </p>
            </div>

            {/* Dynamic Badges/Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {heroContent.badges.map((badge: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 hover:from-primary/5 hover:to-primary/10 rounded-xl sm:rounded-2xl text-xs sm:text-sm transition-all duration-300 group"
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 group-hover:bg-primary/20 rounded-full flex items-center justify-center mr-2 sm:mr-3 flex-shrink-0 transition-colors duration-300">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors duration-300">
                    {badge}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4"
            >
              <Button
                href="/services"
                className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                Book Service Now
              </Button>

              <Button
                href="/services"
                variant="outline"
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-medium text-base sm:text-lg transition-all duration-300"
              >
                Explore Services
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end order-1 lg:order-2 overflow-hidden sm:overflow-visible -mx-4 sm:mx-0"
          >
            <div className="relative w-full sm:w-auto">
              {/* Rounded 3xl Image Container */}
              <div className="relative w-full h-[320px] sm:w-[380px] sm:h-[380px] md:w-[430px] md:h-[430px] lg:w-[480px] lg:h-[480px] xl:w-[530px] xl:h-[530px] rounded-none sm:rounded-3xl overflow-hidden shadow-none sm:shadow-2xl bg-gradient-to-br from-gray-100 to-gray-200 border-0 sm:border-2 lg:border-4 border-white">
                <Swiper
                  modules={[Navigation, Pagination, Autoplay]}
                  slidesPerView={1}
                  navigation={{
                    nextEl: ".hero-swiper-button-next",
                    prevEl: ".hero-swiper-button-prev",
                  }}
                  pagination={{
                    el: ".hero-swiper-pagination",
                    clickable: true,
                    bulletClass: "hero-swiper-bullet",
                    bulletActiveClass: "hero-swiper-bullet-active",
                  }}
                  autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  speed={800}
                  loop={heroSlides.length > 1}
                  className="w-full h-full"
                >
                  {heroSlides.map((slide: any, index: number) => (
                    <SwiperSlide key={slide.id}>
                      <div className="relative w-full h-full">
                        <Image
                          src={getImageSrc(slide)}
                          alt={slide.alt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          priority={index === 0}
                          onError={() => handleImageError(slide.id)}
                          unoptimized
                          sizes="(max-width: 640px) 280px, (max-width: 768px) 350px, (max-width: 1024px) 400px, (max-width: 1280px) 450px, 500px"
                        />
                        {/* Overlay gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation */}
                <div className="hero-swiper-button-prev absolute left-2 sm:left-4 lg:left-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white hover:bg-primary hover:text-white backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg border border-gray-200 hover:border-primary">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </div>

                <div className="hero-swiper-button-next absolute right-2 sm:right-4 lg:right-4 top-1/2 transform -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white hover:bg-primary hover:text-white backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 shadow-lg border border-gray-200 hover:border-primary">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 right-0 sm:-top-4 sm:-right-4 lg:-top-6 lg:-right-6 w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-primary/10 rounded-full blur-lg"
              />
              <div className="absolute bottom-0 left-0 sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-6 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 bg-gray-200/30 rounded-full blur-lg" />
              <div className="absolute top-1/4 left-0 sm:-left-8 lg:-left-12 w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-primary/5 rounded-full blur-sm" />
              <div className="absolute bottom-1/4 right-0 sm:-right-8 lg:-right-12 w-9 h-9 sm:w-11 sm:h-11 lg:w-14 lg:h-14 bg-gray-300/20 rounded-full blur-md" />

              {/* Floating Info Badges */}
              <motion.div
                animate={{ y: [-10, 10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1 left-1 sm:-top-6 sm:-left-6 lg:-top-8 lg:-left-8 bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl z-10"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                    <HiHeart className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground text-xs sm:text-sm">
                    100% Satisfaction
                    </div>
                    <div className="text-[10px] sm:text-xs text-foreground/60">
                      Guaranteed Results
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: [0, -8, 0] 
                }}
                transition={{ 
                  opacity: { duration: 0.6, delay: 1.2 },
                  scale: { duration: 0.6, delay: 1.2 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
                }}
                className="absolute bottom-1 right-1 sm:-bottom-6 sm:-right-6 lg:-bottom-8 lg:-right-8 bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl z-10"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <motion.div 
                    className="w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
                  >
                    <HiSparkles className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-foreground text-xs sm:text-sm">
                      Premium Quality
                    </div>
                    <div className="text-[10px] sm:text-xs text-foreground/60">
                      Professional Products
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>

      <style jsx>{`
        .hero-swiper-bullet {
          width: 8px;
          height: 8px;
          background: rgba(156, 163, 175, 0.5);
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        @media (min-width: 640px) {
          .hero-swiper-bullet {
            width: 10px;
            height: 10px;
          }
        }

        .hero-swiper-bullet-active {
          background: #000000;
          transform: scale(1.3);
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
