import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import { ContactFormData, ContactResponse } from "@/types/contact";

export const submitContactForm = async (
  data: ContactFormData
): Promise<ContactResponse> => {
  try {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await api.post(endpoints.CONTACT_FORM, formData, {
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
    console.error("Error submitting contact form:", error);
    throw error;
  }
};
