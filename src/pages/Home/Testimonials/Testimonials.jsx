import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import LoadingState from "../../../components/Loading/LoadingState";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

//react ratings styles
import { Rating } from "@smastrom/react-rating";

import "@smastrom/react-rating/style.css";

// import required modules
import { Navigation } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], isPending } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });

  return (
    <section className="content-shell section-space space-y-6">
      <SectionTitle
        heading={"Testimonials"}
        subHeading={"What our client said "}
      ></SectionTitle>
      {isPending ? (
        <LoadingState label="Loading testimonials" />
      ) : (
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="mx-auto flex max-w-4xl flex-col items-center space-y-4 px-2 text-center md:px-6">
              <Rating style={{ maxWidth: 180 }} value={review?.rating} readOnly />
              <p className="text-sm leading-7 text-slate-700 md:text-base">{review?.details}</p>
              <p className="text-2xl font-semibold uppercase text-orange-300">
                {review?.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      )}
    </section>
  );
};

export default Testimonials;
