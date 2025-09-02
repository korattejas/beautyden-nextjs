export interface BookingService {
  id: string;
  name: string;
  price: number;
  duration: string;
  category_id: string;
  category_name: string;
  description?: string;
  icon?: string;
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
