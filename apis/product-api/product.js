import axiosNoAuth from "@/apis/api-no-auth";

export const getProductByBase = async (params) => {
    const url = "/api/products/by-sku";
    params = { skuBase: params };
    try {
        const response = await axiosNoAuth.get(url, { params });
        return response.data.data;
    } catch (error) {
        console.error("get product by sku base failed:", error);
        throw error.response.data;
    }
};

export const getProductByColorSize = async (payload) => {
    const url = `/api/products/by-sku/${payload.skuBase}`;
    const params = {
        color: payload.color,
        size: payload.size,
    };
    try {
        const response = await axiosNoAuth.get(url, { params });
        return response.data.data;
    } catch (error) {
        console.error("get product by color, size failed:", error);
        throw error.response.data;
    }
};
