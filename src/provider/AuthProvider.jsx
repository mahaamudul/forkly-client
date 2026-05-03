import { createContext, useCallback, useEffect, useState } from "react";

import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

const DEV_ADMIN_EMAIL = "admin@gmail.com";
const DEV_ADMIN_PASSWORD = "123456";
const LOCAL_ADMIN_STORAGE_KEY = "forkly-local-admin-user";

export const AUthContext=createContext(null)
const auth = getAuth(app);

const AuthProvider = ({children}) => {

    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    const axiosPublic=useAxiosPublic()

    const provider = new GoogleAuthProvider();

    const persistLocalAdmin = (adminUser) => {
        localStorage.setItem(LOCAL_ADMIN_STORAGE_KEY, JSON.stringify(adminUser));
    };

    const clearLocalAdmin = () => {
        localStorage.removeItem(LOCAL_ADMIN_STORAGE_KEY);
    };

    const getStoredLocalAdmin = () => {
        try {
            const rawValue = localStorage.getItem(LOCAL_ADMIN_STORAGE_KEY);
            return rawValue ? JSON.parse(rawValue) : null;
        } catch {
            return null;
        }
    };

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
        if (email === DEV_ADMIN_EMAIL && password === DEV_ADMIN_PASSWORD) {
            const adminUser = {
                email: DEV_ADMIN_EMAIL,
                displayName: "Forkly Admin",
                photoURL: "",
                isLocalAdmin: true,
            };
            persistLocalAdmin(adminUser);
            setUser(adminUser);
            return Promise.resolve({ user: adminUser });
        }
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut=()=>{
        setLoading(true)
        const storedLocalAdmin = getStoredLocalAdmin();
        if (storedLocalAdmin || user?.isLocalAdmin) {
            clearLocalAdmin();
            setUser(null);
            localStorage.removeItem('access-token');
            setLoading(false);
            return Promise.resolve();
        }
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
          const storedLocalAdmin = getStoredLocalAdmin();

          if (currentUser) {
            clearLocalAdmin();
          }

          setUser(currentUser || storedLocalAdmin);
      
          if (currentUser) {
            const userInfo = {
              email: currentUser.email
            };
            try {
              await ensureAccessToken(userInfo.email);
            } catch (error) {
                console.error("Error fetching token:", error);
            }
          } else if (storedLocalAdmin?.email) {
            try {
              await ensureAccessToken(storedLocalAdmin.email);
            } catch (error) {
              console.error("Error fetching local admin token:", error);
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
