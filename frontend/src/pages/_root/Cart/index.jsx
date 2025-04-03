import { useCart } from "../../../context/CartContext";
import PageWrapper from "../../../components/shared/common/layouts/PageWrapper";
import PageContent from "../../../components/shared/common/layouts/PageContent";
import CartItem from "./components/CartItem";
import CartSummary from "./components/CartSummary";

const Cart = () => {
  const { cart } = useCart();
  return (
    <PageWrapper>
      <PageContent title="Your Cart">
        {cart.length > 0 ? (
          <div className="space-y-6">
            {/* Cart Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border p-3 text-left">Product</th>
                    <th className="border p-3">Price</th>
                    <th className="border p-3">Qty</th>
                    <th className="border p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, idx) => (
                    <CartItem key={idx} item={item} />
                  ))}
                </tbody>
              </table>
            </div>

            {/* Cart Summary */}
            <CartSummary />
          </div>
        ) : (
          <p className="text-center text-lg">Your cart is empty.</p>
        )}
      </PageContent>
    </PageWrapper>
  );
};

export default Cart;
