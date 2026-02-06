export interface PortfolioCategory {
  id: number;
  name: string;
  photos: string[];
}

export interface PortfolioResponse {
  code: number;
  status: boolean;
  message: string;
  data: PortfolioCategory[];
}

export interface PortfolioItem {
  src: string;
  category?: string;
}