import { getItem } from "@/lib/local-storage";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
  },
});

const excludedRequestInterceptorPaths = [
  "/auth/login",
]

axiosInstance.interceptors.request.use(
  (config) => {
    const requestPath = config.url;

    if (
      excludedRequestInterceptorPaths.some((path) =>
        requestPath?.includes(path),
      )
    ) {
      return config;
    }

    const accessToken = getItem<string>("accessToken");
    if (config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

const excludedResponseInterceptorPaths = [
  "/auth/login",
  "/auth/refresh",
  "/auth/logout",
  "/store",
];

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const requestPath = error.config?.url;

    if (
      excludedResponseInterceptorPaths.some((path) =>
        requestPath?.includes(path),
      )
    ) {
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
