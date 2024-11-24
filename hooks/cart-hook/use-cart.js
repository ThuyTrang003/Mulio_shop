import { getCart } from "../../apis/cart-api/cart";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCart = () => {
    return useQuery({
        queryKey: ["getCart"],
        queryFn: getCart,
    });
};
