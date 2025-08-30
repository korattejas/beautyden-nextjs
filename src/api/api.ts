import axios from "axios";

// Determine if we're using test or production
const isTestEnv = process.env.NEXT_PUBLIC_USE_TEST_API === "true";

const BASE_URL = isTestEnv
  ? "https://laravelappversionone.beautyden.in/api/Test"
  : "https://laravelappversionone.beautyden.in/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export default api;
