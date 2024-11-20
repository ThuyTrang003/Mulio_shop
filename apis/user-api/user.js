import axios from "@/apis/api-constant";

export const getUserDetail = async () => {
    const url = "/api/users";
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Get user detail failed:", error);
        throw error;
    }
};
