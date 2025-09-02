export interface BlogCategory {
  id: number;
  name: string;
  icon: string | null;
  description: string | null;
  is_popular: number;
}

export interface BlogCategoriesResponse {
  code: number;
  status: boolean;
  message: string;
  data: BlogCategory[];
}

export interface Blog {
  id: number;
  category_id: number;
  category_name: string;
  title: string;
  slug: string | null;
  excerpt: string | null;
  content: string | null;
  read_time: string | null;
  author: string | null;
  publish_date: string;
  tags: string[];
  icon: string | null;
  featured: number;
}

export interface BlogsResponse {
  code: number;
  status: boolean;
  message: string;
  data: Blog[];
}

export interface BlogViewResponse {
  code: number;
  status: boolean;
  message: string;
  data: Blog;
}

export interface BlogFilters {
  search?: string;
  category_id?: string;
}
