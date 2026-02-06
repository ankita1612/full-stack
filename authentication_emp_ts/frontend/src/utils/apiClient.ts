import axios from "axios";
const BACKEND_URL="http://localhost:5000"

const apiClient = axios.create({
  baseURL: BACKEND_URL,
  withCredentials: true,  
});

apiClient.interceptors.request.use((request) => {
  const stored = localStorage.getItem("auth_data");

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const accessToken = parsed?.accessToken;
           
      if (accessToken) {
        request.headers = request.headers || {};
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
    } catch {
      localStorage.removeItem("auth_data");
    }
  }
  return request;
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;    
    if (error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes("/auth/login") && !originalRequest.url?.includes("/auth/refresh")) {
      originalRequest._retry = true;

      try {        
        const { data } = await axios.post(
          BACKEND_URL+"/api/auth/refresh",
          {},
          { withCredentials: true }
        );
        const stored = JSON.parse(localStorage.getItem("auth_data") || "{}");        
        stored.accessToken = data.accessToken;        

        const user_data = {
        accessToken: data.accessToken,
        user: {
          username: stored.user.username ||  null,
          id: stored.user._id,
        },
      };
      localStorage.setItem("auth_data", JSON.stringify(user_data));

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (error: any){        
         localStorage.removeItem("auth_data");       
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;