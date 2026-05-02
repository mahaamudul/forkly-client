import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AUthContext } from "../../../provider/AuthProvider";

const today = new Date().toISOString().slice(0, 10);

const Reservation = () => {
  const { user } = useContext(AUthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: user?.displayName || "",
      email: user?.email || "",
      guests: 2,
      date: today,
      time: "19:00",
    },
  });

  useEffect(() => {
    reset({
      name: user?.displayName || "",
      email: user?.email || "",
      guests: 2,
      date: today,
      time: "19:00",
      phone: "",
      notes: "",
    });
  }, [reset, user]);

  const onSubmit = async (data) => {
    const booking = {
      ...data,
      guests: Number(data.guests),
    };

    try {
      const res = await axiosSecure.post("/bookings", booking);
      if (res.data.insertedId) {
        reset({
          name: user?.displayName || "",
          email: user?.email || "",
          guests: 2,
          date: today,
          time: "19:00",
          phone: "",
          notes: "",
        });
        Swal.fire({
          icon: "success",
          title: "Reservation request sent",
          text: "Your table request was saved to the database.",
          showConfirmButton: false,
          timer: 1800,
        });
        navigate("/dashboard/myBookings");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Reservation failed",
        text:
          error.response?.data?.message ||
          "Could not save the reservation. Please make sure the server and database are running.",
      });
    }
  };

  return (
    <div>
      <SectionTitle heading="Reservation" subHeading="Book a table" />
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 rounded-lg bg-base-200 p-6 md:grid-cols-2">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input className="input input-bordered" {...register("name", { required: true })} />
          {errors.name && <span className="mt-1 text-sm text-neutral">Name is required.</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input className="input input-bordered" type="email" {...register("email", { required: true })} readOnly />
          {errors.email && <span className="mt-1 text-sm text-neutral">Email is required.</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Date</span>
          </label>
          <input className="input input-bordered" min={today} type="date" {...register("date", { required: true })} />
          {errors.date && <span className="mt-1 text-sm text-neutral">Date is required.</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Time</span>
          </label>
          <input className="input input-bordered" type="time" {...register("time", { required: true })} />
          {errors.time && <span className="mt-1 text-sm text-neutral">Time is required.</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Guests</span>
          </label>
          <input className="input input-bordered" min="1" max="20" type="number" {...register("guests", { required: true, min: 1, max: 20 })} />
          {errors.guests && <span className="mt-1 text-sm text-neutral">Guests must be between 1 and 20.</span>}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Phone</span>
          </label>
          <input className="input input-bordered" type="tel" {...register("phone", { required: true })} />
          {errors.phone && <span className="mt-1 text-sm text-neutral">Phone is required.</span>}
        </div>
        <div className="form-control md:col-span-2">
          <label className="label">
            <span className="label-text">Notes</span>
          </label>
          <textarea className="textarea textarea-bordered h-28" {...register("notes")} placeholder="Allergies, occasion, seating preference" />
        </div>
        <button disabled={isSubmitting} className="btn bg-orange-400 text-black md:col-span-2">
          {isSubmitting ? "Saving reservation..." : "Request Reservation"}
        </button>
      </form>
    </div>
  );
};

export default Reservation;
