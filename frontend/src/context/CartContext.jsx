import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const cartQuantity = useMemo(() => {
    if (cart.length > 0) {
      return cart.reduce((total, item) => total + item.qty, 0);
    } else {
      return 0;
    }
  }, [cart]);

  const isInCart = (_id) => {
    return cart.some((item) => item._id === _id && item.qty > 0);
  };

  const getItemQuantity = (_id) => {
    const item = cart.find((item) => item._id === _id);
    return item ? item.qty : 0;
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, qty: 1 }];
      }
    });
  };

  const removeOneFromCart = (_id) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item._id === _id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0); // Remove if quantity becomes 0
    });
  };

  const removeFromCart = (_id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== _id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isInCart,
        getItemQuantity,
        addToCart,
        removeOneFromCart,
        removeFromCart,
        clearCart,
        cartQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
