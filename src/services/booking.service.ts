import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";

export interface BookAppointmentPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_category_id: string;
  service_id: string;
  appointment_date: string;
  appointment_time: string;
  notes?: string;
  quantity: number;
  price: number;
  discount_price?: number;
  service_address: string;
  service_sub_category_id?: string;
  city_id: string;
  discount_percentage?: number;
}

export interface BookAppointmentResponse {
  code: number;
  status: boolean;
  message: string;
  data: {
    appointment: {
      order_number: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      service_id: string;
      service_category_id: string;
      service_sub_category_id: string | null;
      quantity: string;
      price: string;
      discount_price: string;
      service_address: string;
      appointment_date: string;
      appointment_time: string;
      status: string;
      updated_at: string;
      created_at: string;
      id: number;
    };
    order_number: string;
  };
}

export const bookAppointment = async (
  payload: BookAppointmentPayload
): Promise<BookAppointmentResponse> => {
  const response = await api.post(endpoints.BOOK_APPOINTMENT, payload);
  console.log("response----", response);
  if (typeof response.data === "string" && response.data.includes(":")) {
    return decryptData(response.data);
  }
  return response.data;
};