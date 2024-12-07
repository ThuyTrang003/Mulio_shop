import { postPassword } from "../../apis/user-api/password";
import { useMutation } from "@tanstack/react-query";

export const usePostPassword = () => {
    return useMutation({ mutationFn: postPassword });
};
