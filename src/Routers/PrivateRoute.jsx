import { useContext } from "react";
import { AUthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import LoadingState from "../components/Loading/LoadingState";



const PrivateRoute = ({children}) => {
    const location=useLocation()
    const {user,loading}=useContext(AUthContext)
    if(loading){
        return <LoadingState label="Checking account" variant="page" />
    }
    if(user){
        return children
    }

    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRoute;
