import { useLoaderData } from "react-router-dom";
// import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { IMAGE_HOSTING_API } from "../../../config/api";


const UpdateItem = () => {
    const {name, category, recipe, price, image, _id}= useLoaderData();
    

    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        let imageUrl = image;

        if (data.image?.[0]) {
            if (!IMAGE_HOSTING_API) {
                Swal.fire("Image hosting key is missing.");
                return;
            }

            const imageFile = { image: data.image[0] }
            const res = await axiosPublic.post(IMAGE_HOSTING_API, imageFile, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });
            if (res.data.success) {
                imageUrl = res.data.data.display_url;
            }
        }

        const menuItem = {
            name: data.name,
            category: data.category,
            price: parseFloat(data.price),
            recipe: data.recipe,
            image: imageUrl
        }

        const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
        if(menuRes.data.modifiedCount > 0){
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${data.name} is updated to the menu.`,
                showConfirmButton: false,
                timer: 1500
              });
        }
    };
    
    
    return (
        <div>
            <SectionTitle heading="Update an Item" subHeading="Refresh info"></SectionTitle>
            <div>
                
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-control w-full my-6">
                        <label className="label">
                            <span className="label-text">Recipe Name*</span>
                        </label>
                        <input
                            type="text"
                            defaultValue={name}
                            placeholder="Recipe Name"
                            {...register('name', { required: true })}
                            required
                            className="input input-bordered w-full" />
                    </div>
                    <div className="flex gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Category*</span>
                            </label>
                            <select defaultValue={category} {...register('category', { required: true })}
                                className="select select-bordered w-full">
                                <option disabled value="default">Select a category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>

                        {/* price */}
                        <div className="form-control w-full my-6">
                            <label className="label">
                                <span className="label-text">Price*</span>
                            </label>
                            <input
                                type="number"
                                defaultValue={price}
                                placeholder="Price"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full" />
                        </div>

                    </div>
                    {/* recipe details */}
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Recipe Details</span>
                        </label>
                        <textarea defaultValue={recipe} {...register('recipe')} className="textarea textarea-bordered h-24" placeholder="Bio"></textarea>
                    </div>

                    <div className="form-control w-full my-6">
                        <input {...register('image')} type="file" className="file-input w-full max-w-xs" />
                        <span className="mt-2 text-sm text-slate-500">Leave blank to keep the current image.</span>
                    </div>

                    <button className="btn">
                        Update menu Item
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateItem;
