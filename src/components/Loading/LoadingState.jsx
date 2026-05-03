const LoadingIcon = ({ size = "md" }) => {
  const sizeClass = size === "sm" ? "h-8 w-8" : "h-12 w-12";

  return (
    <span className={`relative inline-flex ${sizeClass}`} aria-hidden="true">
      <span className="absolute inset-0 rounded-full border-2 border-orange-100" />
      <span className="absolute inset-0 rounded-full border-2 border-transparent border-t-orange-400 border-r-orange-400 animate-spin" />
      <span className="absolute inset-[30%] rounded-full bg-neutral" />
    </span>
  );
};

const LoadingState = ({
  label = "Loading data",
  description,
  variant = "section",
  className = "",
}) => {
  const isPage = variant === "page";
  const isInline = variant === "inline";

  const wrapperClass = isPage
    ? "flex min-h-[55vh] items-center justify-center"
    : isInline
      ? "flex items-center justify-center py-3"
      : "flex items-center justify-center rounded-lg border border-orange-200 bg-base-100 p-8 shadow-sm";

  return (
    <div
      className={`${wrapperClass} ${className}`}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3 text-center">
        <LoadingIcon size={isInline ? "sm" : "md"} />
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-neutral">
            {label}
          </p>
          {description ? (
            <p className="mt-1 max-w-sm text-sm leading-6 text-slate-500">
              {description}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export const TableLoadingRow = ({ colSpan, label = "Loading data" }) => (
  <tr>
    <td colSpan={colSpan} className="py-6">
      <LoadingState label={label} variant="inline" />
    </td>
  </tr>
);

export default LoadingState;
