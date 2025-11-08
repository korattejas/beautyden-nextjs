import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";

export interface SendOtpPayload {
  mobile_number: string;
}

export interface SendOtpResponse {
  code: number;
  status: boolean;
  message: string;
  data?: any;
}

export interface VerifyOtpPayload {
  mobile_number: string;
  otp: string;
}

export interface VerifyOtpResponse {
  code: number;
  status: boolean;
  message: string;
  data?: any;
}

export const sendOtp = async (payload: SendOtpPayload): Promise<SendOtpResponse> => {
  try {
    const formData = new FormData();
    formData.append("mobile_number", payload.mobile_number);

    const response = await api.post(endpoints.SEND_OTP, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Check if response is encrypted (production)
    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const verifyOtp = async (payload: VerifyOtpPayload): Promise<VerifyOtpResponse> => {
  try {
    const formData = new FormData();
    formData.append("mobile_number", payload.mobile_number);
    formData.append("otp", payload.otp);

    const response = await api.post(endpoints.VERIFY_OTP, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // Check if response is encrypted (production)
    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error verifying OTP:", error);
    throw error;
  }
};

export interface GetProfilePayload {
  mobile_number: string;
}

export interface GetProfileResponse {
  code: number;
  status: boolean;
  message: string;
  data?: {
    name?: string;
    email?: string;
    mobile_number?: string;
    address?: string;
  };
}

export interface UpdateProfilePayload {
  mobile_number: string;
  name?: string;
  email?: string;
  address?: string;
}

export interface UpdateProfileResponse {
  code: number;
  status: boolean;
  message: string;
  data?: any;
}

export interface LogoutPayload {
  mobile_number: string;
}

export interface LogoutResponse {
  code: number;
  status: boolean;
  message: string;
  data?: any;
}

const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("bd_auth_token");
};

export const getProfile = async (payload: GetProfilePayload): Promise<GetProfileResponse> => {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append("mobile_number", payload.mobile_number);

    const headers: any = {
      "Content-Type": "multipart/form-data",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await api.post(endpoints.GET_PROFILE, formData, { headers });

    // Check if response is encrypted (production)
    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateProfile = async (payload: UpdateProfilePayload): Promise<UpdateProfileResponse> => {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append("mobile_number", payload.mobile_number);
    if (payload.name) formData.append("name", payload.name);
    if (payload.email) formData.append("email", payload.email);
    if (payload.address) formData.append("address", payload.address);

    const headers: any = {
      "Content-Type": "multipart/form-data",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await api.post(endpoints.UPDATE_PROFILE, formData, { headers });

    // Check if response is encrypted (production)
    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const customerLogout = async (payload: LogoutPayload): Promise<LogoutResponse> => {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append("mobile_number", payload.mobile_number);

    const headers: any = {
      "Content-Type": "multipart/form-data",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await api.post(endpoints.CUSTOMER_LOGOUT, formData, { headers });

    // Check if response is encrypted (production)
    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error logging out:", error);
    throw error;
  }
};

export interface GetTotalBookServicePayload {
  mobile_number: string;
}

export interface GetTotalBookServiceResponse {
  code: number;
  status: boolean;
  message: string;
  data?: Array<{
    id: number;
    order_number: string;
    appointment_date: string;
    appointment_time: string;
    city_name: string | null;
    total_services: number;
  }>;
}

export interface GetBookServiceDetailsPayload {
  mobile_number: string;
  appointment_id: string | number;
}

export interface GetBookServiceDetailsResponse {
  code: number;
  status: boolean;
  message: string;
  data?: {
    id: number;
    order_number: string;
    price: string;
    discount_price: string | null;
    service_address: string;
    appointment_date: string;
    appointment_time: string;
    special_notes: string | null;
    status: number;
    created_at: string;
    updated_at: string;
    city_name: string | null;
    services: string[];
  };
}

export const getTotalBookService = async (payload: GetTotalBookServicePayload): Promise<GetTotalBookServiceResponse> => {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append("mobile_number", payload.mobile_number);

    const headers: any = {
      "Content-Type": "multipart/form-data",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await api.post(endpoints.GET_TOTAL_BOOK_SERVICE, formData, { headers });

    // Check if response is encrypted (production)
    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const getBookServiceDetails = async (payload: GetBookServiceDetailsPayload): Promise<GetBookServiceDetailsResponse> => {
  try {
    const token = getAuthToken();
    const formData = new FormData();
    formData.append("mobile_number", payload.mobile_number);
    formData.append("appointment_id", String(payload.appointment_id));

    const headers: any = {
      "Content-Type": "multipart/form-data",
    };
    
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await api.post(endpoints.GET_BOOK_SERVICE_DETAILS, formData, { headers });

    // Check if response is encrypted (production)
    if (typeof response.data === "string" && response.data.includes(":")) {
      const decryptedData = decryptData(response.data);
      return decryptedData;
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching booking details:", error);
    throw error;
  }
};

