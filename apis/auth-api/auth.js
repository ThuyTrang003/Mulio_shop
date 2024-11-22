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
        console.log("response", response)
        return response.data.data
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

export const isVerify = async (payload) => {
    const url = "http://localhost:8080/api/auth/verify";
    try {
        const response = await axios.get(url, payload);
        return response.data.data
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};

export const loadUser = async (token) => {
    const url = "http://localhost:8080/api/users";
    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Load user failed:", error);
        throw error;
    }
};


