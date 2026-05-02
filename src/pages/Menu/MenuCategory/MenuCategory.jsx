import PopularItem from "../../Shared/PopularItem/PopularItem";


const MenuCategory = ({items}) => {
    return (
        <div className='grid lg:grid-cols-2 gap-6 grid-cols-1'>
                {
                    items.map(item=> <PopularItem key={item._id} item={item}></PopularItem>)
                }
            </div>
    );
};

export default MenuCategory;
