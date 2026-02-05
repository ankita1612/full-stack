import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
});

apiClient.interceptors.request.use((request) => {
  const stored = localStorage.getItem("auth_data");

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const token = parsed?.token;

      if (token) {
        request.headers = request.headers || {};
        request.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
      localStorage.removeItem("auth_data");
    }
  }
  return request;
});

apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth_data");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;