import Swal from "sweetalert2";
import useCart from "../../../hooks/useCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AUthContext } from "../../../provider/AuthProvider";
import { removeLocalCartItem } from "../../../utils/localCart";
import LoadingState from "../../../components/Loading/LoadingState";

const Cart = () => {
  const [cart,refetch, cartLoading] = useCart();
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AUthContext);

  //   delete order items
  const handleDeleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/carts/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch()
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
              });
          }
        }).catch(() => {
          const removed = removeLocalCartItem(user?.email, id);
          if (removed) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "The local cart item has been removed.",
              icon: "success"
            });
          }
        });
      }
    });
  };
  if (cartLoading) {
    return <LoadingState label="Loading cart" />;
  }

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 rounded-lg bg-base-200 p-5 md:flex-row md:items-center md:justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Total Order: {cart.length}</h1>
        <h1 className="text-3xl font-semibold md:text-4xl">Price: ${totalPrice.toFixed(2)}</h1>
        
        {cart.length? <Link to='/dashboard/payment' className="btn bg-orange-300 text-black">Pay</Link>: <button disabled={true}  className="btn bg-orange-300 text-black">Pay</button> }

      </div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-orange-200 rounded-lg ">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {cart.map((item, idx) => (
              <tr key={item._id}>
                <th>{idx + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item?.image} alt={item.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>${Number(item.price).toFixed(2)}</td>
                <th>
                  <button
                    onClick={() => handleDeleteOrder(item?._id)}
                    className="btn btn-square btn-outline"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cart;
