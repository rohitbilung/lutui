import {
  // keepPreviousData,
  useMutation,
  // useQuery,
  // useQueryClient,
} from "@tanstack/react-query";
import { addToCart, createProduct, loginUser, registerUser } from "../apis";

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
