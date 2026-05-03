import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";
import { AUthContext } from "../../../provider/AuthProvider";
import Swal from "sweetalert2";
import LoadingState from "../../../components/Loading/LoadingState";

const CheckOutForm = () => {
    const { user } = useContext(AUthContext);
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const axiosSecure=useAxiosSecure()
  const [cart,refetch, cartLoading]=useCart()
  const totalPrice=cart.reduce((total,item)=>total+ item.price,0)
  const[clientSecret,setClientSecret]=useState()
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);

  const [transactionId,setTransactionId]=useState('')

  useEffect(()=>{
    if(totalPrice>0){
        setIsPreparingPayment(true);
        axiosSecure.post('/create-payment-intent',{
            price:totalPrice
        })
        .then(res=>{
            setClientSecret(res.data.clientSecret)
    
        })
        .finally(() => setIsPreparingPayment(false))
    }
  },[axiosSecure,totalPrice])
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
    }
    // confirm payments

    const {paymentIntent, error:confirmErr}= await stripe.confirmCardPayment(clientSecret,{
        payment_method: {
            card: card,
            billing_details: {
                email: user?.email || 'anonymous',
                name: user?.displayName || 'anonymous'
            }
        }
    })

    if(confirmErr){
        setError(confirmErr.message);
    }
    else{
        if(paymentIntent.status==='succeeded'){
            setTransactionId(paymentIntent.id)

            const payment={
                email: user?.email,
                price: totalPrice,
                transactionId: paymentIntent.id,
                date: new Date(),
                cartId: cart.map(item=>item._id),
                menuItemId: cart.map(item=>item.menuId),
                status:'pending'
            }
            const res=await axiosSecure.post('/payment', payment)
            if(res.data?.paymentResult?.insertedId){
                refetch()
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `Payment Done TXID: ${paymentIntent.id}`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            }
        }
    }
  };
  if (cartLoading) {
    return <LoadingState label="Loading cart for payment" />;
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {isPreparingPayment ? (
          <LoadingState label="Preparing secure payment" variant="inline" />
        ) : null}
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-outline mt-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
        <p className="text-neutral">{error}</p>
        {transactionId&& <p><span className="text-orange-500">Payment Success, TXID:</span> {transactionId}</p>}
      </form>
    </div>
  );
};

export default CheckOutForm;
