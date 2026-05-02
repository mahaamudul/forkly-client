
const PopularItem = ({item}) => {
    const {name,image,price,recipe}=item
    return (
        <div className="flex items-start gap-4">
            <img style={{borderRadius:'0 200px 200px 200px'}} className="h-[105px] w-[105px] shrink-0 object-cover" src={image} alt={name} />
            <div className="flex-1 border-b border-dashed border-slate-300 pb-4">
                <h3 className="uppercase font-semibold text-xl">{name}</h3>
                <p className="text-slate-600">{recipe}</p>
            </div>
            <p className="text-orange-400 font-semibold whitespace-nowrap">$ {Number(price).toFixed(2)}</p>
        </div>
    );
};

export default PopularItem;
