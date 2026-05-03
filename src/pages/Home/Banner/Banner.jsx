import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


//import images for banner

import bannerImage1 from '../../../assets/home/01.jpg'
import bannerImage2 from '../../../assets/home/02.jpg'
import bannerImage3 from '../../../assets/home/03.png'
import bannerImage4 from '../../../assets/home/04.jpg'
import bannerImage5 from '../../../assets/home/05.png'
import bannerImage6 from '../../../assets/home/06.png'

const Banner = () => {
    const slides = [
        { image: bannerImage1, alt: "Forkly chef special platter" },
        { image: bannerImage2, alt: "Forkly dining table" },
        { image: bannerImage3, alt: "Fresh restaurant dish" },
        { image: bannerImage4, alt: "Seasonal restaurant plate" },
        { image: bannerImage5, alt: "Forkly dessert" },
        { image: bannerImage6, alt: "Forkly signature meal" },
    ];

    return (
        <section>
             <Carousel autoPlay infiniteLoop showThumbs={false}>
                {slides.map((slide) => (
                    <div key={slide.image}>
                        <img className="h-[56vh] min-h-[320px] w-full object-cover md:h-[72vh] xl:h-[84vh]" src={slide.image} alt={slide.alt} />
                    </div>
                ))}
            </Carousel>
        </section>
    );
};

export default Banner;
