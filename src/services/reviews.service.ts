import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import { ReviewsResponse, ReviewsFilters } from "@/types/reviews";

const buildQueryString = (filters: ReviewsFilters): string => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }
  if (filters.service_id) {
    params.append("service_id", filters.service_id);
  }
  if (filters.with_photos) {
    params.append("with_photos", filters.with_photos);
  }
  if (filters.with_video) {
    params.append("with_video", filters.with_video);
  }
  if (filters.rating) {
    params.append("rating", filters.rating);
  }

  return params.toString();
};

export const getReviews = async (
  filters: ReviewsFilters = {}
): Promise<ReviewsResponse> => {
  try {
    const queryString = buildQueryString(filters);
    const url = queryString
      ? `${endpoints.CUSTOMER_REVIEWS}?${queryString}`
      : endpoints.CUSTOMER_REVIEWS;

    const response = await api.post(url);

    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    throw error;
  }
};
