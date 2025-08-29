import api from "@/api/api";
import authApi from "@/api/authapi";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";

export interface HiringData {
  id: string;
  position: string;
  location: string;
  requirements: string[];
  salary: string;
  type: string;
}

export interface HiringApplication {
  name: string;
  email: string;
  phone: string;
  position: string;
  resume: File;
  cover_letter?: string;
}

export const getHiringData = async (): Promise<HiringData[]> => {
  try {
    const response = await api.get(endpoints.HIRING);

    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData.data;
    }

    return response.data.data;
  } catch (error) {
    console.error("Error fetching hiring data:", error);
    throw error;
  }
};

export const submitHiringApplication = async (
  application: HiringApplication
) => {
  try {
    const formData = new FormData();
    formData.append("name", application.name);
    formData.append("email", application.email);
    formData.append("phone", application.phone);
    formData.append("position", application.position);
    formData.append("resume", application.resume);
    if (application.cover_letter) {
      formData.append("cover_letter", application.cover_letter);
    }

    const response = await authApi.post(
      endpoints.HIRING_APPLICATION,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error submitting application:", error);
    throw error;
  }
};
