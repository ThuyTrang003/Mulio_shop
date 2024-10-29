import axios from "axios";
import {useAuthStore} from "@/stores/auth";
// Cấu hình Axios để gửi cookie
const apiClient = axios.create({
    baseURL: "http://localhost:8080/", // URL API của bạn
});

apiClient.interceptors.request.use(
    (config) => {
      const token =useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
export default apiClient;
