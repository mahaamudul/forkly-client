const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto my-10 max-w-2xl">
            <p className="mb-4 text-center text-sm uppercase tracking-[0.25em] text-orange-300 md:text-base">---{subHeading}---</p>
            <p className="border-y-4 py-4 text-center text-2xl font-bold uppercase md:text-3xl">{heading}</p>
        </div>
    );
};

export default SectionTitle;
