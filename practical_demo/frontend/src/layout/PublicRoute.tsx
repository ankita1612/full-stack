import { Navigate, Outlet } from "react-router-dom";
type Props = {
  children?: React.ReactNode;
};
const PublicRoute = ({ children }: Props) => {
  const auth_data: string | null = localStorage.getItem("auth_data");
  console.log(auth_data);
  if (auth_data) {
    return <Navigate to="/" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default PublicRoute;
