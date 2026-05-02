import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";



const Main = () => {

    const location = useLocation()
    const headerNavHide=location.pathname.includes('login') || location.pathname.includes('signUp')
    return (
        <div >
            {headerNavHide || <Navbar></Navbar>}
            <main className="px-[10px]">
                <Outlet></Outlet>
            </main>
            {headerNavHide || <Footer></Footer>}
        </div>
    );
};

export default Main;
