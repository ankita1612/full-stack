import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { AuthProvider } from "./context/AuthContext";
//import axios from "axios";

//https://www.youtube.com/watch?v=Tr8eGUsVzng
// axios.defaults.baseURL = "http://localhost:5000";
// axios.interceptors.request.use(
//   (request) => {
//     const stored = localStorage.getItem("auth_data");

//     if (stored) {
//       try {
//         const parsed = JSON.parse(stored);
//         const token = parsed?.token;

//         if (token) {
//           request.headers = request.headers || {};
//           request.headers.Authorization = `Bearer ${token}`;
//         }
//       } catch (err) {
//         console.error("Invalid auth_data in localStorage");
//         localStorage.removeItem("auth_data");
//       }
//     }

//     return request;
//   },
//   (error) => Promise.reject(error),
// );

// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("auth_data");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   },
// );
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>,
);
