import { Navigate } from "react-router-dom";
import useAdmin from "../../../hooks/useAdmin";

const DashboardHome = () => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return <progress className="progress w-56"></progress>;
  }

  return (
    <Navigate
      to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
      replace
    />
  );
};

export default DashboardHome;
