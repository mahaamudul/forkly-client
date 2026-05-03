import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { MdOutlinePayment, MdOutlineShoppingCart } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import LoadingState from "../../../components/Loading/LoadingState";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { AUthContext } from "../../../provider/AuthProvider";
import profileFallback from "../../../assets/others/profile.png";

const UserHome = () => {
  const { user } = useContext(AUthContext);
  const axiosSecure = useAxiosSecure();
  const [cart, , cartLoading] = useCart();

  const { data: bookings = [], isPending: bookingsLoading } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  const { data: payments = [], isPending: paymentsLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${user.email}`);
      return res.data;
    },
  });

  const summary = [
    {
      label: "Cart Items",
      value: cart.length,
      icon: <MdOutlineShoppingCart />,
      to: "/dashboard/cart",
    },
    {
      label: "Bookings",
      value: bookings.length,
      icon: <TbBrandBooking />,
      to: "/dashboard/myBookings",
    },
    {
      label: "Payments",
      value: payments.length,
      icon: <MdOutlinePayment />,
      to: "/dashboard/paymentHistory",
    },
  ];

  const isLoading = cartLoading || bookingsLoading || paymentsLoading;

  return (
    <div>
      <SectionTitle heading="User Home" subHeading="Your Forkly space" />
      {isLoading ? (
        <LoadingState label="Loading your dashboard" />
      ) : (
      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <div className="rounded-lg bg-orange-100 p-6 text-center">
          <img
            className="mx-auto h-28 w-28 rounded-full object-cover ring-4 ring-white"
            src={user?.photoURL || profileFallback}
            alt={user?.displayName || "User"}
          />
          <h2 className="mt-4 text-2xl font-bold">
            {user?.displayName || "Forkly Guest"}
          </h2>
          <p className="break-all text-slate-600">{user?.email}</p>
          <Link to="/order/salad" className="btn mt-6 bg-orange-400 text-black">
            Order More
          </Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {summary.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="rounded-lg bg-base-200 p-6 transition hover:bg-orange-100"
            >
              <div className="mb-4 text-4xl text-orange-500">{item.icon}</div>
              <p className="text-4xl font-bold">{item.value}</p>
              <p className="text-slate-600">{item.label}</p>
            </Link>
          ))}
        </div>
      </div>
      )}
    </div>
  );
};

export default UserHome;
