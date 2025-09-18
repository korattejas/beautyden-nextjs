export interface ServiceCategory {
  id: number;
  name: string;
  icon: string | null;
  description: string;
  is_popular: number;
  subcategories:any;
}

export interface ServiceCategoriesResponse {
  code: number;
  status: boolean;
  message: string;
  data: ServiceCategory[];
}
