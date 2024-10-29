"use client";

// import { logout } from "../../apis/auth-api/auth";
import { useMutation, useQuery } from "@tanstack/react-query";
import {signup, signin} from "../../apis/auth-api/signin-signup";

export const useSignin = () => {
    return useMutation({ mutationFn: signin });
};
export const useSignup = () => {
    return useMutation({ mutationFn: signup });
};
// export const useLogout = () => {
//     return useQuery({ queryKey: ["logout"], queryFn: logout });
// };
