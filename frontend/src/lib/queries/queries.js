import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "./queryKeys";
import { getCurrentUser, getProductByID, getProductList } from "../apis";

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

export const useGetProducts = ({ limit, page }) => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_PRODUCT_LIST, limit, page],
    queryFn: ({ signal }) => getProductList({ signal, limit, page }),
    refetchOnWindowFocus: false
  })
}
