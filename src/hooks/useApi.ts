import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getServices,
  getServiceById,
  ServicesFilters,
} from "@/services/services.service";
import { getServiceCategories } from "@/services/categories.service";
import { getReviews } from "@/services/reviews.service";
import { ReviewsFilters } from "@/types/reviews";

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
