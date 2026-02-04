import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const auth_data: string | null = localStorage.getItem("auth_data");
  let new_auth_data = auth_data ? JSON.parse(auth_data) : null;
  return auth_data && new_auth_data?.token ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ msg: "Please login first", type: "danger" }}
    />
  );
};

export default PrivateRoute;
