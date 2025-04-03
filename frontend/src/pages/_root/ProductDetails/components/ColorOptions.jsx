import clsx from "clsx";
import { useEffect } from "react";

const ColorOptions = ({
  selected,
  setSelected,
  sizeTypeList = [],
  size = "",
}) => {
  const sizeData = sizeTypeList.filter((i) => i.size === size)[0];

  useEffect(() => {
    if (!selected && sizeData) {
      const colorData = sizeData.colors[0] || "";
      setSelected(colorData);
    }
  }, [selected, sizeData]);

  return sizeData.colors.map((item, idx) => (
    <div
      key={idx}
      className={clsx("h-5 w-5 rounded-full border-2", {
        "border-gray-400": !selected || (selected && selected.color !== item.color),
        "border-blue-400": selected && selected.color === item.color,
      })}
      style={{ backgroundColor: item.color }}
      onClick={() => setSelected(item)}
    ></div>
  ));
};

export default ColorOptions;
