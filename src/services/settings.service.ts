import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";

export interface Setting {
  id: number;
  screen_name: string | null;
  key: string;
  value: string;
}

export interface SettingsResponse {
  code: number;
  status: boolean;
  message: string;
  data: Setting[];
  homePageSlides: any;
  homePageSlidesContent: any;
}

export const getSettings = async (): Promise<SettingsResponse> => {
  try {
    const response = await api.get(endpoints.SETTINGS);
    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    throw error;
  }
};

// export const getSettings = async (): Promise<SettingsResponse> => {
//   try {
//     const formData = new FormData();
//     formData.append("type", type || "");

//     const response = await api.post(endpoints.POLICIES, formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     });

//     if (typeof response.data === "string" && response.data.includes(":")) {
//       const decryptedData = decryptData(response.data);
//       return decryptedData;
//     }

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching policies:", error);
//     throw error;
//   }
// };
