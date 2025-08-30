export interface CustomerReview {
  id: number;
  service_id: number;
  service_name: string | null;
  customer_name: string;
  customer_photo: string | null;
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

export interface ReviewsResponse {
  code: number;
  status: boolean;
  message: string;
  data: CustomerReview[];
}

export interface ReviewsFilters {
  search?: string;
  service_id?: string;
  with_photos?: string;
  with_video?: string;
  rating?: string;
}
