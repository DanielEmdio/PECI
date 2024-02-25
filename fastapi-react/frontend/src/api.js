import axios from "axios";

const API_URL = process.env.REACT_APP_DOCKER_CONTAINER ? `${window.location.origin}/api` : "http://localhost:8000";
const api = axios.create({
    baseURL: API_URL
});

export default api;
