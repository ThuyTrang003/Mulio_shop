import { getReviewsByBase, postReviews } from "../../apis/review-api/review";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetReviewsByBase = (skuBase) => {
    return useQuery({
        queryKey: ["reviewsByBase", skuBase],
        queryFn: () => getReviewsByBase(skuBase),
    });
};

export const usePostReviewsByBase = () => {
    return useMutation({ mutationFn: postReviews });
};
