
import { FaListCheck } from "react-icons/fa6";
import { IoBookmarksOutline, IoHomeOutline } from "react-icons/io5";
import { LuUsers, LuUtensils } from "react-icons/lu";
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
import useAdmin from "../hooks/useAdmin";

const DashBoard = () => {
  const [isAdmin] = useAdmin();

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <div className="w-full bg-orange-400 md:w-64">
        <ul className="menu p-4 md:min-h-screen">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/adminHome">
                  <IoHomeOutline />
                  Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addItems">
                <LuUtensils />
                  Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageItems">
                <FaListCheck />
                  Manage Items
                </NavLink>
              </li>

             
              <li>
                <NavLink to="/dashboard/manageBookings">
                <IoBookmarksOutline />
                  Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/allUsers">
                <LuUsers />
                  All Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <MdOutlinePayment />
                  Payments
                </NavLink>
              </li>
              <div className="divider"></div>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/dashboard/userHome">
                  <IoHomeOutline />
                  User Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/reservation">
                  <MdDateRange />
                  Reservation
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/paymentHistory">
                  <MdOutlinePayment />
                  Payments
                </NavLink>
              </li>

              <li>
                <NavLink to="/dashboard/cart">
                  <MdOutlineShoppingCart /> my cart
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/addReview">
                  <MdOutlineReviews /> Add Review
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/myBookings">
                  <TbBrandBooking />
                  My Bookings
                </NavLink>
              </li>
              <div className="divider"></div>
            </>
          )}

          <li>
            <NavLink to="/">
              <IoHomeOutline />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/menu">
              <RiMenuUnfold2Line />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact">
              <MdOutlineContacts />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-1 px-[10px] py-6">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoard;
