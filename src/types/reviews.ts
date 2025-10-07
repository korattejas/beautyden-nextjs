import { PaginationLink } from "@/services/services.service";

// src/types/reviews.ts
export interface Review {
  id: number;
  service_id: number;
  service_name: string | null;
  customer_name: string;
  customer_photo: string;
  rating: string | null;
  review: string | null;
  review_date: string;
  helpful_count: number;
  video: string | null;
  is_popular: number;
  created_at: string;
  updated_at: string;
  photos: string[];
}

export interface PaginatedReviewsData {
  current_page: number;
  data: Review[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: PaginationLink[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface ReviewsResponse {
  code: number;
  status: boolean;
  message: string;
  data: PaginatedReviewsData;
}

export interface ReviewsFilters {
  search?: string;
  category_id?: string;
  with_photos?: string;
  with_video?: string;
  rating?: string;
  page?: number;
}
