import axios from "axios";

const serverUrl = import.meta.env.VITE_SERVER_URL

// Set config defaults when creating the instance
const axiosInstance = axios.create({
    baseURL: serverUrl,
    timeout: 1000
});

export default axiosInstance;