import { EyeIcon, MinusIcon, PlusIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../ui/button";
import { useCart } from "../../../../context/CartContext";
import { useAuth } from "../../../../context/AuthContext";
import { toast } from "sonner";

const AddToCartButton = ({
  product,
  btnVariant = "secondary",
  showViewButton = false,
  disabled = false,
}) => {
  const navigate = useNavigate();
  const { addToCart, removeOneFromCart, isInCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product);

  const { user } = useAuth();

  const visitProductDetails = () => {
    navigate(`/product/${product._id}`);
  };

  const addItemToCart = (product) => {
    const itemObject = { ...product, quantity: quantity + 1 };
    addToCart(itemObject);
  };

  return (
    <div className="w-full flex items-center gap-1">
      {isInCart(product) ? (
        <div className="flex flex-1 justify-between gap-2">
          <Button
            disabled={disabled}
            onClick={() => removeOneFromCart(product)}
            variant={btnVariant}
          >
            <MinusIcon />
          </Button>
          <div className="text-lg font-semibold bg-white border w-full flex items-center justify-center cursor-not-allowed">
            <span>{quantity}</span>
          </div>
          <Button
            disabled={disabled}
            onClick={() => addItemToCart(product)}
            variant={btnVariant}
          >
            <PlusIcon />
          </Button>
        </div>
      ) : (
        <Button
          onClick={() => {
            if (!user) {
              toast.error("Please log in to proceed to checkout.");
              navigate("/login");
            } else {
              addItemToCart(product);
            }
          }}
          variant={btnVariant}
          disabled={disabled}
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
