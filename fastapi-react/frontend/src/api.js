import axios from "axios";

const API_URL = process.env.NODE_ENV === "production" ? `${window.location.origin}/api` : "http://localhost:8000";
const api = axios.create({
    baseURL: API_URL
});

export default api;
