import orderCoverImage from "../../../assets/shop/banner2.jpg";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import useMenu from "../../../hooks/useMenu";

import OrderTab from "../OrderTab/OrderTab";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Order = () => {
  const categories = ["salad", "pizza", "soup", "dessert", "drinks"];

  const { category } = useParams();
  const navigate = useNavigate();

  const activeIndex = categories.includes(category) ? categories.indexOf(category) : 0;
  const activeCategory = categories[activeIndex];

  const [menu, loading] = useMenu();
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const pizza = menu.filter((item) => item.category === "pizza");
  const dessert = menu.filter((item) => item.category === "dessert");
  const drinks = menu.filter((item) => item.category === "drinks");
  const categoryItems = [salad, pizza, soup, dessert, drinks];
  const activeItems = categoryItems[activeIndex];

  return (
    <div className="bg-base-100 pb-12">
      <Helmet>
        <title>Forkly | Order Food</title>
      </Helmet>

      <section
        className="relative flex min-h-[360px] items-end bg-cover bg-center pb-10 pt-28"
        style={{ backgroundImage: `url(${orderCoverImage})` }}
      >
        <div className="absolute inset-0 bg-neutral/70"></div>
        <div className="content-shell relative w-full text-white">
          <p className="mb-3 text-sm font-semibold uppercase text-orange-300">
            Fresh from 10 AM to 11 PM
          </p>
          <h1 className="max-w-2xl text-4xl font-bold uppercase md:text-6xl">
            Order Food
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
            Choose your category, add favorites to the cart, and keep the meal
            moving without leaving the page.
          </p>
        </div>
      </section>

      <section className="content-shell pb-12 pt-5 md:pb-14 md:pt-6">
        <div className="pb-4 md:pb-5">
          <p className="text-sm font-semibold uppercase text-orange-400">
            Now browsing
          </p>
          <div className="flex flex-col justify-between gap-2 md:flex-row md:items-end">
            <h2 className="text-3xl font-bold uppercase text-neutral md:text-4xl">
              {activeCategory}
            </h2>
            <p className="text-slate-600">
              {loading ? "Loading menu..." : `${activeItems.length} items available`}
            </p>
          </div>
        </div>

        <Tabs
          selectedIndex={activeIndex}
          onSelect={(index) => navigate(`/order/${categories[index]}`)}
          selectedTabClassName="bg-orange-400 text-neutral shadow"
        >
          <TabList className="sticky top-20 z-10 mb-6 flex gap-2 overflow-x-auto rounded-lg border border-orange-200 bg-base-100 p-2 shadow-sm md:top-24">
          <Tab className="cursor-pointer whitespace-nowrap rounded-md px-4 py-3 text-sm font-semibold uppercase text-neutral outline-none transition hover:bg-orange-100 md:px-5">
            Salad
          </Tab>
          <Tab className="cursor-pointer whitespace-nowrap rounded-md px-4 py-3 text-sm font-semibold uppercase text-neutral outline-none transition hover:bg-orange-100 md:px-5">
            Pizza
          </Tab>
          <Tab className="cursor-pointer whitespace-nowrap rounded-md px-4 py-3 text-sm font-semibold uppercase text-neutral outline-none transition hover:bg-orange-100 md:px-5">
            Soup
          </Tab>
          <Tab className="cursor-pointer whitespace-nowrap rounded-md px-4 py-3 text-sm font-semibold uppercase text-neutral outline-none transition hover:bg-orange-100 md:px-5">
            Dessert
          </Tab>
          <Tab className="cursor-pointer whitespace-nowrap rounded-md px-4 py-3 text-sm font-semibold uppercase text-neutral outline-none transition hover:bg-orange-100 md:px-5">
            Drinks
          </Tab>
        </TabList>

        <TabPanel>
          <OrderTab item={salad} loading={loading}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab item={pizza} loading={loading}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab item={soup} loading={loading}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab item={dessert} loading={loading}></OrderTab>
        </TabPanel>
        <TabPanel>
          <OrderTab item={drinks} loading={loading}></OrderTab>
        </TabPanel>
      </Tabs>
      </section>
    </div>
  );
};

export default Order;
