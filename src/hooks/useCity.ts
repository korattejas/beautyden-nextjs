import { useCityContext } from "@/contexts/CityContext";

// Custom hook for easy access to city functionality
export const useCity = () => {
  const context = useCityContext();

  return {
    selectedCity: context.selectedCity,
    setSelectedCity: context.setSelectedCity,
    showCityPopup: context.showCityPopup,
    setShowCityPopup: context.setShowCityPopup,
    // isFirstVisit: context.isFirstVisit,
    // Helper methods
    clearCity: () => context.setSelectedCity(null),
    reopenCityPopup: () => context.setShowCityPopup(true),
  };
};
