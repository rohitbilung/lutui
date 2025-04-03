
import { Badge } from "@/components/ui/badge";

const SizeBadges = ({ product, sizeType = "regular", shirtSize = '', onSelect = () => {} }) => {
  return product.sizeType[sizeType].sizes.map((item, idx) => (
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
