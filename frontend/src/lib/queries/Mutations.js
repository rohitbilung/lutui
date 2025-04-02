import {
  // keepPreviousData,
  useMutation,
  // useQuery,
  // useQueryClient,
} from "@tanstack/react-query";
import { createProduct, loginUser, registerUser } from "../apis";

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
