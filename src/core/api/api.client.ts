import axios from "axios";

// Client-side: calls your Next.js API routes which proxy to backend
export const apiClient = axios.create({
  baseURL: "/api/proxy", // Routes through your Next.js API
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message || "Unexpected server error.";
    return Promise.reject(new Error(message));
  }
);