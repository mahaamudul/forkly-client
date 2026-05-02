

import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import PopularItem from '../../Shared/PopularItem/PopularItem';

import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {

    const [menu]=useMenu()
    const popularItems=menu.filter(item=> item.category==='popular')

    // const [menu,setMenu]=useState([])


    // useEffect(()=>{
    //     fetch('menu.json')
    //     .then(res=>res.json())
    //     .then(data=>{
    //         const popularItems=data.filter(item=> item.category==='popular')
    //         setMenu(popularItems)
    //     })
    // },[])
    return (
        <section>
            <SectionTitle
            heading={'from our menu'}
            subHeading={'check it out'}
            ></SectionTitle>
            <div className='grid lg:grid-cols-2 gap-6 grid-cols-1'>
                {
                    popularItems.map(item=> <PopularItem key={item._id} item={item}></PopularItem>)
                }
            </div>
            
        </section>
    );
};

export default PopularMenu;
