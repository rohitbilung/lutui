import { clsx } from "clsx";

const Spinner = ({
  text = "",
  variant = "inline", // "overlay" | "inline"
  textClassName = "text-sm font-medium text-foreground",
  spinnerClassName,
  wrapperClassName,
  borderWidth = "border-4",
  spinnerColors = "border-t-transparent border-r-pink-500 border-b-transparent border-l-indigo-500",
  sizeClass = "w-6 h-6", // Default small size for button usage
  overlayClassName = "bg-black/40 backdrop-blur-sm",
}) => {
  const isOverlay = variant === "overlay";

  return (
    <div
      className={clsx(
        "flex items-center justify-center",
        isOverlay
          ? ["fixed inset-0 z-50", overlayClassName]
          : wrapperClassName || "w-full h-full"
      )}
    >
      <div className={clsx("relative aspect-square", sizeClass)}>
        {/* Spinner Ring */}
        <div
          className={clsx(
            "absolute inset-0 animate-spin rounded-full border-2",
            borderWidth,
            spinnerColors,
            spinnerClassName
          )}
        />
        {/* Centered Static Text (always in center) */}
        {text && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={textClassName}>{text}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Spinner;
