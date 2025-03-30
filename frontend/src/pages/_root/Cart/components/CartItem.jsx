import { Button } from "../../../../components/ui/button";
import { useCart } from "../../../../context/CartContext";

const CartItem = ({ item }) => {
  const { addToCart, removeOneFromCart, removeFromCart } = useCart();
  const itemTotal = item.price * item.qty;

  return (
    <tr className="border">
      <td className="border p-3">{item.name}</td>
      <td className="border p-3 text-center">₹{item.price}</td>
      <td className="border p-3 text-center">
        <div className="flex items-center justify-center gap-2">
          <Button
            onClick={() => removeOneFromCart(item._id)}
            variant="outline"
            className="w-8"
          >
            ➖
          </Button>
          <span>{item.qty}</span>
          <Button
            onClick={() => addToCart(item)}
            variant="outline"
            className="w-8"
          >
            ➕
          </Button>
        </div>
      </td>
      <td className="border p-3 flex justify-center items-center">
        <span className="w-28 flex flex-row items-center justify-between">
          <span>₹{itemTotal}</span>
          <Button
            variant="ghost"
            onClick={() => removeFromCart(item._id)}
            title="Remove Product"
          >
            ❌
          </Button>
        </span>
      </td>
    </tr>
  );
};

export default CartItem;
