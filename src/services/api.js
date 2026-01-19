import axios from 'axios';

// Create axios instance
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// "ดักจับก่อนแล้วส่ง" 
// ดึง token จาก localStorage มาแปะไว้ใน Header ที่ชื่อ Authorization
// ทุกครั้งที่สั่ง api.get หรือ api.post  ส่ง token อัตโนมัติ
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


//  "ดักจับเมื่อข้อมูลกลับมา"
// ถ้า 401 Unauthor (Token หมดอายุหรือไม่มีสิทธิ์) และไม่ใช่หน้า login/register
// ข้อยกเว้น: จะไม่ทำอะไรถ้ากำลังอยู่ที่หน้า Login/Register 
// หรือกำลังเช็คสถานะตัวเอง (/auth/me) เพื่อป้องกัน Loop การ Redirect
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const currentPath = window.location.pathname;
      const isAuthPage = currentPath === '/login' || currentPath === '/register';
      const isAuthMeRequest = error.config?.url === '/auth/me';
      
      // การจัดการ ถ้าไม่ใช่ข้อยกเว้น 
      // ระบบจะสั่ง Logout ทันที (ลบ Token ในเครื่องทิ้ง) และส่งผู้ใช้กลับไปหน้า Login
      if (!isAuthPage && !isAuthMeRequest) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth API    เกี่ยวกับการเข้าสู่ระบบ (Login, Register, Profile)
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data)
};



//ที่อยู่
export const addressAPI = {
  getAll: () => api.get("/auth/addresses"),
  create: (data) => api.post("/auth/addresses", data),
  update: (id, data) => api.put(`/auth/addresses/${id}`, data),
  remove: (id) => api.delete(`/auth/addresses/${id}`),
  setDefault: (id) => api.put(`/auth/addresses/${id}/default`),
};


// Product API   เกี่ยวกับสินค้า (ดึงรายการ, ดูรายละเอียด, แก้ไข, ลบ)
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getFeatured: () => api.get('/products/featured'),
  getCategories: () => api.get('/products/categories'),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`)
};

// Order API    เกี่ยวกับการสั่งซื้อ (สร้างออเดอร์, ดูประวัติการสั่งซื้อ)
export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/myorders'),
  getById: (id) => api.get(`/orders/${id}`),
  getAll: () => api.get('/orders'),
  updateStatus: (id, status) => api.put(`/orders/${id}/status`, { status })
};


// Cart API    เกี่ยวกับตะกร้า (ดู/อัปเดต/ล้าง)
export const cartAPI = {
  get: () => api.get('/cart'),
  upsert: (items) => api.put('/cart', { items }),   // แนะนำให้ backend ทำ upsert ที่ PUT
  create: (items) => api.post('/cart', { items }),  // เผื่อ backend แยก POST
  clear: () => api.delete('/cart')
};

export default api;














