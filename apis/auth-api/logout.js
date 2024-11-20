import axios from "@/apis/api-constant";

export const logout = async () => {
    const url = "/api/auth/logout";
    try {
        const response = await axios.post(url);
        return response.data;
    } catch (error) {
        console.error("Logout failed:", error);
        throw error;
    }
};
