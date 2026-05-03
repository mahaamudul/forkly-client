import { Helmet } from "react-helmet-async";
import Cover from "../../Shared/Cover/Cover";
import menuCover from "../../../assets/menu/banner3.jpg";
// import { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import LoadingState from "../../../components/Loading/LoadingState";
import MenuCategory from "../MenuCategory/MenuCategory";
import useMenu from "../../../hooks/useMenu";

import dessertImg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaImg from '../../../assets/menu/pizza-bg.jpg'
import saladImg from '../../../assets/menu/salad-bg.jpg'
import soupImg from '../../../assets/menu/soup-bg.jpg'
import { Link } from "react-router-dom";

const Menu = () => {
  const [menu, loading] = useMenu();

  const soup=menu.filter(item=> item.category==='soup')
  const salad=menu.filter(item=> item.category==='salad')
  const pizza=menu.filter(item=> item.category==='pizza')
  const dessert=menu.filter(item=> item.category==='dessert')
  const offered=menu.filter(item=> item.category==='offered')
  


  return (
    <div className="bg-white">
      <div>
        <Helmet>
          <title>Forkly | Menu</title>
        </Helmet>
      </div>
      <Cover
        img={menuCover}
        title={"our menu"}
        subTitle={
          "Discover chef-crafted favorites, seasonal specials, and comforting classics made fresh for every table."
        }
      ></Cover>
      {loading ? (
        <section className="content-shell section-space">
          <LoadingState label="Loading menu" />
        </section>
      ) : (
        <>
      <section className="content-shell section-space">
        <SectionTitle
        heading={'todays offer'}
        subHeading={'lets try our offer items'}
        
        >

        </SectionTitle>


        <MenuCategory items={offered}> </MenuCategory>
      </section>

      {/* dessert */}
      <Cover
        img={dessertImg}
        title={"dessert"}
        subTitle={
          "Sweet finishes with rich flavors, playful textures, and a little extra celebration in every bite."
        }
      ></Cover>
      <section className="content-shell section-space">
        <SectionTitle
        heading={'dessert items'}
        subHeading={'Sweet dessert items'}
        
        >

        </SectionTitle>
        <MenuCategory items={dessert}> </MenuCategory>
        <div className="mt-8 text-center">
        <Link to='/order/dessert' className="btn btn-outline uppercase mx-auto border-0 border-b-4 text-slate-900">Order Now</Link>
        </div>
      </section>
      {/* pizza */}
      <Cover
        img={pizzaImg}
        title={"pizza"}
        subTitle={
          "Crisp crusts, bright toppings, and warm slices made for sharing."
        }
      ></Cover>
      <section className="content-shell section-space">
        <SectionTitle
        heading={'pizza items'}
        subHeading={'Super pizza items'}
        
        >

        </SectionTitle>
        <MenuCategory items={pizza}> </MenuCategory>
        <div className="mt-8 text-center">
        <Link to='/order/pizza' className="btn btn-outline uppercase mx-auto border-0 border-b-4 text-slate-900">Order Now</Link>
        </div>
      </section>
      {/* salad*/}
      <Cover
        img={saladImg}
        title={"salad"}
        subTitle={
          "Fresh greens, balanced dressings, and colorful plates for lighter cravings."
        }
      ></Cover>
      <section className="content-shell section-space">
        <SectionTitle
        heading={'salad items'}
        subHeading={'Super salad items'}
        
        >

        </SectionTitle>
        <MenuCategory items={salad}> </MenuCategory>
        <div className="mt-8 text-center">
        <Link to='/order/salad' className="btn btn-outline uppercase mx-auto border-0 border-b-4 text-slate-900">Order Now</Link>
        </div>
      </section>
      {/* soup*/}
      <Cover
        img={soupImg}
        title={"soup"}
        subTitle={
          "Comforting bowls with layered aromatics, slow-simmered flavor, and a cozy finish."
        }
      ></Cover>
      <section className="content-shell section-space">
        <SectionTitle
        heading={'soup items'}
        subHeading={'Super soup items'}
        
        >

        </SectionTitle>
        <MenuCategory items={soup}> </MenuCategory>
        <div className="mt-8 text-center">
        <Link to='/order/soup' className="btn btn-outline uppercase mx-auto border-0 border-b-4 text-slate-900">Order Now</Link>
        </div>
      </section>
      </>
      )}


    </div>
  );
};

export default Menu;
