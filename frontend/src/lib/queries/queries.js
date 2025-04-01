import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "./queryKeys";
import { getCurrentUser } from "../apis";

export const useGetCurrentUser = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CURRENT_USER],
    queryFn: ({ signal }) => getCurrentUser({ signal }),
    refetchOnWindowFocus: false,
  });
};

