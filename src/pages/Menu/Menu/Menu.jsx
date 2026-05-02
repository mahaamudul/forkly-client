import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuCover from "../../../assets/menu/banner3.jpg";
// import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";
import useMenu from "../../../hooks/useMenu";

import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import { Link } from "react-router-dom";

const Menu = () => {
  const [menu] = useMenu();

  const soup=menu.filter(item=> item.category==='soup')
  const salad=menu.filter(item=> item.category==='salad')
  const pizza=menu.filter(item=> item.category==='pizza')
  const dessert=menu.filter(item=> item.category==='dessert')
  const offered=menu.filter(item=> item.category==='offered')
  


  return (
    <div>
      <div>
        <Helmet>
          <title>Bistro Boss | Menu</title>
        </Helmet>
      </div>
      <Cover
        img={menuCover}
        title={"our menu"}
        subTitle={
          "Discover chef-crafted favorites, seasonal specials, and comforting classics made fresh for every table."
        }
      ></Cover>
      <SectionTitle
      heading={'todays offer'}
      subHeading={'lets try our offer items'}
      
      >

      </SectionTitle>


      <MenuCategory items={offered}> </MenuCategory>

      {/* dessert */}
      <Cover
        img={dessertImg}
        title={"dessert"}
        subTitle={
          "Sweet finishes with rich flavors, playful textures, and a little extra celebration in every bite."
        }
      ></Cover>
      <SectionTitle
      heading={'dessert items'}
      subHeading={'Sweet dessert items'}
      
      >

      </SectionTitle>
      <MenuCategory items={dessert}> </MenuCategory>
      <div className=" text-center">
      <Link to='/order/dessert' className="btn btn-outline text-center   uppercase mx-auto mb-6 border-0  border-b-4 mt-4 text-slate-900">Order Now</Link>
      </div>
      {/* pizza */}
      <Cover
        img={pizzaImg}
        title={"pizza"}
        subTitle={
          "Crisp crusts, bright toppings, and warm slices made for sharing."
        }
      ></Cover>
      <SectionTitle
      heading={'pizza items'}
      subHeading={'Super pizza items'}
      
      >

      </SectionTitle>
      <MenuCategory items={pizza}> </MenuCategory>
      <div className=" text-center">
      <Link to='/order/pizza' className="btn btn-outline text-center   uppercase mx-auto mb-6 border-0  border-b-4 mt-4 text-slate-900">Order Now</Link>
      </div>
      {/* salad*/}
      <Cover
        img={saladImg}
        title={"salad"}
        subTitle={
          "Fresh greens, balanced dressings, and colorful plates for lighter cravings."
        }
      ></Cover>
      <SectionTitle
      heading={'salad items'}
      subHeading={'Super salad items'}
      
      >

      </SectionTitle>
      <MenuCategory items={salad}> </MenuCategory>
      <div className=" text-center">
      <Link to='/order/salad' className="btn btn-outline text-center   uppercase mx-auto mb-6 border-0  border-b-4 mt-4 text-slate-900">Order Now</Link>
      </div>
      {/* soup*/}
      <Cover
        img={soupImg}
        title={"soup"}
        subTitle={
          "Comforting bowls with layered aromatics, slow-simmered flavor, and a cozy finish."
        }
      ></Cover>
      <SectionTitle
      heading={'soup items'}
      subHeading={'Super soup items'}
      
      >

      </SectionTitle>
      <MenuCategory items={soup}> </MenuCategory>
      <div className=" text-center">
      <Link to='/order/soup' className="btn btn-outline text-center   uppercase mx-auto mb-6 border-0  border-b-4 mt-4 text-slate-900">Order Now</Link>
      </div>


    </div>
  );
};

export default Menu;
