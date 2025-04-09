import { useCart } from "../../../../context/CartContext";

const OrderSummary = () => {
  const { cart } = useCart();
  const subtotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Order</h2>
      <table className="w-full text-sm border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 text-left">Product</th>
            <th className="p-2 text-center">Color</th>
            <th className="p-2 text-center">Size</th>
            <th className="p-2 text-center">Type</th>
            <th className="p-2 text-center">Price</th>
            <th className="p-2 text-center">Qty</th>
            <th className="p-2 text-center">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">
                {item.productId?.name || "Unnamed Product"}
              </td>
              <td className="p-2 text-center flex items-center justify-center">
                <div
                  className="h-5 w-5 rounded-full border-gray-400 "
                  style={{ backgroundColor: item.color }}
                ></div>
              </td>
              <td className="p-2 text-center">{item.size}</td>
              <td className="p-2 text-center">{item.type}</td>
              <td className="p-2 text-center">₹{item.price}</td>
              <td className="p-2 text-center">{item.quantity}</td>
              <td className="p-2 text-center">₹{item.price * item.quantity}</td>
            </tr>
          ))}
          <tr className="border-t">
            <td colSpan={6} className="p-2 text-right font-medium">
              Shipping
            </td>
            <td className="p-2 text-center">₹{shipping}</td>
          </tr>
          <tr className="border-t font-bold">
            <td colSpan={6} className="p-2 text-right">
              Total
            </td>
            <td className="p-2 text-center">₹{total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderSummary;
