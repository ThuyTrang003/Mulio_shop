import {
    getProductByBase,
    getProductByColorSize,
} from "../../apis/product-api/product";
import { useQuery } from "@tanstack/react-query";

export const useGetProductByBase = (params) => {
    return useQuery({
        queryKey: ["productByBase", params],
        queryFn: () => getProductByBase(params),
    });
};

export const useGetProductByColorSize = (params) => {
    return useQuery({
        queryKey: ["productByColorSize", params],
        queryFn: () => getProductByColorSize(params),
    });
};
