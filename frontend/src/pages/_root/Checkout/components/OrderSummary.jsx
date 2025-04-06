const products = [
    { name: "Spike Jacket", price: 99, size: "S", quantity: 1 },
    { name: "Argon Sweater", price: 199, size: "M", quantity: 2 },
    { name: "Babydoll Bow Dress", price: 289, size: "XL", quantity: 3 },
  ];
  
  const OrderSummary = () => {
    const subtotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    const shipping = 50;
    const total = subtotal + shipping;
  
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Your Order</h2>
        <table className="w-full text-sm border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 text-left">Product</th>
              <th className="p-2 text-center">Price</th>
              <th className="p-2 text-center">Size</th>
              <th className="p-2 text-center">Qty</th>
              <th className="p-2 text-center">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, i) => (
              <tr key={i} className="border-t">
                <td className="p-2">{item.name}</td>
                <td className="p-2 text-center">${item.price}</td>
                <td className="p-2 text-center">{item.size}</td>
                <td className="p-2 text-center">{item.quantity}</td>
                <td className="p-2 text-center">${item.price * item.quantity}</td>
              </tr>
            ))}
            <tr className="border-t">
              <td colSpan={4} className="p-2 text-right font-medium">Shipping</td>
              <td className="p-2 text-center">${shipping}</td>
            </tr>
            <tr className="border-t font-bold">
              <td colSpan={4} className="p-2 text-right">Total</td>
              <td className="p-2 text-center">${total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };
  
  export default OrderSummary;
  