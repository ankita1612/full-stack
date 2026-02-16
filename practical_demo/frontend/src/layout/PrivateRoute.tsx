import { Navigate, Outlet } from "react-router-dom";
type Props = {
  children?: React.ReactNode;
};

const PrivateRoute = ({ children }: Props) => {
  const auth_data: string | null = localStorage.getItem("auth_data");
  const new_auth_data = auth_data ? JSON.parse(auth_data) : null;
  if (!(auth_data && new_auth_data?.accessToken)) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ msg: "Please login first", type: "danger" }}
      />
    );
  }
  return children ? <>{children}</> : <Outlet />;
};

export default PrivateRoute;
