import axios from "axios";

export const signup = async (payload) => {
    payload = {
        username: payload.username, email: payload.email, password: payload.password, role: "CUSTOMER"
    };
    try {
    const url = "http://localhost:8080/api/auth/register";
        const response = await axios.post(
            url,
            payload,
        );
        return response.data;
    } catch (error) {
        console.error("Register failed:", error);
        throw error;
    }
};

export const signin = async (payload) => {
    const url = "http://localhost:8080/api/auth/authenticate";
    try {
        const response = await axios.post(url, payload);
        return response.data.data
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

