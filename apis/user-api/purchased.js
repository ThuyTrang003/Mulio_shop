import axios from "@/apis/api-constant";

export const getCartHistory = async () => {
    const url = `api/users/orders`;
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.error("Get Purchase history failed:", error);
        throw error;
    }
};
