import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const isAdmin = useSelector((state) => state.isLogged.isAdmin);
  const isSigned = useSelector((state) => state.isLogged.LoggedIn);

  return isAdmin ? <Outlet /> : <Navigate to="userLogin" />;
};

export default PrivateRoutes;
