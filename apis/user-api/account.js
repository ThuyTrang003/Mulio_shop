import axios from "@/apis/api-constant";

export const getInfo = async () => {
    const url = `api/users/customer-info`;
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.error("Get profile failed:", error);
        throw error;
    }
};

export const updateInfo = async (userData) => {
    // No type annotation here
    const url = `api/users/update-info`;
    try {
        const response = await axios.put(url, userData); // Pass userData in the PUT request
        return response.data.data;
    } catch (error) {
        console.error("Update profile failed:", error);
        throw error;
    }
};
