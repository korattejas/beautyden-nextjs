import { services } from "./services";

// Export everything from one place for easy imports
export { services, type Service } from "./services";
export { categories, type Category } from "./categories";

// Helper functions
export const getServiceById = (id: number) => {
  return services.find((service) => service.id === id);
};

export const getServicesByCategory = (categoryId: string) => {
  if (categoryId === "all") return services;
  return services.filter((service) => service.category === categoryId);
};

export const getFeaturedServices = (limit: number = 6) => {
  return services.sort((a, b) => b.rating - a.rating).slice(0, limit);
};

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
  }).format(price);
};
