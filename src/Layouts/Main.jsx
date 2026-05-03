import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";



const Main = () => {

    const location = useLocation()
    const headerNavHide=location.pathname.includes('login') || location.pathname.includes('signUp')

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "auto" });
    }, [location.pathname]);

    return (
        <div >
            {headerNavHide || <Navbar></Navbar>}
            <main className={headerNavHide ? "" : "pt-[84px] md:pt-[88px]"}>
                <Outlet></Outlet>
            </main>
            {headerNavHide || <Footer></Footer>}
        </div>
    );
};

export default Main;
