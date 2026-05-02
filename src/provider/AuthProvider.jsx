import { createContext, useCallback, useEffect, useState } from "react";

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";



export const AUthContext=createContext(null)
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const axiosPublic=useAxiosPublic()

    const provider = new GoogleAuthProvider();

    const ensureAccessToken = useCallback(async (email) => {
        if (!email) {
            localStorage.removeItem('access-token');
            return null;
        }

        const res = await axiosPublic.post('/jwt', { email });
        const token = res.data.token;

        if (token) {
            localStorage.setItem('access-token', token);
        }

        return token;
    }, [axiosPublic]);

    const createUser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }

    const googleSignIn=()=>{
        setLoading(true)

        return signInWithPopup(auth,provider)
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

    const userUpdateProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    }
    

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, async currentUser => {
          setLoading(true);
          setUser(currentUser);
      
          if (currentUser) {
            const userInfo = {
              email: currentUser.email
            };
            try {
              await ensureAccessToken(userInfo.email);
            } catch (error) {
                console.error("Error fetching token:", error);
            }
          } else {
            localStorage.removeItem('access-token');
          }
      
          setLoading(false);
        });
        return () => {
          return unSubscribe();
        }
      }, [ensureAccessToken]);
      

    const authInfo={
        user,
        loading,
        createUser,
        signIn,
        logOut,
        userUpdateProfile,
        googleSignIn,
        ensureAccessToken

    }
    return (
        <AUthContext.Provider value={authInfo}>
            {children}
            
        </AUthContext.Provider>
    );
};

export default AuthProvider;
