import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import { HiringResponse, HiringFilters } from "@/types/hiring";

const buildQueryString = (filters: HiringFilters): string => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }
  if (filters.city) {
    params.append("city", filters.city);
  }
  if (filters.experienceLevel) {
    params.append("experienceLevel", filters.experienceLevel);
  }

  return params.toString();
};

export const getHiring = async (
  filters: HiringFilters = {}
): Promise<HiringResponse> => {
  try {
    const queryString = buildQueryString(filters);
    const url = queryString
      ? `${endpoints.HIRING}?${queryString}`
      : endpoints.HIRING;

    const response = await api.get(url);

    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching hiring data:", error);
    throw error;
  }
};
