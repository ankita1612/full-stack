import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,   // ⭐ REQUIRED
});

apiClient.interceptors.request.use((request) => {
  const stored = localStorage.getItem("auth_data");

  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      const accessToken = parsed?.accessToken;
      console.log("~~~~~~~~~~~~~~>>>"+accessToken)

      console.log(`Bearer ${accessToken}`)
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
    console.log("=======>"+error.response?.status)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        console.log(1)
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/refresh",
          {},
          { withCredentials: true }
        );
console.log(2)
        const stored = JSON.parse(localStorage.getItem("auth_data") || "{}");
        console.log("old==>"+stored.accessToken)
        stored.accessToken = data.accessToken;
        console.log("new==>"+data.accessToken)

        const user_data = {
        accessToken: data.accessToken,
        user: {
          username: stored.user.username,
          id: stored.user._id,
        },
      };
        localStorage.setItem("auth_data", JSON.stringify(user_data));

        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
        return apiClient(originalRequest);
      } catch (error: any){
        console.log(error)
        // localStorage.removeItem("auth_data");
        // alert("hee")
       // window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;