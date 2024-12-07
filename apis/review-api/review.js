import axios from "@/apis/api-constant";
import axiosNoAuth from "@/apis/api-no-auth";

export const getReviewsByBase = async (skuBase) => {
    const url = `/api/products/by-sku/${skuBase}/reviews`;
    try {
        const response = await axiosNoAuth.get(url);
        return response.data.data;
    } catch (error) {
        console.error("get reviews by sku base failed:", error);
        throw error.response.data;
    }
};

// export const postReviews = async (payload) => {
//     payload = {
//         rating: payload.rating,
//         comment: payload.comment,
//         images: payload.images,
//     };
//     try {
//         const url =
//             "http://localhost:8080/api/products/reviews/${payload.productId}";
//         const response = await axios.post(url, payload);
//         return response.data.data;
//     } catch (error) {
//         console.error("Evaluate product failed:", error);
//         throw error.response.data;
//     }
// };
export const postReviews = async (payload) => {
    const { rating, comment, images, productId } = payload;
    try {
        const url = `http://localhost:8080/api/products/reviews/${productId}`;
        const response = await axios.post(url, { rating, comment, images });
        return response.data.data;
    } catch (error) {
        console.error("Evaluate product failed:", error);
        throw error.response.data;
    }
};
