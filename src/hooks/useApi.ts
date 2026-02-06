// src/hooks/useApi.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getServices,
  getServiceById,
  ServicesFilters,
  ServicesResponse,
} from "@/services/services.service";
import { getServiceCategories } from "@/services/categories.service";
import { getReviews } from "@/services/reviews.service";
import { ReviewsFilters } from "@/types/reviews";
import { getTeamMembers } from "@/services/team.service";
import {
  getBlogById,
  getBlogCategories,
  getBlogs,
} from "@/services/blog.service";
import { BlogFilters } from "@/types/blog";
import { getFAQs } from "@/services/faq.service";
import { getPolicies } from "@/services/policy.service";
import { PolicyType } from "@/types/policy";
import { getSettings } from "@/services/settings.service";
import { getHomeCounters } from "@/services/homeCounter.service";
import { getProductBrands } from "@/services/productBrand.service";
import { getPortfolio } from "@/services/portfolio.service";
import { useCityContext } from "../contexts/CityContext";

// Services hooks
export const useServices = (filters: ServicesFilters = {}) => {
  const { selectedCity } = useCityContext(); // ✅ get city from context
  return useQuery<ServicesResponse, Error, ServicesResponse, (string | { city_id: string | undefined; search?: string; category_id?: string; subcategory_id?: string | null; page?: number; })[]>({
    // queryKey: ["services", filters],
    // queryFn: () => getServices(filters),

  
    queryKey: ["services", { ...filters, city_id: selectedCity?.id }], // ✅ include in key
    queryFn: () => getServices({ ...filters, city_id: selectedCity?.id }), // ✅ include in query
    staleTime: 5 * 60 * 1000, // 5 minutes
    placeholderData: (prev) => prev as ServicesResponse,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });
};

export const useService = (id: string) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });
};

// Categories hooks
export const useServiceCategories = () => {
  return useQuery({
    queryKey: ["serviceCategories"],
    queryFn: getServiceCategories,
    staleTime: 30 * 60 * 1000,
  });
};

export const useReviews = (filters: ReviewsFilters = {}) => {
  return useQuery({
    queryKey: ["reviews", filters],
    queryFn: () => getReviews(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    // keepPreviousData: true,
  });
};

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ["teamMembers"],
    queryFn: getTeamMembers,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

export const useBlogCategories = () => {
  return useQuery({
    queryKey: ["blogCategories"],
    queryFn: getBlogCategories,
    staleTime: 30 * 60 * 1000,
  });
};

export const useBlogs = (filters: BlogFilters = {}) => {
  return useQuery({
    queryKey: ["blogs", filters],
    queryFn: () => getBlogs(filters),
    staleTime: 5 * 60 * 1000,
    // keepPreviousData: true,
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
    staleTime: 10 * 60 * 1000,
    enabled: !!id,
  });
};

export const useFAQs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: getFAQs,
    staleTime: 30 * 60 * 1000,
  });
};

export const usePolicy = (type: PolicyType) => {
  return useQuery({
    queryKey: ["policy", type],
    queryFn: () => getPolicies(type),
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const useHomeCounters = () => {
  return useQuery({
    queryKey: ["homeCounters"],
    queryFn: getHomeCounters,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const useProductBrands = () => {
  return useQuery({
    queryKey: ["productBrands"],
    queryFn: getProductBrands,
    staleTime: 60 * 60 * 1000, // 1 hour
  });
};

export const usePortfolio = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: getPortfolio,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
