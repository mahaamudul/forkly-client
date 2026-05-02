import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AUthContext } from "../../provider/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "../../utils/alertTheme";


const SocialLogin = () => {
    const {googleSignIn, ensureAccessToken}=useContext(AUthContext)

    const axiosPublic=useAxiosPublic()
    const navigate=useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const handleGoogleSignIn=()=>{
        googleSignIn()
        .then(res=>{
            const userInfo={
                email:res.user?.email,
                name:res.user.displayName 

            }
            axiosPublic.post('/users',userInfo)
            .then(async ()=>{
                await ensureAccessToken(res.user?.email);
                navigate(from, { replace: true })
            })
        })
        .catch((error) => {
            Swal.fire({
                title: "Google sign in failed",
                text: error.message,
                icon: "error",
            });
        });
    }
    return (
        <div>
            <button
                onClick={handleGoogleSignIn}
                className="btn h-12 w-full rounded-md border-[#d9c8b4] bg-white text-neutral hover:border-orange-300 hover:bg-orange-50"
            >
                <span><FaGoogle></FaGoogle></span> Continue with Google
            </button>
        </div>
    );
};

export default SocialLogin;
