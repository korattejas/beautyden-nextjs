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
  reviews: number;
  description: string;
  includes: string[];
  icon: string | null;
  is_popular: number;
}

export interface PaginationLink {
  url: string | null;
  label: string;
  active: boolean;
}

export interface PaginatedData {
  current_page: number;
  data: Service[];
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

export interface ServicesResponse {
  code: number;
  status: boolean;
  message: string;
  data: PaginatedData;
}

export interface ServicesFilters {
  search?: string;
  category_id?: string;
  subcategory_id?:string | null;
  page?: number;
  city_id?: number | string;
}

const buildQueryString = (filters: ServicesFilters): string => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }
  if (filters.category_id && filters.category_id !== "9") {
    params.append("category_id", filters.category_id);
  }
  if(filters.subcategory_id && filters?.subcategory_id !== null){
params.append("sub_category_id",filters?.subcategory_id)
  }
 
  if (filters.page && filters.page > 1) {
    params.append("page", filters.page.toString());
  }
  if(filters.city_id ){
    params.append("city_id", filters.city_id.toString());
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

    // Check if response is encrypted (production)
    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
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
