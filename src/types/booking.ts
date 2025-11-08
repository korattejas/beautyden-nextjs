export interface BookingService {
  id: string;
  name: string;
  price: string; // Changed to string to handle price ranges like "20-50"
  duration: string;
  category_id: string;
  category_name: string;
  description?: string;
  icon?: string;
  discount_price?: string;
}

export interface BookingFormData {
  services: BookingService[];
  selectedDate: string;
  selectedTime: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  specialNotes?: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}
