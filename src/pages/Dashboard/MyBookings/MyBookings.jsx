import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { MdOutlineDeleteForever } from "react-icons/md";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AUthContext } from "../../../provider/AuthProvider";

const MyBookings = () => {
  const { user } = useContext(AUthContext);
  const axiosSecure = useAxiosSecure();

  const { data: bookings = [], refetch } = useQuery({
    queryKey: ["bookings", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get("/bookings", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  const handleDelete = (booking) => {
    Swal.fire({
      title: "Cancel this reservation?",
      text: "You can request a new reservation any time.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f59e0b",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, cancel it",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`/bookings/${booking._id}`);
        if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire("Reservation cancelled.");
        }
      }
    });
  };

  return (
    <div>
      <SectionTitle heading="My Bookings" subHeading="Your table requests" />
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-semibold">Total Bookings: {bookings.length}</h2>
        <Link to="/dashboard/reservation" className="btn bg-orange-400 text-black">
          New Reservation
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>Time</th>
              <th>Guests</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking._id}>
                <th>{index + 1}</th>
                <td>{booking.date}</td>
                <td>{booking.time}</td>
                <td>{booking.guests}</td>
                <td>
                  <span className="badge border-orange-300 bg-orange-100 text-neutral">{booking.status}</span>
                </td>
                <td>
                  <button onClick={() => handleDelete(booking)} className="btn btn-square btn-outline">
                    <MdOutlineDeleteForever className="text-xl text-neutral" />
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

export default MyBookings;
