import FoodCard from "../../../components/FoodCard/FoodCard";

const OrderTab = ({ item, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((loader) => (
          <div key={loader} className="rounded-lg border border-base-300 bg-base-100 p-4">
            <div className="skeleton h-48 w-full rounded-md"></div>
            <div className="mt-5 space-y-3">
              <div className="skeleton h-5 w-2/3"></div>
              <div className="skeleton h-4 w-full"></div>
              <div className="skeleton h-4 w-5/6"></div>
              <div className="skeleton h-10 w-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!item.length) {
    return (
      <div className="rounded-lg border border-orange-200 bg-orange-50 p-10 text-center">
        <h3 className="text-2xl font-semibold text-neutral">No items found</h3>
        <p className="mt-2 text-slate-600">
          This category is empty right now. Please check another section.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {item.map((food) => (
        <FoodCard key={food._id} item={food}></FoodCard>
      ))}
    </div>
  );
};

export default OrderTab;
