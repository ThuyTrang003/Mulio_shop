import { getReviewsByBase } from "../../apis/review-api/review";
import { useQuery } from "@tanstack/react-query";

export const useGetReviewsByBase = (skuBase) => {
    return useQuery({
        queryKey: ["reviewsByBase", skuBase],
        queryFn: () => getReviewsByBase(skuBase),
    });
};
