import axios from "axios";

const apiClientNoAuth = axios.create({
    baseURL: "http://localhost:8080/", // URL API của bạn
});
export default apiClientNoAuth;
