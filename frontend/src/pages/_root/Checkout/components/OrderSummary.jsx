import { useCart } from "../../../../context/CartContext";

const OrderSummary = () => {
  const { cart } = useCart();
  const subtotal = cart.reduce((sum, p) => sum + p.price * p.quantity, 0);
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Your Order</h2>

      {/* Desktop Table */}
      <div className="overflow-x-auto hidden md:block">
        <table className="w-full text-sm border border-gray-300 min-w-[600px] table-fixed">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left w-1/7">Product</th>
              <th className="p-2 text-center w-1/14">Qty</th>
              <th className="p-2 text-center w-1/7">Price</th>
              <th className="p-2 text-center w-1/7">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, i) => (
              <tr key={i} className="border-t align-top">
                <td className="p-2 w-1/2">
                  <div className="font-medium">{item.productId?.name || "Unnamed Product"}</div>
                  <div className="text-xs text-gray-500 mt-1 space-y-1">
                    <div className="flex items-center gap-1">
                      <span>Color:</span>
                      <div
                        className="h-4 w-4 rounded-full border border-gray-400"
                        style={{ backgroundColor: item.color }}
                      ></div>
                    </div>
                    <div>Size: {item.size}</div>
                    <div>Type: {item.type}</div>
                  </div>
                </td>
                <td className="p-2 text-center w-1/12">{item.quantity}</td>
                <td className="p-2 text-center w-1/6">₹{item.price}</td>
                <td className="p-2 text-center w-1/6">₹{item.price * item.quantity}</td>
              </tr>
            ))}
            <tr className="border-t">
              <td colSpan={3} className="p-2 text-right font-medium">Shipping</td>
              <td className="p-2 text-center">₹{shipping}</td>
            </tr>
            <tr className="border-t font-bold">
              <td colSpan={3} className="p-2 text-right">Total</td>
              <td className="p-2 text-center">₹{total}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="space-y-4 md:hidden">
        {cart.map((item, i) => (
          <div key={i} className="border rounded p-4 shadow-sm">
            <div className="font-medium">{item.productId?.name || "Unnamed Product"}</div>
            <div className="text-sm text-gray-600 mt-1 space-y-1">
              <div className="flex items-center gap-2">
                <span>Color:</span>
                <div
                  className="h-4 w-4 rounded-full border border-gray-400"
                  style={{ backgroundColor: item.color }}
                ></div>
              </div>
              <div>Size: {item.size}</div>
              <div>Type: {item.type}</div>
            </div>

            <div className="mt-3 text-sm space-y-1">
              <div>Qty: <span className="font-medium">{item.quantity}</span></div>
              <div>Price: ₹{item.price}</div>
              <div className="flex justify-between items-center font-semibold mt-2">
                <span>Subtotal:</span>
                <span className="text-right">₹{item.price * item.quantity}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="text-sm text-right border-t pt-4">
          <div className="mb-1">Shipping: <span className="font-medium">₹{shipping}</span></div>
          <div className="font-bold text-lg">Total: ₹{total}</div>
        </div>
      </div>

    </div>

  );
};

export default OrderSummary;
