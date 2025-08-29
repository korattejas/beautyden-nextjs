import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getServices, getServiceById } from "@/services/services.service";
import { getCategories } from "@/services/categories.service";
import {
  getHiringData,
  submitHiringApplication,
} from "@/services/hiring.service";

// Services hooks
export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
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
export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hiring hooks
export const useHiring = () => {
  return useQuery({
    queryKey: ["hiring"],
    queryFn: getHiringData,
  });
};

export const useSubmitApplication = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: submitHiringApplication,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hiring"] });
    },
  });
};
