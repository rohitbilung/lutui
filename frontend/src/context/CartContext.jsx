import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
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
  const localStorageKey = "lutuiShopCart";
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

  const saveCartToLocalStorage = (cart) => {
    localStorage.setItem(localStorageKey, JSON.stringify(cart));
  };
  const getCartFromLocalStorage = () => {
    try {
      const storedCart = localStorage.getItem(localStorageKey);
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (e) {
      console.error("Failed to get cart from localStorage:", e);
      return [];
    }
  };
  const clearCartFromLocalStorage = () => {
    localStorage.removeItem(localStorageKey);
  };

  useEffect(() => {
    if (!isPending && data) {
      if (data.data) {
        saveCartToLocalStorage(data.data.products || []);
        setCart([...data.data.products]);
      } else {
        saveCartToLocalStorage([]);
        setCart([]);
      }
    }
  }, [data, isPending]);

  useEffect(() => {
    if (!userId) {
      const list = getCartFromLocalStorage();
      setCart([...list]);
    }
  }, [userId]);

  const cartQuantity = useMemo(() => {
    if (cart && cart.length > 0) {
      return cart.reduce((total, item) => total + item.quantity, 0);
    } else {
      return 0;
    }
  }, [cart]);

  const totalPrice = useMemo(() => {
    const sum = cart ? cart.reduce((acc, i) => acc + i.price * i.quantity, 0) : 0;
    return sum;
  }, [cart]);

  const isInCart = (product) => {
    return cart && cart.some(
      (item) =>
        item.productId._id === product.productId._id &&
        item.color === product.color &&
        item.size === product.size &&
        item.type === product.type &&
        item.quantity > 0
    );
  };

  const getItemQuantity = (product) => {
    const item = cart && cart.find(
      (item) =>
        item.productId._id === product.productId._id &&
        item.color === product.color &&
        item.size === product.size &&
        item.type === product.type
    );
    return item ? item.quantity : 0;
  };

  const addToCart = async (item) => {
    if (!user) {
      setCart((prevCart) => {
        console.log("prevCart: ", prevCart, " ; typeof prevCart: ", typeof prevCart)
        const existingIndex = prevCart.findIndex(
          (product) =>
            product.productId._id === item.productId._id &&
            product.type === item.type &&
            product.color === item.color &&
            product.size === item.size
        );

        let updatedCart;
        if (existingIndex !== -1) {
          // Item exists, update quantity
          updatedCart = [...prevCart];
          updatedCart[existingIndex].quantity += 1;
          return updatedCart;
        } else {
          // Item does not exist, add it
          updatedCart = [...prevCart, { ...item, quantity: 1 }];
        }
        saveCartToLocalStorage(updatedCart); // ✅ Save to localStorage
        return updatedCart;
      });
      return;
    }
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
    if (!user) {
      setCart((prevCart) => {
        const updatedCart = prevCart.reduce((acc, item) => {
          const isMatch =
            item.productId._id === product.productId._id &&
            item.type === product.type &&
            item.color === product.color &&
            item.size === product.size;

          if (isMatch) {
            if (item.quantity > 1) {
              acc.push({ ...item, quantity: item.quantity - 1 });
            }
            // If quantity is 1, we skip pushing it = remove
          } else {
            acc.push(item);
          }

          return acc;
        }, []);

        saveCartToLocalStorage(updatedCart); // ✅ Save to localStorage
        return updatedCart;
      });
      return;
    }
    if (cart.length === 0) return;
    if (!user) return;
    const reqObject = {
      userId,
      productId: product.productId._id,
      color: product.color,
      size: product.size,
      type: product.type,
      price: product.price,
      quantity: product.quantity,
    };
    const response = await removeAnItemFromCart({ ...reqObject });
    if (response.success) {
      toast.success(response.message);
      refetch();
    } else {
      toast.error(response.message);
    }
  };

  const removeFromCart = async (product) => {
    if (!user) {
      setCart((prevCart) => {
        const updatedCart = prevCart.filter(
          (item) =>
            !(
              item.productId._id === product.productId._id &&
              item.type === product.type &&
              item.color === product.color &&
              item.size === product.size
            )
        );

        saveCartToLocalStorage(updatedCart); // ✅ Save to localStorage
        return updatedCart;
      });
      return;
    }
    if (cart.length === 0) return;
    if (!user) return;
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
    clearCartFromLocalStorage();
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        isInCart,
        totalPrice,
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
