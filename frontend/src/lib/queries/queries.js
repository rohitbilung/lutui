import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "./queryKeys";
import {
  getCart,
  getCurrentUser,
  getProductByID,
  getProductList,
} from "../apis";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: ({ signal }) => getCurrentUser({ signal }),
    refetchOnWindowFocus: false,
  });
};

export const useGetProductByID = ({ productId }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_BY_ID, productId],
    queryFn: ({ signal }) => getProductByID({ signal, productId }),
    refetchOnWindowFocus: false,
  });
};

export const useGetProducts = ({ limit, page, category='' }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_LIST, limit, page, category],
    queryFn: ({ signal }) => getProductList({ signal, limit, page, category }),
    refetchOnWindowFocus: false,
  });
};

export const useGetCart = ({ userId }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CART_DETAILS, userId],
    queryFn: ({ signal }) => getCart({ signal, userId }),
    refetchOnWindowFocus: false,
    enabled: !!userId, // Prevent query from running if userId is missing
  });
};
