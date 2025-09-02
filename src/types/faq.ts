export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export interface FAQResponse {
  code: number;
  status: boolean;
  message: string;
  data: FAQ[];
}
