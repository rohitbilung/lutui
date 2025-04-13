import clsx from "clsx";
import { Separator } from "@/components/ui/separator";

const PageContent = ({
  title,
  children,
  contentClass = "",
  wrapperClass = "", // Accept custom classes like padding/margin
}) => {
  return (
    <div
      className={clsx(
        "w-full flex flex-col gap-2 items-center", // Always applied
        {
          "px-4 md:px-16 py-4 md:py-10": !wrapperClass || wrapperClass === "",
        },
        wrapperClass
      )}
    >
      {title && (
        <>
          <h1 className="text-3xl text-center font-bold">{title}</h1>
          <Separator className="my-4" />
        </>
      )}
      <div className={clsx("w-full min-h-[200px]", contentClass)}>
        {children}
      </div>
    </div>
  );
};

export default PageContent;
