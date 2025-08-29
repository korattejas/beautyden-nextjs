import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  services_count: number;
}

export interface CategoriesResponse {
  code: number;
  status: boolean;
  message: string;
  data: Category[];
}

export const getCategories = async (): Promise<CategoriesResponse> => {
  try {
    const response = await api.get(endpoints.CATEGORIES);

    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
