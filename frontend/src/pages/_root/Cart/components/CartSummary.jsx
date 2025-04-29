import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { useCart } from "../../../../context/CartContext";
import { useCheckStocks } from "../../../../lib/queries/Mutations";
import { toast } from "sonner";

const CartSummary = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const { mutateAsync: checkStocks, isPending: isCheckingStocks } = useCheckStocks();

  const totalAmount = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const toCheckoutPage = async () => {
    const products = cart.map((item) => {
      return {
        productId: item.productId._id,
        color: item.color,
        size: item.size,
        type: item.type,
        price: item.price,
        quantity: item.quantity,
      };
    });
    const response = await checkStocks({ products });
    if (!response.success) {
      toast.error(response.message)
    } else {
      navigate("/checkout")
    }
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-2">Cart Summary</h3>
      <p className="text-lg">Total Amount: ₹{totalAmount}</p>
      <div className="flex gap-4 mt-4">
        <Button onClick={() => navigate("/shop")} variant="outline">
          ⬅️ Continue Shopping
        </Button>
        <Button
          variant="default"
          className="cursor-pointer"
          onClick={toCheckoutPage}
        >
          <ShoppingCart className="w-5 h-5" />
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default CartSummary;
