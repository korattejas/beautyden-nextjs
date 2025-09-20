export interface ContactFormData {
  first_name: string;
  last_name?: string | null;
  email: string;
  phone: string;
  // service_id?: string;
  subject?:  string | null; 
  message: string;
}

export interface ContactResponse {
  code: number;
  status: boolean;
  message: string;
  data?: any;
}
