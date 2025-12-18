
import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";

export interface BeauticianInquiryFormData {
  name: string;
  address: string;
  phone: string;
  experience_years: string;
  bio: string;
}

export interface BeauticianInquiryResponse {
  code: number;
  status: boolean;
  message: string;
  data?: {
    name: string;
    phone: string;
    experience_years: string;
    address: string;
    bio: string;
    updated_at: string;
    created_at: string;
    id: number;
  };
}

export const submitBeauticianInquiryForm = async (
  data: BeauticianInquiryFormData
): Promise<BeauticianInquiryResponse> => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await api.post(endpoints.BEAUTICIAN_INQUIRY_FORM, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error submitting beautician inquiry form:", error);
    throw error;
  }
};