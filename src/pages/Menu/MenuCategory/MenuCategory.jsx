import PopularItem from "../../Shared/PopularItem/PopularItem";


const MenuCategory = ({items}) => {
    return (
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                {
                    items.map(item=> <PopularItem key={item._id} item={item}></PopularItem>)
                }
            </div>
    );
};

export default MenuCategory;
