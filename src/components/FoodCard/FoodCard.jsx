import { useContext } from "react";
import { AUthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { addLocalCartItem } from "../../utils/localCart";

const FoodCard = ({ item }) => {
  const { name, image, price, recipe,_id } = item;
  const axiosSecure=useAxiosSecure()
  const [,refetch]=useCart()

  const navigate = useNavigate();
  const location = useLocation();


  const { user } = useContext(AUthContext);

  const handleFoodCart = () => {
    if (user && user.email) {
      const cartInfo={
        menuId:_id,
        email:user.email ,
        name,
        price,
        image
      }
      axiosSecure.post('/carts',cartInfo)
      .then(result=>{
        if(result.data.insertedId){
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${name} added to your cart.`,
            showConfirmButton: false,
            timer: 1500,
          });
          refetch()
        }
      })
      .catch(() => {
        addLocalCartItem(user.email, cartInfo);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${name} added to your local cart.`,
          text: "The API server is offline, so this cart is saved in your browser.",
          showConfirmButton: false,
          timer: 2000,
        });
        refetch();
      })
      
      

      //post data
    } else {
      Swal.fire({
        title: "You Are Not Logged In",
        text: "Please Login First",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sign In"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/login', { state: { from: location } });
        }
      });
    }
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
      <figure className="relative aspect-[4/3] overflow-hidden bg-base-200">
        <img className="h-full w-full object-cover" src={image} alt={name} />
        <span className="absolute right-3 top-3 rounded-md bg-orange-400 px-3 py-2 text-sm font-bold text-neutral shadow">
          ${Number(price).toFixed(2)}
        </span>
      </figure>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="text-xl font-bold text-neutral">{name}</h2>
        <p className="mt-3 flex-1 text-sm leading-6 text-slate-600">{recipe}</p>
        <button
          onClick={handleFoodCart}
          className="btn mt-5 w-full rounded-md border border-orange-300 bg-orange-50 text-neutral hover:border-orange-400 hover:bg-orange-400 hover:text-neutral"
        >
          <FaCartPlus className="text-orange-500" />
          Order Now
        </button>
      </div>
    </article>
  );
};

export default FoodCard;
