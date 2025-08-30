export interface Service {
  id: number;
  name: string;
  category: string;
  price: number;
  duration: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  image: string;
  category_id?: string;
  category_name?: string;
  discount_price?: string;
  is_popular?: string;
  icon?: string;
}

export const services: Service[] = [
  {
    id: 1,
    name: "Professional Haircut & Styling",
    category: "hair",
    price: 6400,
    duration: "90 min",
    rating: 4.9,
    reviews: 234,
    description:
      "Expert hair cutting and styling with professional blow dry and finishing",
    features: [
      "Consultation",
      "Wash & Cut",
      "Styling",
      "Professional Products",
    ],
    image: "/images/services/haircut.jpg",
  },
  {
    id: 2,
    name: "Hair Coloring & Highlights",
    category: "hair",
    price: 12000,
    duration: "2-3 hours",
    rating: 4.8,
    reviews: 189,
    description:
      "Professional hair coloring with premium products and color protection",
    features: ["Color Consultation", "Premium Color", "Toner", "Treatment"],
    image: "/images/services/haircolor.jpg",
  },
  {
    id: 3,
    name: "Deep Cleansing Facial",
    category: "face",
    price: 9600,
    duration: "75 min",
    rating: 4.9,
    reviews: 312,
    description:
      "Rejuvenating facial treatment for all skin types with deep cleansing",
    features: ["Skin Analysis", "Deep Cleanse", "Extraction", "Moisturizing"],
    image: "/images/services/facial.jpg",
  },
  {
    id: 4,
    name: "Anti-Aging Treatment",
    category: "face",
    price: 14400,
    duration: "90 min",
    rating: 4.7,
    reviews: 156,
    description:
      "Advanced anti-aging facial with peptides and vitamin treatments",
    features: [
      "Consultation",
      "Peptide Treatment",
      "LED Therapy",
      "Serum Application",
    ],
    image: "/images/services/antiaging.jpg",
  },
  {
    id: 5,
    name: "Classic Manicure",
    category: "nails",
    price: 3600,
    duration: "45 min",
    rating: 4.8,
    reviews: 298,
    description: "Complete nail care with shaping, cuticle care, and polish",
    features: [
      "Nail Shaping",
      "Cuticle Care",
      "Hand Massage",
      "Polish Application",
    ],
    image: "/images/services/manicure.jpg",
  },
  {
    id: 6,
    name: "Gel Manicure & Pedicure",
    category: "nails",
    price: 6800,
    duration: "90 min",
    rating: 4.9,
    reviews: 267,
    description: "Long-lasting gel manicure and pedicure with luxury treatment",
    features: [
      "Gel Polish",
      "Extended Wear",
      "Foot Massage",
      "Hydrating Treatment",
    ],
    image: "/images/services/gelmanicure.jpg",
  },
  {
    id: 7,
    name: "Special Event Makeup",
    category: "makeup",
    price: 9600,
    duration: "75 min",
    rating: 4.9,
    reviews: 203,
    description:
      "Professional makeup application for special occasions and events",
    features: [
      "Consultation",
      "Skin Prep",
      "Full Face Makeup",
      "Setting Spray",
    ],
    image: "/images/services/makeup.jpg",
  },
  {
    id: 8,
    name: "Bridal Makeup Package",
    category: "makeup",
    price: 20000,
    duration: "2 hours",
    rating: 5.0,
    reviews: 145,
    description: "Complete bridal makeup with trial session and touch-up kit",
    features: [
      "Trial Session",
      "Bridal Makeup",
      "Touch-up Kit",
      "Hair Styling",
    ],
    image: "/images/services/bridalmakeup.jpg",
  },
  {
    id: 9,
    name: "Relaxing Massage",
    category: "wellness",
    price: 8000,
    duration: "60 min",
    rating: 4.8,
    reviews: 187,
    description: "Therapeutic massage to relieve stress and muscle tension",
    features: ["Swedish Massage", "Aromatherapy", "Hot Towel", "Relaxation"],
    image: "/images/services/massage.jpg",
  },
];
