import { Button } from "../../../ui/button";
import { useCart } from "../../../../context/CartContext";

const AddToCartButton = ({ product }) => {
  const { addToCart, removeOneFromCart, isInCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product._id);

  return (
    <div className="w-full flex items-center gap-2">
      {isInCart(product._id) ? (
        <div className="w-full flex justify-between gap-2">
          <Button
            onClick={() => removeOneFromCart(product._id)}
            variant="secondary"
          >
            ➖
          </Button>
          <div className="text-lg font-semibold bg-white w-full flex items-center justify-center cursor-not-allowed">
            <span>{quantity}</span>
          </div>
          <Button onClick={() => addToCart(product)} variant="secondary">
            ➕
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => addToCart(product)}
          className="w-full"
          variant="secondary"
        >
          ADD TO CART
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
