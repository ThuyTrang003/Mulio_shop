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
        if (
            response.status === 401 &&
            response.data === "Invalid or expired refresh token"
        ) {
            try {
                // Lấy refreshToken từ store
                const authStore = useAuthStore.getState();
                const { refreshToken } = authStore.token.refreshToken;

                if (!refreshToken) {
                    console.log("No refresh token available. Logging out...");
                    authStore.resetAuth();
                    return Promise.reject(error);
                }

                // Gọi API refresh token
                const refreshResponse = await axios.post(
                    "http://localhost:8080/api/auth/refresh-token",
                    {
                        refreshToken,
                    },
                );

                // Lấy token mới từ response
                const {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken,
                } = refreshResponse.data;

                if (newAccessToken && newRefreshToken) {
                    // Cập nhật token trong store
                    authStore.setToken({
                        accessToken: newAccessToken,
                        refreshToken: newRefreshToken,
                    });

                    // Cập nhật header Authorization
                    error.config.headers.Authorization = `Bearer ${newAccessToken}`;

                    // Gửi lại request ban đầu
                    return apiClient.request(error.config);
                } else {
                    console.error(
                        "Invalid response from refresh token API. Logging out...",
                    );
                    authStore.resetAuth();
                }
            } catch (refreshError) {
                console.error("Failed to refresh token:", refreshError);
                const authStore = useAuthStore.getState();
                authStore.resetAuth();
            }
        }

        return Promise.reject(error);
    },
);
export default apiClient;
