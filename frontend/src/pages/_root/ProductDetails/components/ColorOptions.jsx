import clsx from "clsx";
import { useEffect } from "react";

const ColorOptions = ({
  selected,
  setSelected,
  sizeTypeList = [],
  size = "",
}) => {
  const sizeData = sizeTypeList.find((i) => i.size === size);
  const availableColors = sizeData?.colors?.filter((color) => color.count > 0) || [];

  useEffect(() => {
    if (!selected && availableColors.length > 0) {
      setSelected(availableColors[0]);
    }
  }, [selected, availableColors]);

  if (availableColors.length === 0) {
    return <div className="text-sm text-gray-500">No colors available</div>;
  }

  return availableColors.map((item, idx) => (
    <div
      key={idx}
      className={clsx("h-5 w-5 rounded-full border-2 cursor-pointer", {
        "border-gray-400": !selected || (selected && selected.color !== item.color),
        "border-blue-400": selected && selected.color === item.color,
      })}
      style={{ backgroundColor: item.color }}
      onClick={() => setSelected(item)}
    ></div>
  ));
};

export default ColorOptions;