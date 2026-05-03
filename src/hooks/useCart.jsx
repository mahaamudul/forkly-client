import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AUthContext } from "../provider/AuthProvider";
import { getLocalCart } from "../utils/localCart";


const useCart = () => {
  const axiosSecure=useAxiosSecure()
  const {user}=useContext(AUthContext)

    
    const {refetch,data : cart=[], isPending}=useQuery({
        queryKey: ['cart',user?.email],
        enabled: !!user?.email,
        queryFn: async()=>{
            try {
                const res=await axiosSecure.get('/carts', {
                    params: { email: user.email }
                })
                return res.data
            } catch {
                return getLocalCart(user.email)
            }
        }
    })
    return [cart,refetch,isPending]
};

export default useCart;
