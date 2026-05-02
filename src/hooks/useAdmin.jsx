import { useContext } from "react";
import { AUthContext } from "../provider/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";



const useAdmin = () => {
    const {user}=useContext(AUthContext)

    const axiosSecure=useAxiosSecure()

    const{data: isAdmin = false,isPending: isAdminLoading}=useQuery({
        queryKey:[user?.email,'isAdmin'],
        enabled: !!user?.email,
        queryFn: async ()=>{
            const res=await axiosSecure.get(`/users/admin/${user?.email}`)
            return res.data?.admin
        }
    
    })
    return [isAdmin,isAdminLoading]
    
};

export default useAdmin;
