"use client";

import { logout } from "../../apis/auth-api/logout";
import { useMutation, useQuery } from "@tanstack/react-query";
import {signup, signin, isVerify, loadUser} from "../../apis/auth-api/auth";
import { useAuthStore } from "@/stores/auth";
export const useSignin = () => {
    return useMutation({ mutationFn: signin });
};
export const useSignup = () => {
    return useMutation({ mutationFn: signup });
};

export const useLogout = () => {
    return useMutation({ mutationFn: logout });
};

export const useIsVerify = (params) => {
    return useQuery({
        queryKey: ["isVerify", params],
        queryFn: () => isVerify(params),
    });
};


export const useLoadUser = () => {
    const { token } = useAuthStore();
    return useQuery({
        queryKey: ["loadUser", token],
        queryFn: () => loadUser(token),
        enabled: !!token, // Chỉ chạy nếu token tồn tại
    });
};
