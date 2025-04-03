import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useGetCart } from "../lib/queries/queries";
import { useAuth } from "./AuthContext";
import { useAddToCart, useRemoveAnItemFromCart, useRemoveItemsFromCart } from "../lib/queries/Mutations";
import { toast } from "sonner";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth();
  const { mutateAsync: addItemToCart, isPending: isAddingToCart } =
    useAddToCart();
  const { mutateAsync: removeItemsFromCart, isPending: isRemoving } = useRemoveItemsFromCart()
  const { mutateAsync: removeAnItemFromCart, isPending: isRemovingAnItem } = useRemoveAnItemFromCart()

  const userId = useMemo(() => {
    if (user) return user._id;
    else return "";
  }, [user]);

  const { data, isPending, refetch } = useGetCart({ userId })

  useEffect(() => {
    if (!isPending && data) {
      if (data.data) {
        setCart([ ...data.data.products ]);
      }
    }
  },[data, isPending])

  const cartQuantity = useMemo(() => {
    if (cart.length > 0) {
      return cart.reduce((total, item) => total + item.quantity, 0);
    } else {
      return 0;
    }
  }, [cart]);

  const isInCart = (_id) => {
    return cart.some((item) => item.productId._id === _id && item.quantity > 0);
  };

  const getItemQuantity = (_id) => {
    const item = cart.find((item) => item.productId._id === _id);
    return item ? item.quantity : 0;
  };

  const addToCart = async (item) => {
    const productExists = cart.find(i => i.productId._id === item.productId._id)
    let updatedCart = [];
    if (productExists) {
      // If product exists, increment quantity
      updatedCart = cart.map(i =>
        i.productId._id === item.productId._id ? { ...i, quantity: i.quantity + 1 } : i
      );
    } else {
      // If product does not exist, add it with quantity = 1
      updatedCart = [...cart, { ...item, quantity: 1 }];
    }
    
    // const reqObject = { ...item, quantity: 1, productId: item.productId._id }
    // // calculate total from all products
    // const totalPrice = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
    // const cartObject = { userId, ...reqObject, totalPrice };
    // const response = await addItemToCart(cartObject)
    // if (response.success) {
    //   toast.success(response.message);
    //   refetch();
    // } else {
    //   toast.error(response.message);
    // }

    setCart([ ...updatedCart ])
  };

  const removeOneFromCart = async (_id) => {
    // Create the updated cart array
    const updatedCart = cart
    .map((item) =>
      item.productId._id === _id
        ? { ...item, quantity: item.quantity - 1 }
        : item
    )
    .filter((item) => item.quantity > 0); // Remove item if quantity becomes 0
    console.log("updatedCart in removeonefromcart: ", updatedCart)

    // const totalPrice = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
    // const response = await removeAnItemFromCart({ userId, productId: _id, totalPrice })
    // if (response.success) {
    //   toast.success(response.message);
    //   refetch();
    // } else {
    //   toast.error(response.message);
    // }

    setCart([ ...updatedCart ]);
  };
  
  const removeFromCart = async (_id) => {
    const updatedCart = cart.filter((item) => item.productId._id !== _id);
    // API call to remove
    console.log("updatedCart in removeFromCart: ", updatedCart)

    // const totalPrice = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);
    // const response = await removeItemsFromCart({ userId, productId: _id, totalPrice })
    // if (response.success) {
    //   toast.success(response.message);
    //   refetch();
    // } else {
    //   toast.error(response.message);
    // }

    setCart([ ...updatedCart ])
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
