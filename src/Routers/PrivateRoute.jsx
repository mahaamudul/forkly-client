import { useContext } from "react";
import { AUthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";



const PrivateRoute = ({children}) => {
    const location=useLocation()
    const {user,loading}=useContext(AUthContext)
    if(loading){
        return  <span className="loading loading-spinner"></span>
    }
    if(user){
        return children
    }

    return <Navigate to='/login' state={{from:location}} replace></Navigate>
};

export default PrivateRoute;