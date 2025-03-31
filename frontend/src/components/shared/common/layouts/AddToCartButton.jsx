import { EyeIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import { useCart } from "../../../../context/CartContext";

const AddToCartButton = ({ product, btnVariant = 'secondary', showViewButton = false }) => {
  const navigate = useNavigate();
  const { addToCart, removeOneFromCart, isInCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product._id);

  const visitProductDetails = () => {
    navigate(`/product/${product._id}`);
  };

  return (
    <div className="w-full flex items-center gap-1">
      {isInCart(product._id) ? (
        <div className="flex flex-1 justify-between gap-2">
          <Button
            onClick={() => removeOneFromCart(product._id)}
            variant={btnVariant}
          >
            <MinusIcon />
          </Button>
          <div className="text-lg font-semibold bg-white border w-full flex items-center justify-center cursor-not-allowed">
            <span>{quantity}</span>
          </div>
          <Button onClick={() => addToCart(product)} variant={btnVariant}>
            <PlusIcon />
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => addToCart(product)}
          variant={btnVariant}
          className="flex-1"
        >
          ADD TO CART
        </Button>
      )}

      {showViewButton && (
        <Button
          variant="blue"
          className="cursor-pointer"
          onClick={visitProductDetails}
          title="View product details"
        >
          <EyeIcon />
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
