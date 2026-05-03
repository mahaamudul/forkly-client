import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { MdOutlineRestaurantMenu, MdTableBar } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import LoadingState from "../../../components/Loading/LoadingState";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {}, isPending: statsLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
      return res.data;
    },
  });

  const { data: bookingsSummary = {}, isPending: summaryLoading } = useQuery({
    queryKey: ["admin-bookings-summary"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/bookings-summary");
      return res.data;
    },
  });

  const { data: activity = {}, isPending: activityLoading } = useQuery({
    queryKey: ["admin-recent-activity"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/recent-activity");
      return res.data;
    },
  });

  const cards = [
    {
      label: "Revenue",
      value: `$${Number(stats.revenue || 0).toFixed(2)}`,
      icon: <FaDollarSign />,
    },
    {
      label: "Users",
      value: stats.users || 0,
      icon: <FaUsers />,
    },
    {
      label: "Menu Items",
      value: stats.menuItems || 0,
      icon: <MdOutlineRestaurantMenu />,
    },
    {
      label: "Orders",
      value: stats.orders || 0,
      icon: <MdTableBar />,
    },
    {
      label: "Bookings",
      value: stats.bookings || 0,
      icon: <TbBrandBooking />,
    },
  ];

  const focusItems = [
    {
      label: "Today",
      value: bookingsSummary.todayBookings || 0,
    },
    {
      label: "Pending",
      value: bookingsSummary.pendingBookings || 0,
    },
    {
      label: "Confirmed",
      value: bookingsSummary.confirmedBookings || 0,
    },
  ];

  const recentBookings = activity.recentBookings || [];
  const recentPayments = activity.recentPayments || [];
  const isLoading = statsLoading || summaryLoading || activityLoading;

  return (
    <div className="space-y-8">
      <SectionTitle heading="Admin Home" subHeading="Business at a glance" />

      {isLoading ? (
        <LoadingState label="Loading admin dashboard" />
      ) : (
        <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {cards.map((card) => (
          <div
            key={card.label}
            className="rounded-lg border border-orange-200 bg-base-100 p-5 text-neutral shadow-sm"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-md bg-orange-400 text-2xl text-neutral">
              {card.icon}
            </div>
            <p className="text-3xl font-bold">{card.value}</p>
            <p className="uppercase text-slate-600">{card.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-lg border border-orange-200 bg-base-100 p-5 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-neutral">
                Reservation workload
              </h2>
              <p className="text-sm text-slate-500">
                See what needs attention before service gets busy.
              </p>
            </div>
            <Link
              to="/dashboard/manageBookings"
              className="btn border-0 bg-orange-400 text-neutral hover:bg-orange-500"
            >
              Open bookings
            </Link>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {focusItems.map((item) => (
              <div key={item.label} className="rounded-lg bg-base-200 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  {item.label}
                </p>
                <p className="mt-3 text-3xl font-bold text-neutral">
                  {item.value}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 space-y-3">
            {recentBookings.length ? (
              recentBookings.map((booking) => (
                <div
                  key={booking._id}
                  className="flex flex-col gap-2 rounded-lg border border-orange-100 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-semibold text-neutral">{booking.name}</p>
                    <p className="text-sm text-slate-500">
                      {booking.date} at {booking.time} for {booking.guests} guests
                    </p>
                  </div>
                  <span className="w-fit rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase text-neutral">
                    {booking.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="rounded-lg bg-base-200 p-4 text-slate-500">
                No recent bookings yet.
              </p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-orange-200 bg-base-100 p-5 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral">Quick actions</h2>
            <p className="mt-1 text-sm text-slate-500">
              Move between the most common admin tasks.
            </p>
            <div className="mt-5 grid gap-3">
              <Link
                to="/dashboard/addItems"
                className="rounded-lg bg-base-200 px-4 py-3 font-medium text-neutral transition hover:bg-orange-100"
              >
                Add a new menu item
              </Link>
              <Link
                to="/dashboard/manageItems"
                className="rounded-lg bg-base-200 px-4 py-3 font-medium text-neutral transition hover:bg-orange-100"
              >
                Review menu inventory
              </Link>
              <Link
                to="/dashboard/adminPayments"
                className="rounded-lg bg-base-200 px-4 py-3 font-medium text-neutral transition hover:bg-orange-100"
              >
                Open payment console
              </Link>
              <Link
                to="/dashboard/allUsers"
                className="rounded-lg bg-base-200 px-4 py-3 font-medium text-neutral transition hover:bg-orange-100"
              >
                Manage users
              </Link>
              <Link
                to="/dashboard/manageReviews"
                className="rounded-lg bg-base-200 px-4 py-3 font-medium text-neutral transition hover:bg-orange-100"
              >
                Moderate reviews
              </Link>
              <Link
                to="/dashboard/settings"
                className="rounded-lg bg-base-200 px-4 py-3 font-medium text-neutral transition hover:bg-orange-100"
              >
                Restaurant settings
              </Link>
            </div>
          </div>

          <div className="rounded-lg border border-orange-200 bg-base-100 p-5 shadow-sm">
            <h2 className="text-2xl font-semibold text-neutral">Recent payments</h2>
            <div className="mt-5 space-y-3">
              {recentPayments.length ? (
                recentPayments.map((payment) => (
                  <div
                    key={payment._id}
                    className="rounded-lg border border-orange-100 p-4"
                  >
                    <p className="font-semibold text-neutral">
                      ${Number(payment.price || 0).toFixed(2)}
                    </p>
                    <p className="truncate text-sm text-slate-500">
                      {payment.email}
                    </p>
                    <p className="truncate text-xs text-slate-400">
                      {payment.transactionId}
                    </p>
                  </div>
                ))
              ) : (
                <p className="rounded-lg bg-base-200 p-4 text-slate-500">
                  No payment activity yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      </>
      )}
    </div>
  );
};

export default AdminHome;
