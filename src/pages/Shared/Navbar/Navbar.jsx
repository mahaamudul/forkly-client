import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AUthContext } from "../../../provider/AuthProvider";
import { MdLogout, MdOutlineDashboard, MdOutlineShoppingCart } from "react-icons/md";
import useCart from "../../../hooks/useCart";
import { FaBars, FaUserCircle } from "react-icons/fa";
import logo from "../../../assets/logo.png";


const Navbar = () => {
  const { logOut, user } = useContext(AUthContext);
  const [cart]=useCart()

  const handleLOgOut = () => {
    logOut();
  };

  const linkClass = ({ isActive }) =>
    isActive ? "text-orange-300 font-semibold" : "hover:text-orange-200";

  const navLinks = (
    <>
      <li>
        <NavLink className={linkClass} to="/">Home</NavLink>
      </li>
      <li>
        <NavLink className={linkClass} to="/menu">Menu</NavLink>
      </li>
      <li>
        <NavLink className={linkClass} to="/order/salad">Order Food</NavLink>
      </li>
      <li>
        <NavLink className={linkClass} to="/contact">Contact</NavLink>
      </li>

      {user ? (
        <>
          <li>
            <Link
              to='/dashboard/cart'
              className="btn btn-sm border border-orange-300 bg-orange-50 text-neutral hover:border-orange-400 hover:bg-orange-100"
            >
              <MdOutlineShoppingCart />
              <div className="badge border-0 bg-orange-400 text-neutral">{cart.length}</div>
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink className={linkClass} to="/login">Login</NavLink>
          </li>
        </>
      )}
    </>
  );
  return (
    <div className="mx-auto">
      <div className="navbar bg-neutral/90 fixed z-20 text-white shadow-lg backdrop-blur">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <FaBars />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 items-center shadow bg-neutral rounded-box w-56"
            >
              {navLinks}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-left">
            <img className="h-9 w-9 rounded-full object-cover" src={logo} alt="Bistro Boss" />
            <span className="font-cinzel text-xl font-bold leading-none">
              Bistro Boss
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <button
                tabIndex={0}
                className="btn btn-ghost flex h-11 min-h-0 w-11 items-center justify-center rounded-full border border-orange-300 bg-orange-50 p-0 text-orange-400 hover:bg-orange-100"
                aria-label="Open account menu"
              >
                {user.photoURL ? (
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                  />
                ) : (
                  <FaUserCircle className="text-2xl" />
                )}
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content z-[1] mt-3 w-56 rounded-lg border border-orange-200 bg-white p-2 text-neutral shadow-lg"
              >
                <li className="pointer-events-none px-3 py-2">
                  <p className="font-semibold text-neutral">{user.displayName || "Bistro Boss Guest"}</p>
                  <p className="max-w-full truncate text-xs text-slate-500">{user.email}</p>
                </li>
                <li>
                  <Link to="/dashboard" className="flex items-center gap-2 rounded-md">
                    <MdOutlineDashboard className="text-orange-500" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button onClick={handleLOgOut} className="flex items-center gap-2 rounded-md">
                    <MdLogout className="text-orange-500" />
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/order/salad" className="btn btn-sm bg-orange-300 text-black hover:bg-orange-400">
              Reserve a bite
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
