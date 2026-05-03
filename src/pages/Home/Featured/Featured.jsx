import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import feturedImage from '../../../assets/home/featured.jpg'
import './Featured.css'


const Featured = () => {
    return (
        <section className="fetured bg-fixed">
            <div className="content-shell section-space text-white">
                <SectionTitle
                    heading={'featured item'}
                    subHeading={'check it out'}
                ></SectionTitle>
                <div className="flex flex-col items-center gap-6 py-4 text-white md:flex-row md:gap-8">
                    <div className="w-full md:w-[44%]">
                        <img className="w-full rounded-md"  src={feturedImage} alt="Chef's seasonal table" />
                    </div>
                    <div className="w-full md:w-[56%]">
                        <h4>May 18, 2026</h4>
                        <h3 className="mt-2 text-2xl uppercase md:text-3xl">Chef&apos;s seasonal table</h3>
                        <p className="mt-3 leading-7">Fresh ingredients, bold sauces, and a balanced plate built around the flavors guests keep coming back for.</p>
                        <button className="btn btn-outline mt-4 border-0 border-b-4 text-white">Read More</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Featured;
