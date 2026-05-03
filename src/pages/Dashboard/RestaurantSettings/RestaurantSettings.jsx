import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LuClock, LuMail, LuMapPin, LuSettings } from "react-icons/lu";
import Swal from "sweetalert2";
import AdminMetricCard from "../../../components/Admin/AdminMetricCard";
import AdminPageHeader from "../../../components/Admin/AdminPageHeader";
import LoadingState from "../../../components/Loading/LoadingState";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const defaultForm = {
  restaurantName: "Forkly",
  tagline: "Modern dining, warm service",
  phone: "+1 555 013 4567",
  email: "hello@forkly.com",
  address: "123 Flavor Street, New York, NY",
  openingHours: "Daily: 10:00 AM - 11:00 PM",
  kitchenHours: "Kitchen closes at 10:30 PM",
  reservationNotice: "Reservations are reviewed by the Forkly team before confirmation.",
  maxReservationGuests: 20,
};

const RestaurantSettings = () => {
  const axiosSecure = useAxiosSecure();
  const [form, setForm] = useState(defaultForm);
  const [isSaving, setIsSaving] = useState(false);

  const {
    data: settings,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["restaurant-settings"],
    queryFn: async () => {
      const res = await axiosSecure.get("/admin/settings");
      return res.data;
    },
  });

  useEffect(() => {
    if (settings) {
      setForm({
        ...defaultForm,
        ...settings,
        maxReservationGuests: settings.maxReservationGuests || 20,
      });
    }
  }, [settings]);

  const settingsSummary = useMemo(
    () => [
      {
        label: "Brand",
        value: form.restaurantName,
        icon: <LuSettings />,
      },
      {
        label: "Max Guests",
        value: form.maxReservationGuests,
        icon: <LuClock />,
      },
      {
        label: "Contact",
        value: form.phone,
        icon: <LuMail />,
      },
    ],
    [form.maxReservationGuests, form.phone, form.restaurantName]
  );

  const handleChange = (event) => {
    const { name, value, type } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSaving(true);

    try {
      const res = await axiosSecure.patch("/admin/settings", form);
      if (res.data.acknowledged || res.data.modifiedCount >= 0) {
        await refetch();
        Swal.fire({
          icon: "success",
          title: "Settings saved",
          text: "The restaurant profile has been updated in the database.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Settings failed",
        text: error.response?.data?.message || "Could not save restaurant settings.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <AdminPageHeader
        eyebrow="Restaurant controls"
        title="Settings"
        description="Keep Forkly contact details, opening hours, and reservation limits in one database-backed admin area."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {settingsSummary.map((item) => (
          <AdminMetricCard
            key={item.label}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="rounded-lg border border-orange-200 bg-base-100 p-4 shadow-sm md:p-5"
      >
        <div className="flex flex-col gap-2 border-b border-orange-100 pb-5">
          <h2 className="text-xl font-semibold text-neutral">Restaurant profile</h2>
          <p className="text-sm text-slate-500">
            These settings are stored in MongoDB and can be reused across the app.
          </p>
        </div>

        {isPending ? (
          <LoadingState label="Loading settings" />
        ) : (
          <>
            <div className="mt-5 grid gap-5 lg:grid-cols-2">
              <label className="form-control">
                <span className="label-text mb-2 font-medium text-neutral">
                  Restaurant name
                </span>
                <input
                  name="restaurantName"
                  value={form.restaurantName}
                  onChange={handleChange}
                  className="input input-bordered rounded-md"
                  required
                />
              </label>

              <label className="form-control">
                <span className="label-text mb-2 font-medium text-neutral">Tagline</span>
                <input
                  name="tagline"
                  value={form.tagline}
                  onChange={handleChange}
                  className="input input-bordered rounded-md"
                  required
                />
              </label>

              <label className="form-control">
                <span className="label-text mb-2 font-medium text-neutral">Phone</span>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="input input-bordered rounded-md"
                  required
                />
              </label>

              <label className="form-control">
                <span className="label-text mb-2 font-medium text-neutral">Email</span>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className="input input-bordered rounded-md"
                  required
                />
              </label>

              <label className="form-control lg:col-span-2">
                <span className="label-text mb-2 font-medium text-neutral">Address</span>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  className="input input-bordered rounded-md"
                  required
                />
              </label>

              <label className="form-control">
                <span className="label-text mb-2 font-medium text-neutral">
                  Opening hours
                </span>
                <input
                  name="openingHours"
                  value={form.openingHours}
                  onChange={handleChange}
                  className="input input-bordered rounded-md"
                  required
                />
              </label>

              <label className="form-control">
                <span className="label-text mb-2 font-medium text-neutral">
                  Kitchen hours
                </span>
                <input
                  name="kitchenHours"
                  value={form.kitchenHours}
                  onChange={handleChange}
                  className="input input-bordered rounded-md"
                  required
                />
              </label>

              <label className="form-control">
                <span className="label-text mb-2 font-medium text-neutral">
                  Max reservation guests
                </span>
                <input
                  name="maxReservationGuests"
                  type="number"
                  min="1"
                  max="50"
                  value={form.maxReservationGuests}
                  onChange={handleChange}
                  className="input input-bordered rounded-md"
                  required
                />
              </label>

              <label className="form-control lg:col-span-2">
                <span className="label-text mb-2 font-medium text-neutral">
                  Reservation notice
                </span>
                <textarea
                  name="reservationNotice"
                  value={form.reservationNotice}
                  onChange={handleChange}
                  className="textarea textarea-bordered min-h-28 rounded-md"
                  required
                />
              </label>
            </div>

            <div className="mt-6 flex flex-col gap-3 border-t border-orange-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <LuMapPin className="text-orange-400" />
                <span>{form.address}</span>
              </div>
              <button
                type="submit"
                className="btn border-0 bg-orange-400 text-neutral hover:bg-orange-500"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Settings"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default RestaurantSettings;
