import { useForm } from "react-hook-form";
import { useLoaderData } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import Swal from "sweetalert2";
import AdminPageHeader from "../../../components/Admin/AdminPageHeader";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { uploadMenuImage } from "../../../utils/uploadMenuImage";

const UpdateItem = () => {
  const item = useLoaderData();
  const { name, category, recipe, price, image, _id, status, featured } = item || {};

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name,
      category,
      price,
      recipe,
      status: status || "active",
      featured: Boolean(featured),
    },
  });

  const axiosSecure = useAxiosSecure();

  const onSubmit = async (data) => {
    try {
      let imageUrl = image;

      if (data.image?.[0]) {
        imageUrl = await uploadMenuImage(axiosSecure, data.image[0]);
      }

      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: imageUrl,
        status: data.status,
        featured: Boolean(data.featured),
      };

      const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
      if (menuRes.data.modifiedCount > 0) {
        Swal.fire({
          icon: "success",
          title: `${data.name} has been updated.`,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text:
          error.response?.data?.message ||
          error.message ||
          "Could not update the menu item.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Menu operations"
        title="Update Item"
        description="Refresh an existing menu item without losing its current image unless you upload a new one."
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-lg border border-orange-200 bg-base-100 p-5 shadow-sm md:p-6"
      >
        <div className="grid gap-5">
          <div>
            <label className="label">
              <span className="label-text">Recipe name</span>
            </label>
            <input
              type="text"
              placeholder="Recipe name"
              {...register("name", { required: "Recipe name is required" })}
              className="input input-bordered w-full"
            />
            {errors.name ? (
              <p className="mt-2 text-sm text-red-500">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div>
              <label className="label">
                <span className="label-text">Category</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered w-full"
              >
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soup">Soup</option>
                <option value="dessert">Dessert</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>

            <div>
              <label className="label">
                <span className="label-text">Price</span>
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="Price"
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
                className="input input-bordered w-full"
              />
              {errors.price ? (
                <p className="mt-2 text-sm text-red-500">{errors.price.message}</p>
              ) : null}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Status</span>
              </label>
              <select {...register("status")} className="select select-bordered w-full">
                <option value="active">Active</option>
                <option value="unavailable">Unavailable</option>
              </select>
            </div>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Recipe details</span>
            </label>
            <textarea
              {...register("recipe", { required: "Recipe details are required" })}
              className="textarea textarea-bordered min-h-28 w-full"
              placeholder="Describe ingredients, texture, or serving notes"
            />
            {errors.recipe ? (
              <p className="mt-2 text-sm text-red-500">{errors.recipe.message}</p>
            ) : null}
          </div>

          <div className="grid gap-5 md:grid-cols-[180px_1fr_auto] md:items-end">
            <div>
              <label className="label">
                <span className="label-text">Current image</span>
              </label>
              <img
                src={image}
                alt={name}
                className="h-28 w-full rounded-md object-cover"
              />
            </div>

            <div>
              <label className="label">
                <span className="label-text">Replace image</span>
              </label>
              <input
                {...register("image")}
                type="file"
                className="file-input file-input-bordered w-full"
              />
              <p className="mt-2 text-sm text-slate-500">
                Leave blank to keep the current image.
              </p>
            </div>

            <label className="flex min-h-12 items-center gap-3 rounded-lg border border-orange-200 px-4">
              <input
                {...register("featured")}
                type="checkbox"
                className="checkbox border-orange-300"
              />
              <span className="font-medium text-neutral">Featured item</span>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              disabled={isSubmitting}
              className="btn border-0 bg-orange-400 text-neutral hover:bg-orange-500"
            >
              <FaUtensils />
              {isSubmitting ? "Updating..." : "Update Item"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default UpdateItem;
