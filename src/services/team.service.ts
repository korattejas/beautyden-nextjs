import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import { TeamResponse } from "@/types/team";

export const getTeamMembers = async (): Promise<TeamResponse> => {
  try {
    const response = await api.get(endpoints.TEAM_MEMBERS);

    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching team members:", error);
    throw error;
  }
};
