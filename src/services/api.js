import axios from "axios";
import { config } from "../config/config";

const api = axios.create({
  baseURL: `${config.apiUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      if (
        !currentPath.includes("/login") &&
        !currentPath.includes("/register")
      ) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (data) => api.post("/auth/login", data),
  register: (data) => api.post("/auth/register", data),
  getMe: () => api.get("/auth/me"),
  updateProfile: (data) => api.put("/auth/profile", data),
};

// Product API
export const productAPI = {
  getAll: (params) => api.get("/products", { params }),
  getById: (id) => api.get(`/products/${id}`),
  getFeatured: () => api.get("/products/featured"),
  getCategories: () => api.get("/products/categories"),
  create: (data) => api.post("/products", data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Cart API
export const cartAPI = {
  get: () => api.get("/cart"),
  create: (items) => api.post("/cart", { items }),
  upsert: (items) => api.put("/cart", { items }),
  clear: () => api.delete("/cart"),
};

// Order API
export const orderAPI = {
  create: (data) => api.post("/orders", data),
  getMyOrders: () => api.get("/orders/myorders"),
  getById: (id) => api.get(`/orders/${id}`),
  getAll: () => api.get("/orders"),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status }),
  delete: (id) => api.delete(`/orders/${id}`),
};

// Address API (เพิ่ม create และ remove)
export const addressAPI = {
  getAll: () => api.get("/auth/addresses"),
  add: (data) => api.post("/auth/addresses", data),
  create: (data) => api.post("/auth/addresses", data),   
  update: (id, data) => api.put(`/auth/addresses/${id}`, data),
  delete: (id) => api.delete(`/auth/addresses/${id}`),
  remove: (id) => api.delete(`/auth/addresses/${id}`),   
  setDefault: (id) => api.put(`/auth/addresses/${id}/default`),
};

export default api;


