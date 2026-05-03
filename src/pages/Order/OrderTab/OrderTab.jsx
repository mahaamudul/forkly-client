import FoodCard from "../../../components/FoodCard/FoodCard";
import LoadingState from "../../../components/Loading/LoadingState";

const OrderTab = ({ item, loading }) => {
  if (loading) {
    return (
      <LoadingState
        label="Loading menu items"
        description="Fresh category items are being prepared."
      />
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
