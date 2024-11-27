import axios from "@/apis/api-constant";

export const getCart = async () => {
    const url = `/api/users/cart`;
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.error("Get cart failed:", error.response);
        throw error.response;
    }
};

export const addProductToCart = async (payload) => {
    const url = `/api/cart/${payload.cartId}/products/${payload.productId}`;
    try {
        const response = await axios.post(url, { amount: payload.amount });
        return response.data.data;
    } catch (error) {
        console.error("Add product to cart failed:", error);
        throw error.response.data;
    }
};

export const updateProductToCart = async (payload) => {
    const url = `/api/cart/${payload.cartId}/products/${payload.productId}`;
    try {
        const response = await axios.put(url, { amount: payload.amount });
        return response.data.data;
    } catch (error) {
        console.error("Update product to cart failed:", error);
        throw error.response.data;
    }
};

export const deleteProductToCart = async (payload) => {
    const url = `/api/cart/${payload.cartId}/products/${payload.productId}`;
    try {
        const response = await axios.delete(url);
        return response.data.data;
    } catch (error) {
        console.error("Remove product to cart failed:", error);
        throw error.response.data;
    }
};
