import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";

export interface Service {
  id: string;
  category_id: string;
  category_name: string;
  name: string;
  price: string;
  discount_price: string;
  duration: string;
  rating: string | null;
  reviews: string | null;
  description: string;
  includes: string[];
  icon: string;
  is_popular: string;
}

export interface ServicesResponse {
  code: number;
  status: boolean;
  message: string;
  data: Service[];
}

export interface ServicesFilters {
  search?: string;
  category_id?: string;
}

const buildQueryString = (filters: ServicesFilters): string => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }
  if (filters.category_id && filters.category_id !== "9") {
    // 9 is "All Services"
    params.append("category_id", filters.category_id);
  }

  return params.toString();
};

export const getServices = async (
  filters: ServicesFilters = {}
): Promise<ServicesResponse> => {
  try {
    const queryString = buildQueryString(filters);
    const url = queryString
      ? `${endpoints.SERVICES}?${queryString}`
      : endpoints.SERVICES;

    const response = await api.post(url);
    console.log("response: ", response);

    // Check if response is encrypted (production)
    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      console.log("decryptedData: ", decryptedData);
      return decryptedData;
    }

    // Return as-is for test environment
    return response.data;
  } catch (error) {
    console.error("Error fetching services:", error);
    throw error;
  }
};
export const getServiceById = async (id: string): Promise<Service> => {
  try {
    const response = await api.get(endpoints.SERVICE_BY_ID(id));

    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData.data;
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching service:", error);
    throw error;
  }
};
