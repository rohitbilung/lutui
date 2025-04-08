import { Badge } from "@/components/ui/badge";

const SizeBadges = ({ product, sizeType = "regular", shirtSize = '', onSelect = () => {} }) => {
  const availableSizes = product.sizeType[sizeType].sizes.filter(sizeObj =>
    sizeObj.colors.some(color => color.count > 0)
  );

  return availableSizes.map((item, idx) => (
    <Badge
      key={idx}
      className="rounded-xl cursor-pointer"
      variant={shirtSize === item.size ? "default" : "secondary"}
      onClick={() => onSelect(item.size)}
    >
      {item.size}
    </Badge>
  ));
};

export default SizeBadges;
