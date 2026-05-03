import { Navigate } from "react-router-dom";
import LoadingState from "../../../components/Loading/LoadingState";
import useAdmin from "../../../hooks/useAdmin";

const DashboardHome = () => {
  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
    return <LoadingState label="Opening dashboard" variant="page" />;
  }

  return (
    <Navigate
      to={isAdmin ? "/dashboard/adminHome" : "/dashboard/userHome"}
      replace
    />
  );
};

export default DashboardHome;
