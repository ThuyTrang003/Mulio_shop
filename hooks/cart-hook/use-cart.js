import {
    addProductToCart,
    deleteProductToCart,
    getCart,
    updateProductToCart,
} from "../../apis/cart-api/cart";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCart = () => {
    return useQuery({
        queryKey: ["getCart"],
        queryFn: getCart,
    });
};

export const useAddProductToCart = () => {
    return useMutation({ mutationFn: addProductToCart });
};

export const useUpdateProductToCart = () => {
    return useMutation({ mutationFn: updateProductToCart });
};

export const useDeleteProductToCart = () => {
    return useMutation({ mutationFn: deleteProductToCart });
};
