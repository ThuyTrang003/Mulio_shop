import {
    addProductToWishList,
    deleteProductToWishList,
    getWishList,
} from "../../apis/wish-list-api/wish-list";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetWishList = () => {
    return useQuery({
        queryKey: ["getWishList"],
        queryFn: getWishList,
    });
};

export const useAddProductToWishList = () => {
    return useMutation({ mutationFn: addProductToWishList });
};

export const useDeleteProductToWishList = () => {
    return useMutation({ mutationFn: deleteProductToWishList });
};
