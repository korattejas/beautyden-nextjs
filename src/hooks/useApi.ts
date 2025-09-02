import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getServices,
  getServiceById,
  ServicesFilters,
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

// Services hooks
export const useServices = (filters: ServicesFilters = {}) => {
  return useQuery({
    queryKey: ["services", filters],
    queryFn: () => getServices(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
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
    staleTime: 5 * 60 * 1000,
  });
};

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ["teamMembers"],
    queryFn: getTeamMembers,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// Hiring hooks
// export const useHiring = () => {
//   return useQuery({
//     queryKey: ["hiring"],
//     queryFn: getHiringData,
//   });
// };

// export const useSubmitApplication = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: submitHiringApplication,
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["hiring"] });
//     },
//   });
// };

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
    // cacheTime: 10 * 60 * 1000,
  });
};

export const useBlog = (id: string) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
    staleTime: 10 * 60 * 1000,
    // cacheTime: 30 * 60 * 1000,
    enabled: !!id,
  });
};

export const useFAQs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: getFAQs,
    staleTime: 30 * 60 * 1000, // 30 minutes
    // cacheTime: 60 * 60 * 1000, // 1 hour
  });
};

export const usePolicy = (type: PolicyType) => {
  return useQuery({
    queryKey: ["policy", type],
    queryFn: () => getPolicies(type),
    staleTime: 60 * 60 * 1000, // 1 hour
    // cacheTime: 2 * 60 * 60 * 1000, // 2 hours
  });
};
