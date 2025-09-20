export interface City {
  id: string;
  name: string;
  state: string;
  area: string;
  slug: string | null;
  icon: string | null;
  launch_quarter: string | null;
  is_popular: string;
  status:string | number;
}

export interface CitiesResponse {
  code: number;
  status: boolean;
  message: string;
  data: City[];
}
