import api from "@/api/api";
import { decryptData } from "@/utils/encryption";

export interface HomeCounter {
  id: number;
  label: string;
  value: string;
  icon: string | null;
}

export interface HomeCountersResponse {
  code: number;
  status: boolean;
  message: string;
  data: HomeCounter[];
}

export const getHomeCounters = async (): Promise<HomeCountersResponse> => {
  try {
    const response = await api.get("/V1/homeCounter");
    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching home counters:", error);
    throw error;
  }
};
