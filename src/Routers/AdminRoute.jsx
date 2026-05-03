import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";

import { useContext } from "react";
import { AUthContext } from "../provider/AuthProvider";
import LoadingState from "../components/Loading/LoadingState";


const AdminRoute = ({children}) => {
    const {user, loading} = useContext(AUthContext)
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();

    if(loading || isAdminLoading){
        return <LoadingState label="Checking admin access" variant="page" />
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/" state={{from: location}} replace></Navigate>
};

export default AdminRoute;
