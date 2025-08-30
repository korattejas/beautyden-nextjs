export const endpoints = {
  // Services
  SERVICES: "/V1/services",
  SERVICE_BY_ID: (id: string) => `/V1/services/${id}`,

  // Categories
  SERVICE_CATEGORIES: "/V1/serviceCategory",
  CATEGORIES: "/V1/categories",
  CATEGORY_BY_ID: (id: string) => `/V1/categories/${id}`,

  // Hiring
  HIRING: "/V1/hiring",
  HIRING_APPLICATION: "/V1/hiring/apply",

  // Authentication
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  PROFILE: "/auth/profile",

  // Bookings
  BOOKINGS: "/V1/bookings",
  CREATE_BOOKING: "/V1/bookings/create",

  // Reviews
  REVIEWS: "/V1/reviews",
  CREATE_REVIEW: "/V1/reviews/create",

  // Cities
  CITIES: "/V1/cities",

  CUSTOMER_REVIEWS: "/V1/customerReview",

  TEAM_MEMBERS: "/V1/teamMember",

  CONTACT_FORM: "/V1/contactFormSubmit",
} as const;
