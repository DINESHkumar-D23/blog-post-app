import axios from "axios";

// API Base URL - Update this with your gateway URL
// For development, you can use a local gateway or the Cloud Run URL
const API_BASE_URL = 
  import.meta.env.VITE_API_URL || 
  "https://blog-gateway.onrender.com";

const API = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to requests if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Only redirect if we're not already on login/signup
      const path = window.location.pathname;
      if (!path.includes("login") && !path.includes("signup")) {
        window.location.href = "/login";
      }
    }
    
    return Promise.reject(error);
  }
);

export default API;
