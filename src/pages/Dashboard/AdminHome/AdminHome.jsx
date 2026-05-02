import { useQuery } from "@tanstack/react-query";
import { FaDollarSign, FaUsers } from "react-icons/fa";
import { MdOutlineRestaurantMenu, MdTableBar } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AdminHome = () => {
  const axiosSecure = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin-stats");
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

  return (
    <div>
      <SectionTitle heading="Admin Home" subHeading="Business at a glance" />
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
            <p className="uppercase">{card.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg bg-base-200 p-6">
          <h3 className="mb-2 text-2xl font-semibold">Operational focus</h3>
          <p>
            Keep menu availability, bookings, users, and payment history in one
            place so service stays smooth during rush hours.
          </p>
        </div>
        <div className="rounded-lg bg-base-200 p-6">
          <h3 className="mb-2 text-2xl font-semibold">Next actions</h3>
          <p>
            Review new reservations, update pending payment statuses, and keep
            seasonal menu items fresh.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
