import api from "@/api/api";
import { endpoints } from "@/api/endpoints";
import { decryptData } from "@/utils/encryption";
import {
  BlogCategoriesResponse,
  BlogsResponse,
  BlogViewResponse,
  BlogFilters,
} from "@/types/blog";

export const getBlogCategories = async (): Promise<BlogCategoriesResponse> => {
  try {
    const response = await api.get(endpoints.BLOG_CATEGORIES);

    if (typeof response.data === "string" && response.data.includes(":")) {
      return decryptData(response.data);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching blog categories:", error);
    throw error;
  }
};

const buildQueryString = (filters: BlogFilters): string => {
  const params = new URLSearchParams();

  if (filters.search) {
    params.append("search", filters.search);
  }
  if (filters.category_id) {
    params.append("category_id", filters.category_id);
  }
  if (filters.page && filters.page > 1) {
    params.append("page", filters.page.toString());
  }
  if (filters.per_page) {
    params.append("per_page", filters.per_page.toString());
  }

  return params.toString();
};

export const getBlogs = async (
  filters: BlogFilters = {}
): Promise<BlogsResponse> => {
  try {
    const queryString = buildQueryString(filters);
    const url = queryString
      ? `${endpoints.BLOGS}?${queryString}`
      : endpoints.BLOGS;

    const response = await api.post(url);

    if (typeof response.data === "string" && response.data.includes(":")) {
      return decryptData(response.data);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
};

export const getBlogById = async (id: string): Promise<BlogViewResponse> => {
  try {
    const response = await api.post(`${endpoints.BLOG_VIEW}?slug=${id}`);
    console.log("response: ", response);

    if (typeof response.data === "string" && response.data.includes(":")) {
      return decryptData(response.data);
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    throw error;
  }
};
