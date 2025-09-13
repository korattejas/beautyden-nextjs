export interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  service_id?: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  code: number;
  status: boolean;
  message: string;
  data?: any;
}
