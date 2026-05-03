const AdminPageHeader = ({ title, eyebrow, description, action }) => {
  return (
    <div className="flex flex-col gap-4 border-b border-orange-200 pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-sm font-semibold uppercase text-orange-400">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="mt-2 text-3xl font-bold uppercase text-neutral md:text-4xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            {description}
          </p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
};

export default AdminPageHeader;
