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

  // Customer OTP
  SEND_OTP: "/V1/customer/sendOtpOnMobileNumber",
  VERIFY_OTP: "/V1/customer/verifyOtpOnMobileNumber",
  
  // Customer Profile
  GET_PROFILE: "/V1/customer/getProfile",
  UPDATE_PROFILE: "/V1/customer/profileUpdate",
  CUSTOMER_LOGOUT: "/V1/customer/logout",
  
  // Customer Orders
  GET_TOTAL_BOOK_SERVICE: "/V1/customer/getTotalBookService",
  GET_BOOK_SERVICE_DETAILS: "/V1/customer/getBookServiceDetails",

  // Bookings
  BOOKINGS: "/V1/bookings",
  CREATE_BOOKING: "/V1/bookings/create",
  BOOK_APPOINTMENT: "/V1/bookAppointment",

  // Reviews
  REVIEWS: "/V1/reviews",
  CREATE_REVIEW: "/V1/reviews/create",

  // Cities
  CITIES: "/V1/cities",

  CUSTOMER_REVIEWS: "/V1/customerReview",

  TEAM_MEMBERS: "/V1/teamMember",

  CONTACT_FORM: "/V1/contactFormSubmit",

  BLOG_CATEGORIES: "/V1/blogCategory",
  BLOGS: "/V1/blogs",
  BLOG_VIEW: "/V1/blogView",
  FAQS: "/V1/faqs",
  POLICIES: "/V1/policies",

  SETTINGS: "/V1/settings",
  
  // Product Brands
  PRODUCT_BRANDS: "/V1/productBrand",
} as const;
