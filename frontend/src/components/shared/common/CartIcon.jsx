import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../../context/CartContext";

const CartIcon = () => {
  const { cartQuantity } = useCart();
  return (
    <div className="relative">
      <Link to="/cart" className="relative" title="Go to Cart">
        <ShoppingBag className="w-6 h-6" />
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          {cartQuantity}
        </span>
      </Link>
    </div>
  );
};

export default CartIcon;
