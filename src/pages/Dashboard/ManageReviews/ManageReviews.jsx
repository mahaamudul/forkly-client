import { useMemo, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { useQuery } from "@tanstack/react-query";
import { FaSearch, FaTrashAlt } from "react-icons/fa";
import { LuEyeOff, LuShieldCheck, LuStar } from "react-icons/lu";
import { MdOutlineReviews } from "react-icons/md";
import Swal from "sweetalert2";
import AdminEmptyState from "../../../components/Admin/AdminEmptyState";
import AdminMetricCard from "../../../components/Admin/AdminMetricCard";
import AdminPageHeader from "../../../components/Admin/AdminPageHeader";
import { TableLoadingRow } from "../../../components/Loading/LoadingState";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const statusOptions = ["all", "pending", "approved", "hidden"];

const getReviewStatus = (review) => review.status || "approved";

const ManageReviews = () => {
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const {
    data: reviews = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/reviews");
      return res.data;
    },
  });

  const stats = useMemo(() => {
    const approved = reviews.filter(
      (review) => getReviewStatus(review) === "approved"
    ).length;
    const pending = reviews.filter(
      (review) => getReviewStatus(review) === "pending"
    ).length;
    const hidden = reviews.filter(
      (review) => getReviewStatus(review) === "hidden"
    ).length;
    const averageRating = reviews.length
      ? reviews.reduce((sum, review) => sum + Number(review.rating || 0), 0) /
        reviews.length
      : 0;

    return {
      total: reviews.length,
      approved,
      pending,
      hidden,
      averageRating,
    };
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return reviews.filter((review) => {
      const status = getReviewStatus(review);
      const matchesStatus = statusFilter === "all" || status === statusFilter;
      const matchesSearch =
        !searchValue ||
        review.name?.toLowerCase().includes(searchValue) ||
        review.email?.toLowerCase().includes(searchValue) ||
        review.details?.toLowerCase().includes(searchValue);

      return matchesStatus && matchesSearch;
    });
  }, [reviews, search, statusFilter]);

  const updateReview = async (review, payload, successTitle) => {
    const res = await axiosSecure.patch(`/reviews/${review._id}`, payload);
    if (res.data.modifiedCount > 0) {
      await refetch();
      Swal.fire({
        icon: "success",
        title: successTitle,
      });
    }
  };

  const deleteReview = (review) => {
    Swal.fire({
      title: "Delete this review?",
      text: `${review.name || "This guest"}'s review will be removed permanently.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete review",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const res = await axiosSecure.delete(`/reviews/${review._id}`);
      if (res.data.deletedCount > 0) {
        await refetch();
        Swal.fire({
          icon: "success",
          title: "Review deleted",
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Content moderation"
        title="Manage Reviews"
        description="Approve guest feedback for the public homepage, hide content that needs review, and keep ratings easy to scan."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminMetricCard label="Total Reviews" value={stats.total} icon={<MdOutlineReviews />} />
        <AdminMetricCard label="Pending" value={stats.pending} icon={<LuStar />} />
        <AdminMetricCard label="Approved" value={stats.approved} icon={<LuShieldCheck />} />
        <AdminMetricCard
          label="Average Rating"
          value={stats.averageRating.toFixed(1)}
          icon={<LuStar />}
        />
      </div>

      <div className="rounded-lg border border-orange-200 bg-base-100 p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral">Review queue</h2>
            <p className="text-sm text-slate-500">
              Showing {filteredReviews.length} of {reviews.length} reviews.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_180px] xl:w-[560px]">
            <label className="input input-bordered flex items-center gap-2">
              <FaSearch className="text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="grow"
                placeholder="Search review, guest, or email"
              />
            </label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="select select-bordered w-full"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "all" ? "All statuses" : status}
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
                <th>Rating</th>
                <th>Review</th>
                <th>Status</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isPending ? (
                <TableLoadingRow colSpan={6} label="Loading reviews" />
              ) : filteredReviews.length ? (
                filteredReviews.map((review, index) => {
                  const status = getReviewStatus(review);

                  return (
                    <tr key={review._id}>
                      <td>{index + 1}</td>
                      <td>
                        <p className="font-semibold text-neutral">
                          {review.name || "Forkly Guest"}
                        </p>
                        <p className="text-sm text-slate-500">
                          {review.email || "No email tracked"}
                        </p>
                      </td>
                      <td className="min-w-[140px]">
                        <Rating
                          style={{ maxWidth: 110 }}
                          value={Number(review.rating || 0)}
                          readOnly
                        />
                      </td>
                      <td className="max-w-md text-sm leading-6 text-slate-600">
                        {review.details}
                      </td>
                      <td>
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase text-neutral">
                          {status}
                        </span>
                      </td>
                      <td>
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              updateReview(
                                review,
                                { status: "approved" },
                                "Review approved"
                              )
                            }
                            className="btn btn-sm border-0 bg-orange-400 text-neutral hover:bg-orange-500"
                            disabled={status === "approved"}
                          >
                            <LuShieldCheck />
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              updateReview(review, { status: "hidden" }, "Review hidden")
                            }
                            className="btn btn-sm border border-orange-200 bg-white text-neutral hover:bg-orange-50"
                            disabled={status === "hidden"}
                          >
                            <LuEyeOff />
                          </button>
                          <button
                            onClick={() => deleteReview(review)}
                            className="btn btn-sm border border-orange-200 bg-white text-neutral hover:bg-orange-50"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-6">
                    <AdminEmptyState
                      title="No reviews found"
                      description="Try clearing the search or choosing a different status."
                    />
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

export default ManageReviews;
