import axios from "axios";
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AUthContext } from "../provider/AuthProvider";
import { API_BASE_URL } from "../config/api";


const axiosSecure=axios.create({
    baseURL: API_BASE_URL
})

axiosSecure.interceptors.request.use(function(config){
    const token=localStorage.getItem('access-token')
    if(token){
        config.headers.authorization=`Bearer ${token}`
    }
    return config
},function(error){
    return Promise.reject(error)
})

const useAxiosSecure = () => {
    const navigate=useNavigate()
    const {logOut}=useContext(AUthContext)
    useEffect(()=>{
        const interceptor = axiosSecure.interceptors.response.use(function(response){
            return response
        },async (err)=>{
            const status=err.response?.status

            if(status===401|| status===403){
                await logOut()
                navigate('/login')
            }
            return Promise.reject(err)
        })

        return () => axiosSecure.interceptors.response.eject(interceptor)
    },[logOut,navigate])

    return axiosSecure
};

export default useAxiosSecure;
