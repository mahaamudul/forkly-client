import { loadStripe } from "@stripe/stripe-js";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payments_Pk);
const Payment = () => {
  return (
    <div>
      <SectionTitle
        heading={"Make Payments"}
        subHeading={"Please Payment To Eat"}
      ></SectionTitle>
      <div>
        <Elements stripe={stripePromise}>
            <CheckOutForm></CheckOutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
