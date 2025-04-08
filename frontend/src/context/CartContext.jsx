import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useGetCart } from "../lib/queries/queries";
import { useAuth } from "./AuthContext";
import {
  useAddToCart,
  useRemoveAnItemFromCart,
  useRemoveItemsFromCart,
} from "../lib/queries/Mutations";
import { toast } from "sonner";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const { mutateAsync: addItemToCart, isPending: isAddingToCart } =
    useAddToCart();
  const { mutateAsync: removeItemsFromCart, isPending: isRemoving } =
    useRemoveItemsFromCart();
  const { mutateAsync: removeAnItemFromCart, isPending: isRemovingAnItem } =
    useRemoveAnItemFromCart();

  const userId = useMemo(() => {
    if (user) return user._id;
    else return "";
  }, [user]);

  const { data, isPending, refetch } = useGetCart({ userId });

  useEffect(() => {
    if (!isPending && data) {
      if (data.data) {
        setCart([...data.data.products]);
      } else {
        setCart([]);
      }
    }
  }, [data, isPending]);

  const cartQuantity = useMemo(() => {
    if (cart.length > 0) {
      return cart.reduce((total, item) => total + item.quantity, 0);
    } else {
      return 0;
    }
  }, [cart]);

  const isInCart = (product) => {
    return cart.some((item) => 
      item.productId._id === product.productId._id &&
      item.color === product.color &&
      item.size === product.size &&
      item.type === product.type &&
      item.quantity > 0
    );
  };

  const getItemQuantity = (product) => {
    const item = cart.find((item) =>
      item.productId._id === product.productId._id &&
      item.color === product.color &&
      item.size === product.size &&
      item.type === product.type
    );
    return item ? item.quantity : 0;
  };

  const addToCart = async (item) => {
    const reqObject = { ...item, quantity: 1, productId: item.productId._id };
    // calculate total from all products
    const totalPrice =
      cart.reduce((acc, i) => acc + i.price * i.quantity, 0) + reqObject.price;
    const cartObject = { userId, ...reqObject, totalPrice };
    const response = await addItemToCart(cartObject);
    if (response.success) {
      toast.success(response.message);
      refetch();
    } else {
      toast.error(response.message);
    }
  };

  const removeOneFromCart = async (product) => {
    const reqObject = {
      userId,
      productId: product.productId._id,
      color: product.color,
      size: product.size,
      type: product.type,
      price: product.price,
      quantity: product.quantity,
    };
    const response = await removeAnItemFromCart({ ...reqObject })
    if (response.success) {
      toast.success(response.message);
      refetch();
    } else {
      toast.error(response.message);
    }
  };

  const removeFromCart = async (product) => {
    const reqObject = {
      userId,
      productId: product.productId._id,
      color: product.color,
      size: product.size,
      type: product.type,
      price: product.price,
      quantity: product.quantity,
    };
    const response = await removeItemsFromCart({ ...reqObject });
    if (response.success) {
      toast.success(response.message);
      refetch();
    } else {
      toast.error(response.message);
    }
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
