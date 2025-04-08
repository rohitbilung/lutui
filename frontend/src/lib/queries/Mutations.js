import {
  // keepPreviousData,
  useMutation,
  // useQuery,
  // useQueryClient,
} from "@tanstack/react-query";
import {
  addToCart,
  createProduct,
  loginUser,
  logoutUser,
  registerUser,
  removeAnItemFromCart,
  removeItemsFromCart,
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
