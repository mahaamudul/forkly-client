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
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const review = {
      name: user?.displayName || data.name,
      email: user?.email,
      rating,
      details: data.details,
      createdAt: new Date().toISOString(),
    };

    try {
      const res = await axiosSecure.post("/reviews", review);
      if (res.data.insertedId) {
        reset();
        setRating(5);
        Swal.fire({
          position: "top-end",
            icon: "success",
            title: "Thanks for sharing your review.",
            text: "An admin will approve it before it appears on the homepage.",
            showConfirmButton: false,
            timer: 1800,
          });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Review failed",
        text: error.response?.data?.message || "Could not save your review.",
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
        <button disabled={isSubmitting} className="btn bg-orange-400 text-black">
          {isSubmitting ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default AddReview;
