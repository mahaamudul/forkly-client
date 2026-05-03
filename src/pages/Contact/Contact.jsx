import { Helmet } from "react-helmet-async";
import { FaClock, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import Cover from "../Shared/Cover/Cover";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import contactCover from "../../assets/contact/banner.jpg";

const Contact = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    event.currentTarget.reset();
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Message received.",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const contactItems = [
    {
      label: "Phone",
      value: "+1 555 013 4567",
      icon: <FaPhoneAlt />,
    },
    {
      label: "Email",
      value: "hello@forkly.test",
      icon: <FaEnvelope />,
    },
    {
      label: "Address",
      value: "42 Market Street, Food District",
      icon: <FaMapMarkerAlt />,
    },
    {
      label: "Hours",
      value: "Daily, 10:00 AM - 11:00 PM",
      icon: <FaClock />,
    },
  ];

  return (
    <div className="bg-white">
      <Helmet>
        <title>Forkly | Contact</title>
      </Helmet>
      <Cover
        img={contactCover}
        title="Contact Us"
        subTitle="Questions, events, reservations, or feedback: send a note and the Forkly team will get back to you."
      />
      <section className="content-shell section-space">
        <SectionTitle heading="Contact Details" subHeading="Reach the team" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {contactItems.map((item) => (
            <div key={item.label} className="rounded-lg bg-base-200 p-6 text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-orange-300 text-xl text-black">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold">{item.label}</h3>
              <p className="mt-2 break-words text-slate-600">{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <form onSubmit={handleSubmit} className="grid gap-4 rounded-lg bg-base-200 p-5 md:p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <input className="input input-bordered w-full" placeholder="Name" required />
              <input className="input input-bordered w-full" type="email" placeholder="Email" required />
            </div>
            <input className="input input-bordered w-full" placeholder="Subject" required />
            <textarea className="textarea textarea-bordered min-h-36 w-full" placeholder="Message" required />
            <button className="btn bg-orange-400 text-black">Send Message</button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
