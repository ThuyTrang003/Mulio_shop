import axios from "@/apis/api-constant";

export const getWishList = async (userId) => {
    const url = `/api/products/wishlist/${userId}`;
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.error("Get wish list failed:", error.response);
        throw error.response;
    }
};
