import axios from "@/apis/api-constant";

export const getInfo = async () => {
    const url = `http://localhost:8080/api/users/customer-info`;
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.error("Get cart failed:", error);
        throw error;
    }
};

export const updateInfo = async () => {
    const url = `http://localhost:8080/api/users/customer-info`;
    try {
        const response = await axios.put(url);
        return response.data.data;
    } catch (error) {
        console.error("Update cart failed:", error);
        throw error;
    }
};
