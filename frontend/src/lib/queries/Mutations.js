import {
  // keepPreviousData,
  useMutation,
  useQueryClient,
  // useQuery,
  // useQueryClient,
} from "@tanstack/react-query";
import QUERY_KEYS from "./queryKeys";
import {
  addToCart,
  checkoutCart,
  checkStocks,
  createPayment,
  createProduct,
  loginUser,
  logoutUser,
  registerUser,
  removeAnItemFromCart,
  removeItemsFromCart,
  verifyPayment,
} from "../apis";

export const useLogoutUser = () => {
  return useMutation({
    mutationFn: () => logoutUser(),
  });
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: (data) => loginUser(data),
  });
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: (data) => registerUser(data),
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: (data) => createProduct(data),
  });
};

export const useAddToCart = () => {
  return useMutation({
    mutationFn: (data) => addToCart(data),
  });
};

export const useRemoveItemsFromCart = () => {
  return useMutation({
    mutationFn: (data) => removeItemsFromCart(data),
  });
};

export const useRemoveAnItemFromCart = () => {
  return useMutation({
    mutationFn: (data) => removeAnItemFromCart(data),
  });
};

export const useCreatePayment = () => {
  return useMutation({
    mutationFn: (data) => createPayment(data),
  });
};

export const useVerifyPayment = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => verifyPayment(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.GET_CART_DETAILS] })
    }
  });
};

export const useCheckoutCart = () => {
  return useMutation({
    mutationFn: (data) => checkoutCart(data),
  });
};

export const useCheckStocks = () => {
  return useMutation({
    mutationFn: (data) => checkStocks(data),
  });
};
