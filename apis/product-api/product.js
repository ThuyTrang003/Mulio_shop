import axiosNoAuth from "@/apis/api-no-auth";

export const getProductByBase = async (params) => {
    const url = "/api/products/by-sku";
    try {
        const response = await axiosNoAuth.get(url, { skuBase: params });
        return response.data.data;
    } catch (error) {
        console.error("get product by sku base failed:", error);
        throw error.response.data;
    }
};
