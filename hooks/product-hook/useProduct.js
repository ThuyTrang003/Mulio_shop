import { getProductByBase } from "../../apis/product-api/product";

export const useGetProductByBase = (params) => {
    return useQuery({
        queryKey: ["productByBase", params],
        queryFn: () => getProductByBase(params),
    });
};
