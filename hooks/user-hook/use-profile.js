import { getInfo, updateInfo } from "../../apis/user-api/account";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useGetInfo = () => {
    return useQuery({
        queryKey: ["getInfo"],
        queryFn: getInfo,
    });
};

export const useUpdateInfo = () => {
    return useMutation({ mutationFn: updateInfo });
};
