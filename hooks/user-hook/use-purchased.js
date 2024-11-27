import { getCartHistory } from "../../apis/user-api/purchased";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetCartHistory = () => {
    return useQuery({
        queryKey: ["getCartHistory"],
        queryFn: getCartHistory,
    });
};
