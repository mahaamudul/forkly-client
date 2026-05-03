const AdminEmptyState = ({ title, description }) => {
  return (
    <div className="rounded-lg border border-dashed border-orange-200 bg-orange-50 p-8 text-center">
      <h3 className="text-xl font-semibold text-neutral">{title}</h3>
      {description ? (
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-600">
          {description}
        </p>
      ) : null}
    </div>
  );
};

export default AdminEmptyState;
