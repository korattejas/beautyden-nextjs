import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import { PortfolioCategory, PortfolioResponse } from "@/types/portfolio";

export const getPortfolio = async (): Promise<PortfolioResponse> => {
  try {
    const response = await api.get(endpoints.PORTFOLIO);
    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    throw error;
  }
};