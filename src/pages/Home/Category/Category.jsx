import categorySlide1 from "../../../assets/home/slide1.jpg";
import categorySlide2 from "../../../assets/home/slide2.jpg";
import categorySlide3 from "../../../assets/home/slide3.jpg";
import categorySlide4 from "../../../assets/home/slide4.jpg";
import categorySlide5 from "../../../assets/home/slide5.jpg";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const categories = [
  { name: "salads", image: categorySlide1 },
  { name: "pizza", image: categorySlide2 },
  { name: "dessert", image: categorySlide3 },
  { name: "cake", image: categorySlide4 },
  { name: "salads", image: categorySlide5 },
];

const Category = () => {
  return (
    <section>
      
        <SectionTitle
        heading={"Order Online"}
        subHeading={"From 10 AM To 11 PM"}
        >
          
        </SectionTitle>
      
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {categories.map((category) => (
          <SwiperSlide key={`${category.name}-${category.image}`}>
            <div className="relative overflow-hidden rounded-md">
              <img className="aspect-[4/5] w-full object-cover" src={category.image} alt={category.name} />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h4 className="text-center text-xl lg:text-3xl uppercase font-bold text-white">
                  {category.name}
                </h4>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Category;
