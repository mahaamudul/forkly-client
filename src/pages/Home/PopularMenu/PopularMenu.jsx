

import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import LoadingState from '../../../components/Loading/LoadingState';
import PopularItem from '../../Shared/PopularItem/PopularItem';

import useMenu from '../../../hooks/useMenu';

const PopularMenu = () => {

    const [menu, loading]=useMenu()
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
        <section className='content-shell section-space'>
            <SectionTitle
            heading={'from our menu'}
            subHeading={'check it out'}
            ></SectionTitle>
            {loading ? (
                <LoadingState label="Loading popular menu" />
            ) : (
            <div className='grid lg:grid-cols-2 gap-6 grid-cols-1'>
                {
                    popularItems.map(item=> <PopularItem key={item._id} item={item}></PopularItem>)
                }
            </div>
            )}
            
        </section>
    );
};

export default PopularMenu;
