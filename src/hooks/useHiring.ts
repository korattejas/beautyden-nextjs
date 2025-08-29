import { useQuery } from "@tanstack/react-query";
import { getHiring } from "@/services/hiring.service";
import { getCities } from "@/services/cities.service";
import { HiringFilters } from "@/types/hiring";

// Updated hiring hook with filters
export const useHiring = (filters: HiringFilters = {}) => {
  return useQuery({
    queryKey: ["hiring", filters],
    queryFn: () => getHiring(filters),
    staleTime: 5 * 60 * 1000,
  });
};

// Cities hook
export const useCities = () => {
  return useQuery({
    queryKey: ["cities"],
    queryFn: getCities,
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};
