
import { FaListCheck } from "react-icons/fa6";
import { IoBookmarksOutline, IoHomeOutline } from "react-icons/io5";
import { LuSettings, LuUsers, LuUtensils } from "react-icons/lu";
import {
  MdDateRange,
  MdOutlineContacts,
  MdOutlinePayment,
  MdOutlineReviews,
  MdOutlineShoppingCart,
} from "react-icons/md";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { TbBrandBooking } from "react-icons/tb";
import { NavLink, Outlet } from "react-router-dom";
import LoadingState from "../components/Loading/LoadingState";
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
  const [isAdmin, isAdminLoading] = useAdmin();
  const dashboardLinkClass = ({ isActive }) =>
    `rounded-md px-3 py-3 transition ${
      isActive
        ? "bg-neutral text-white"
        : "text-neutral hover:bg-orange-300/80"
    }`;

  if (isAdminLoading) {
    return <LoadingState label="Preparing dashboard" variant="page" />;
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="w-full bg-orange-400 md:w-64">
        <ul className="menu space-y-2 p-4 md:min-h-screen">
          {isAdmin ? (
            <>
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/adminHome">
                  <IoHomeOutline />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/addItems">
                <LuUtensils />
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/manageItems">
                <FaListCheck />
                  Manage Items
                </NavLink>
              </li>

             
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/manageBookings">
                <IoBookmarksOutline />
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/allUsers">
                <LuUsers />
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/adminPayments">
                  <MdOutlinePayment />
                  Payments
                </NavLink>
              </li>
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/manageReviews">
                  <MdOutlineReviews />
                  Reviews
                </NavLink>
              </li>
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/settings">
                  <LuSettings />
                  Settings
                </NavLink>
              </li>
              <div className="divider"></div>
            </>
          ) : (
            <>
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/userHome">
                  <IoHomeOutline />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/reservation">
                  <MdDateRange />
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/paymentHistory">
                  <MdOutlinePayment />
                  Payments
                </NavLink>
              </li>

              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/cart">
                  <MdOutlineShoppingCart /> my cart
                </NavLink>
              </li>
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/addReview">
                  <MdOutlineReviews /> Add Review
                </NavLink>
              </li>
              <li>
                <NavLink className={dashboardLinkClass} to="/dashboard/myBookings">
                  <TbBrandBooking />
                  My Bookings
                </NavLink>
              </li>
              <div className="divider"></div>
            </>
          )}

          <li>
            <NavLink end className={dashboardLinkClass} to="/">
              <IoHomeOutline />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className={dashboardLinkClass} to="/menu">
              <RiMenuUnfold2Line />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink className={dashboardLinkClass} to="/contact">
              <MdOutlineContacts />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 content-shell py-6 md:py-8">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
