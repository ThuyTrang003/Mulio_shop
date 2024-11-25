import axios from "@/apis/api-constant";

export const postPassword = async (payload) => {
    payload = {
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
    };
    try {
        const url = "http://localhost:8080/api/users/change-password";
        const response = await axios.post(url, payload);
        return response.data;
    } catch (error) {
        console.error("Chance password failed:", error);
        throw error;
    }
};
