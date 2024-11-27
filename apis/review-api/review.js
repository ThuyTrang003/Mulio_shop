import axiosNoAuth from "@/apis/api-no-auth";

export const getReviewsByBase = async (skuBase) => {
    const url = `/api/products/by-sku/${skuBase}/reviews`;
    try {
        const response = await axiosNoAuth.get(url);
        return response.data.data;
    } catch (error) {
        console.error("get product by sku base failed:", error);
        throw error.response.data;
    }
};
