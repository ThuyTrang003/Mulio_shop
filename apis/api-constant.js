import axios from "axios";

import { useAuthStore } from "@/stores/auth";

// Cấu hình Axios để gửi cookie
const apiClient = axios.create({
    baseURL: "http://localhost:8080/", // URL API của bạn
});

apiClient.interceptors.request.use(
    (config) => {
        const token = useAuthStore.getState().token.accessToken;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Cài interceptor
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { response } = error;
        const authStore = useAuthStore.getState();
        if (
            response.status === 401 &&
            response.data ===
                "Unauthorized: Full authentication is required to access this resource"
        ) {
            authStore.refreshToken();
            // Lấy token mới sau khi refresh
            const newAccessToken = authStore.token.accessToken;
            console.log("401");
            if (newAccessToken) {
                // Cập nhật header Authorization
                error.config.headers.Authorization = `Bearer ${newAccessToken}`;

                // Gửi lại request với token mới
                return apiClient.request(error.config);
            }
        }

        return Promise.reject(error);
    },
);
export default apiClient;
