import axios from "@/apis/api-constant";

export const getWishList = async () => {
    const url = "/api/users/wishlist";
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.error("Get wish list failed:", error.response);
        throw error.response;
    }
};

export const addProductToWishList = async (skuBase) => {
    const url = "/api/users/wishlist";
    const params = { skuBase: skuBase };

    try {
        const response = await axios.post(url, {}, { params });
        return response.data.data;
    } catch (error) {
        console.error("Add product to wish list failed:", error.response);
        throw error.response;
    }
};

export const deleteProductToWishList = async (skuBase) => {
    const url = "/api/users/wishlist";
    const params = { skuBase: skuBase };
    try {
        const response = await axios.delete(url, { params });
        return response.data.data;
    } catch (error) {
        console.error("Delete product to wish list failed:", error.response);
        throw error.response;
    }
};
