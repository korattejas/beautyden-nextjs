import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import { FAQResponse } from "@/types/faq";

export const getFAQs = async (): Promise<FAQResponse> => {
  try {
    const response = await api.get(endpoints.FAQS);

    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    throw error;
  }
};
