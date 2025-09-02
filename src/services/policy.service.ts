import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import { PolicyResponse, PolicyType } from "@/types/policy";

export const getPolicies = async (
  type?: PolicyType
): Promise<PolicyResponse> => {
  try {
    const formData = new FormData();
    formData.append("type", type || "");

    const response = await api.post(endpoints.POLICIES, formData, {
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
    console.error("Error fetching policies:", error);
    throw error;
  }
};
