import axios from "@/apis/api-no-auth";

export const signup = async (payload) => {
    payload = {
        username: payload.username,
        email: payload.email,
        password: payload.password,
        role: "CUSTOMER",
    };
    try {
        const url = "/api/auth/register";
        const response = await axios.post(url, payload);
        return response.data.data;
    } catch (error) {
        console.error("Register failed:", error);
        throw error.response.data;
    }
};

export const signin = async (payload) => {
    const url = "/api/auth/authenticate";
    try {
        const response = await axios.post(url, payload);
        return response.data.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error.response.data;
    }
};

export const isVerify = async (params) => {
    const url = "/api/auth/verify";
    try {
        const response = await axios.get(url, { params });
        return response.data.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error.response.data;
    }
};
