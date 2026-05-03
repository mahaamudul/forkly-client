import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaEdit, FaLayerGroup, FaPlus, FaSearch, FaTrashAlt } from "react-icons/fa";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import Swal from "sweetalert2";
import AdminEmptyState from "../../../components/Admin/AdminEmptyState";
import AdminMetricCard from "../../../components/Admin/AdminMetricCard";
import AdminPageHeader from "../../../components/Admin/AdminPageHeader";
import { TableLoadingRow } from "../../../components/Loading/LoadingState";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useMenu from "../../../hooks/useMenu";

const categoryOptions = ["all", "salad", "pizza", "soup", "dessert", "drinks", "popular", "offered"];

const ManageItems = () => {
  const [menu, loading, refetch] = useMenu();
  const axiosSecure = useAxiosSecure();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");

  const filteredItems = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return menu
      .filter((item) => {
        const matchesCategory = category === "all" || item.category === category;
        const matchesSearch =
          !searchValue ||
          item.name?.toLowerCase().includes(searchValue) ||
          item.recipe?.toLowerCase().includes(searchValue);

        return matchesCategory && matchesSearch;
      })
      .sort((left, right) => {
        if (sortBy === "price-high") {
          return Number(right.price || 0) - Number(left.price || 0);
        }
        if (sortBy === "price-low") {
          return Number(left.price || 0) - Number(right.price || 0);
        }
        if (sortBy === "category") {
          return String(left.category || "").localeCompare(String(right.category || ""));
        }
        return String(left.name || "").localeCompare(String(right.name || ""));
      });
  }, [category, menu, search, sortBy]);

  const stats = useMemo(() => {
    const categories = new Set(menu.map((item) => item.category).filter(Boolean));
    const averagePrice = menu.length
      ? menu.reduce((sum, item) => sum + Number(item.price || 0), 0) / menu.length
      : 0;

    return {
      total: menu.length,
      categories: categories.size,
      averagePrice,
    };
  }, [menu]);

  const handleDeleteItem = (item) => {
    if (String(item._id).startsWith("local-menu")) {
      Swal.fire({
        icon: "info",
        title: "Demo item",
        text: "This item is loaded from the local fallback menu. Start the API server to manage database items.",
      });
      return;
    }

    Swal.fire({
      title: "Delete this item?",
      text: `${item.name} will be removed from the menu.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete item",
    }).then(async (result) => {
      if (!result.isConfirmed) return;

      const res = await axiosSecure.delete(`/menu/${item._id}`);
      if (res.data.deletedCount > 0) {
        refetch();
        Swal.fire({
          icon: "success",
          title: `${item.name} has been deleted.`,
        });
      }
    });
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Menu operations"
        title="Manage Items"
        description="Search, filter, and maintain the active food catalogue from one focused workspace."
        action={
          <Link
            to="/dashboard/addItems"
            className="btn border-0 bg-orange-400 text-neutral hover:bg-orange-500"
          >
            <FaPlus />
            Add Item
          </Link>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <AdminMetricCard label="Items" value={stats.total} icon={<MdOutlineRestaurantMenu />} />
        <AdminMetricCard label="Categories" value={stats.categories} icon={<FaLayerGroup />} />
        <AdminMetricCard
          label="Average Price"
          value={`$${stats.averagePrice.toFixed(2)}`}
          icon={<MdOutlineRestaurantMenu />}
        />
      </div>

      <div className="rounded-lg border border-orange-200 bg-base-100 p-4 shadow-sm md:p-5">
        <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-xl font-semibold text-neutral">Menu inventory</h2>
            <p className="text-sm text-slate-500">
              Showing {filteredItems.length} of {menu.length} items.
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-[1fr_180px_180px] xl:w-[720px]">
            <label className="input input-bordered flex items-center gap-2">
              <FaSearch className="text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="grow"
                placeholder="Search by item or recipe"
              />
            </label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="select select-bordered w-full"
            >
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option === "all" ? "All categories" : option}
                </option>
              ))}
            </select>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="select select-bordered w-full"
            >
              <option value="name">Sort by name</option>
              <option value="category">Sort by category</option>
              <option value="price-high">Price high to low</option>
              <option value="price-low">Price low to high</option>
            </select>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Item</th>
                <th>Category</th>
                <th>Status</th>
                <th className="text-right">Price</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <TableLoadingRow colSpan={6} label="Loading menu items" />
              ) : filteredItems.length ? (
                filteredItems.map((item, index) => {
                  const isLocalItem = String(item._id).startsWith("local-menu");

                  return (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>
                        <div className="flex min-w-[260px] items-center gap-3">
                          <img
                            className="h-14 w-14 rounded-md object-cover"
                            src={item.image}
                            alt={item.name}
                          />
                          <div>
                            <p className="font-semibold text-neutral">{item.name}</p>
                            <p className="line-clamp-1 max-w-md text-sm text-slate-500">
                              {item.recipe}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase text-neutral">
                          {item.category || "uncategorized"}
                        </span>
                      </td>
                      <td>
                        <span className="rounded-full bg-base-200 px-3 py-1 text-xs font-semibold uppercase text-neutral">
                          {isLocalItem ? "demo" : item.status || "active"}
                        </span>
                      </td>
                      <td className="text-right font-semibold">
                        ${Number(item.price || 0).toFixed(2)}
                      </td>
                      <td>
                        <div className="flex justify-end gap-2">
                          {isLocalItem ? (
                            <button className="btn btn-sm btn-disabled" disabled>
                              <FaEdit />
                            </button>
                          ) : (
                            <Link
                              to={`/dashboard/updateItem/${item._id}`}
                              className="btn btn-sm border-0 bg-orange-400 text-neutral hover:bg-orange-500"
                            >
                              <FaEdit />
                            </Link>
                          )}
                          <button
                            onClick={() => handleDeleteItem(item)}
                            className="btn btn-sm border border-orange-200 bg-white text-neutral hover:bg-orange-50"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="py-6">
                    <AdminEmptyState
                      title="No menu items found"
                      description="Try clearing the search or choosing a different category."
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
