import {
  HiSparkles,
  HiOutlineScissors,
  HiOutlineHeart,
  HiOutlineStar,
} from "react-icons/hi2";

import { HiOutlineColorSwatch } from "react-icons/hi";

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const categories: Category[] = [
  {
    id: "all",
    name: "All Services",
    description: "Browse all available beauty services",
    icon: HiSparkles,
  },
  {
    id: "hair",
    name: "Hair Services",
    description: "Professional hair cutting, styling, and coloring",
    icon: HiOutlineScissors,
  },
  {
    id: "face",
    name: "Face & Skin",
    description: "Rejuvenating facials and skincare treatments",
    icon: HiSparkles,
  },
  {
    id: "nails",
    name: "Nail Care",
    description: "Manicure, pedicure, and nail treatments",
    icon: HiOutlineHeart,
  },
  {
    id: "makeup",
    name: "Makeup",
    description: "Professional makeup for events and special occasions",
    icon: HiOutlineColorSwatch,
  },
  {
    id: "wellness",
    name: "Wellness",
    description: "Relaxing massage and therapeutic treatments",
    icon: HiOutlineStar,
  },
];
