import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { useCart } from "../../../../context/CartContext";

const CartSummary = () => {
  const { cart } = useCart();
  const navigate = useNavigate();

  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-4 border rounded-lg shadow-sm">
      <h3 className="text-xl font-semibold mb-2">Cart Summary</h3>
      <p className="text-lg">Total Amount: ₹{totalAmount}</p>
      <div className="flex gap-4 mt-4">
        <Button onClick={() => navigate("/shop")} variant="outline">
          ⬅️ Continue Shopping
        </Button>
        <Button variant="primary">Proceed to Checkout</Button>
      </div>
    </div>
  );
};

export default CartSummary;
