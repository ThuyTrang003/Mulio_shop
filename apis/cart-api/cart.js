import axios from "@/apis/api-constant";

export const getCart = async () => {
    const url = `/api/users/cart`;
    try {
        const response = await axios.get(url);
        return response.data.data.data;
    } catch (error) {
        console.error("Get cart failed:", error);
        throw error;
    }
};
