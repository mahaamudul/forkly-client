import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { TableLoadingRow } from "../../../components/Loading/LoadingState";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const statusOptions = ["all", "pending", "confirmed", "cancelled"];

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: bookings = [], refetch, isPending } = useQuery({
    queryKey: ["all-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesStatus =
        statusFilter === "all" || booking.status === statusFilter;
      const searchValue = search.trim().toLowerCase();
      const matchesSearch =
        !searchValue ||
        booking.name?.toLowerCase().includes(searchValue) ||
        booking.email?.toLowerCase().includes(searchValue) ||
        booking.phone?.toLowerCase().includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [bookings, search, statusFilter]);

  const updateStatus = async (booking, status) => {
    const res = await axiosSecure.patch(`/bookings/${booking._id}`, { status });
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        icon: "success",
        title: `Booking marked ${status}.`,
      });
    }
  };

  return (
    <div className="space-y-8">
      <SectionTitle heading="Manage Bookings" subHeading="Coordinate tables" />

      <div className="rounded-lg border border-orange-200 bg-base-100 p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral">
              Reservation console
            </h2>
            <p className="text-sm text-slate-500">
              Filter by guest or status and update the queue quickly.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:flex-row">
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="input input-bordered w-full md:w-72"
              placeholder="Search guest, email, or phone"
            />
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="select select-bordered w-full md:w-48"
            >
              {statusOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "all"
                    ? "All statuses"
                    : option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Guest</th>
                <th>Schedule</th>
                <th>Guests</th>
                <th>Notes</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <TableLoadingRow colSpan={7} label="Loading bookings" />
              ) : filteredBookings.length ? (
                filteredBookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <th>{index + 1}</th>
                    <td>
                      <p className="font-semibold text-neutral">{booking.name}</p>
                      <p className="text-sm text-slate-500">{booking.email}</p>
                      <p className="text-sm text-slate-400">{booking.phone}</p>
                    </td>
                    <td>
                      <p className="font-medium text-neutral">{booking.date}</p>
                      <p className="text-sm text-slate-500">{booking.time}</p>
                    </td>
                    <td>{booking.guests}</td>
                    <td className="max-w-[260px] text-sm text-slate-500">
                      {booking.notes || "No notes"}
                    </td>
                    <td>
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase text-neutral">
                        {booking.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => updateStatus(booking, "confirmed")}
                          className="btn btn-sm border-0 bg-orange-400 text-neutral hover:bg-orange-500"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => updateStatus(booking, "cancelled")}
                          className="btn btn-sm border border-orange-200 bg-white text-neutral hover:bg-orange-50"
                        >
                          Cancel
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="py-10 text-center text-slate-500">
                    No bookings matched your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageBookings;
