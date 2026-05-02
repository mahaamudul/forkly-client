const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="md:w-4/12 mx-auto my-10">
            <p className="text-base text-center text-orange-300 mb-4">---{subHeading}---</p>
            <p className="uppercase text-center border-y-4 text-2xl md:text-3xl font-bold py-4">{heading}</p>
        </div>
    );
};

export default SectionTitle;
