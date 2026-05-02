import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageBookings = () => {
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["all-bookings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings");
      return res.data;
    },
  });

  const updateStatus = async (booking, status) => {
    const res = await axiosSecure.patch(`/bookings/${booking._id}`, { status });
    if (res.data.modifiedCount > 0) {
      refetch();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Booking marked ${status}.`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <SectionTitle heading="Manage Bookings" subHeading="Coordinate tables" />
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Guest</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td>
                  <p className="font-semibold">{booking.name}</p>
                  <p className="text-sm text-slate-500">{booking.email}</p>
                </td>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.guests}</td>
                <td>
                  <span className="badge border-orange-300 bg-orange-100 text-neutral">{booking.status}</span>
                </td>
                <td className="flex gap-2">
                  <button onClick={() => updateStatus(booking, "confirmed")} className="btn btn-sm border-0 bg-orange-400 text-neutral hover:bg-orange-500">
                    Confirm
                  </button>
                  <button onClick={() => updateStatus(booking, "cancelled")} className="btn btn-sm btn-outline">
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;
