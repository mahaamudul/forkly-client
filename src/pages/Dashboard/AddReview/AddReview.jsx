import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AUthContext } from "../../../provider/AuthProvider";

const AddReview = () => {
  const [rating, setRating] = useState(5);
  const { user } = useContext(AUthContext);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    const review = {
      name: user?.displayName || data.name,
      email: user?.email,
      rating,
      details: data.details,
      createdAt: new Date().toISOString(),
    };

    const res = await axiosSecure.post("/reviews", review);
    if (res.data.insertedId) {
      reset();
      setRating(5);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thanks for sharing your review.",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <SectionTitle heading="Add Review" subHeading="Tell us how we did" />
      <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg bg-base-200 p-6">
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <Rating style={{ maxWidth: 180 }} value={rating} onChange={setRating} />
        </div>
        <div className="form-control mb-6">
          <label className="label">
            <span className="label-text">Your review</span>
          </label>
          <textarea
            className="textarea textarea-bordered min-h-36"
            placeholder="What should we keep doing, improve, or try next?"
            {...register("details", { required: true })}
          />
        </div>
        <button className="btn bg-orange-400 text-black">Submit Review</button>
      </form>
    </div>
  );
};

export default AddReview;
