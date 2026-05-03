const AdminMetricCard = ({ label, value, icon }) => {
  return (
    <div className="rounded-lg border border-orange-200 bg-base-100 p-5 text-neutral shadow-sm">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-orange-400 text-xl text-neutral">
        {icon}
      </div>
      <p className="text-3xl font-bold">{value}</p>
      <p className="mt-1 text-sm uppercase tracking-[0.16em] text-slate-500">
        {label}
      </p>
    </div>
  );
};

export default AdminMetricCard;
