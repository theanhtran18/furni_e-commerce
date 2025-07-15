import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE,
  withCredentials: true, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor lỗi (không cần gắn token vì cookie tự gửi)
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("Chưa đăng nhập hoặc token hết hạn");
      // Optionally: window.location.href = '/login';
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;
