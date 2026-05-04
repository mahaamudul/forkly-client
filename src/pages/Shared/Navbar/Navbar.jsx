import { useContext, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  MdLogout,
  MdOutlineDashboard,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";
import { AUthContext } from "../../../provider/AuthProvider";
import useCart from "../../../hooks/useCart";
import logo from "../../../assets/logo.png";

const Navbar = () => {
  const { logOut, user } = useContext(AUthContext);
  const [cart, , cartLoading] = useCart();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const navItems = useMemo(
    () => [
      { label: "Home", to: "/", match: (pathname) => pathname === "/" },
      { label: "Menu", to: "/menu", match: (pathname) => pathname === "/menu" },
      {
        label: "Order Food",
        to: "/order/salad",
        match: (pathname) => pathname.startsWith("/order"),
      },
      {
        label: "Contact",
        to: "/contact",
        match: (pathname) => pathname === "/contact",
      },
      ...(!user
        ? [
            {
              label: "Login",
              to: "/login",
              match: (pathname) =>
                pathname === "/login" || pathname === "/signUp",
            },
          ]
        : []),
    ],
    [user],
  );

  const isActive = (item) => item.match(location.pathname);

  const linkClasses = (active) =>
    `px-3 py-2 text-sm font-medium transition ${
      active ? "text-orange-300" : "text-white hover:text-orange-200"
    }`;

  const handleLogout = async () => {
    setAccountOpen(false);
    setMobileOpen(false);
    await logOut();
  };

  const handleNavClick = () => {
    setMobileOpen(false);
    setAccountOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-[100] bg-neutral/90 text-white shadow-lg backdrop-blur">
      <div className="content-shell">
        <div className="flex min-h-[84px] items-center justify-between gap-4 md:min-h-[88px]">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setMobileOpen((current) => !current)}
              className="btn btn-ghost h-11 min-h-0 w-11 rounded-md p-0 lg:hidden"
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <FaTimes /> : <FaBars />}
            </button>

            <Link
              to="/"
              onClick={handleNavClick}
              className="flex items-end gap-3 rounded-md"
            >
              <img
                className="h-9 w-9 rounded-full object-cover"
                src={logo}
                alt="Forkly"
              />
              <span className="hidden h-9 sm:flex items-end">
                <span className="font-cinzel text-lg font-bold leading-none md:text-xl">
                  Forkly
                </span>
              </span>
            </Link>
          </div>

          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className={linkClasses(isActive(item))}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <Link
                  to="/dashboard/cart"
                  onClick={handleNavClick}
                  className="btn btn-sm border border-orange-300 bg-orange-50 text-neutral hover:border-orange-400 hover:bg-orange-100"
                >
                  <MdOutlineShoppingCart />
                  <div className="badge border-0 bg-orange-400 text-neutral">
                    {cartLoading ? "..." : cart.length}
                  </div>
                </Link>

                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setAccountOpen((current) => !current)}
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

                  {accountOpen ? (
                    <div className="absolute right-0 top-[calc(100%+12px)] w-56 rounded-lg border border-orange-200 bg-white p-2 text-neutral shadow-lg">
                      <div className="border-b border-orange-100 px-3 py-2">
                        <p className="font-semibold text-neutral">
                          {user.displayName || "Forkly Guest"}
                        </p>
                        <p className="truncate text-xs text-slate-500">
                          {user.email}
                        </p>
                      </div>
                      <div className="mt-2 space-y-1">
                        <Link
                          to="/dashboard"
                          onClick={handleNavClick}
                          className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-orange-50"
                        >
                          <MdOutlineDashboard className="text-orange-500" />
                          Dashboard
                        </Link>
                        <button
                          type="button"
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm hover:bg-orange-50"
                        >
                          <MdLogout className="text-orange-500" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>
              </>
            ) : (
              <Link
                to="/order/salad"
                onClick={handleNavClick}
                className="btn btn-sm bg-orange-300 text-black hover:bg-orange-400"
              >
                Reserve a bite
              </Link>
            )}
          </div>
        </div>

        {mobileOpen ? (
          <div className="border-t border-white/10 py-3 lg:hidden">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={handleNavClick}
                  className={linkClasses(isActive(item))}
                >
                  {item.label}
                </Link>
              ))}
              {user ? (
                <Link
                  to="/dashboard"
                  onClick={handleNavClick}
                  className="rounded-md px-3 py-2 text-sm font-medium text-white transition hover:bg-white/5 hover:text-orange-200"
                >
                  Dashboard
                </Link>
              ) : null}
            </nav>
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
