import { getWishList } from "../../apis/wish-list-api/wish-list";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCart = (userId) => {
    return useQuery({
        queryKey: ["getWishList", userId],
        queryFn: () => getWishList(userId),
    });
};
