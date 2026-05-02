import SectionTitle from "../../../components/SectionTitle/SectionTitle";

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

  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });

  return (
    <section className="space-y-6">
      <SectionTitle
        heading={"Testimonials"}
        subHeading={"What our client said "}
      ></SectionTitle>
      <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="mx-auto max-w-4xl text-center flex flex-col items-center space-y-4">
              <Rating style={{ maxWidth: 180 }} value={review?.rating} readOnly />
              <p>{review?.details}</p>
              <p className="text-2xl font-semibold uppercase text-orange-300">
                {review?.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
