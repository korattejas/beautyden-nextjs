import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { CitiesResponse } from "@/types/city";
import { decryptData } from "@/utils/encryption";

export const getCities = async (): Promise<CitiesResponse> => {
  try {
    const response = await api.get(endpoints.CITIES);

    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching cities:", error);
    throw error;
  }
};
