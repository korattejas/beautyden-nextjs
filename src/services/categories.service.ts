import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import { ServiceCategoriesResponse } from "@/types/categories";

export const getServiceCategories =
  async (): Promise<ServiceCategoriesResponse> => {
    try {
      const response = await api.get(endpoints.SERVICE_CATEGORIES);

      if (typeof response.data === "string" && response.data.includes(":")) {
        const decryptedData = decryptData(response.data);
        return decryptedData;
      }

      return response.data;
    } catch (error) {
      console.error("Error fetching service categories:", error);
      throw error;
    }
  };
