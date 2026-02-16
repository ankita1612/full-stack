import axios from "axios";
const BACKEND_URL = "http://localhost:5000";

const apiClient = axios.create({
  baseURL: BACKEND_URL,

});

apiClient.interceptors.request.use(
  (request) => {
    const stored = localStorage.getItem("user_data");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const token = parsed?.accessToken;
        if (token) {
          request.headers = request.headers || {};
          request.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.error("Invalid auth_data in localStorage");
        localStorage.removeItem("user_data");
      }
    }

    return request;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_data");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default apiClient;