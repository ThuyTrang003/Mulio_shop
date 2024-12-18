"use client";

import { AuthDTO, Signin } from "../utils/auth-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSignin } from "@/hooks/auth-hook/useAuth";

import { useAuthStore } from "@/stores/auth";
import useCartStore from "@/stores/cart-store";

import { ErrorField } from "@/components/error-field";
import { IconInput, RightIcon } from "@/components/icon-input";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SigninForm() {
    const router = useRouter();
    const { setToken, token, setUserId } = useAuthStore();
    const { setCartId } = useCartStore();
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Signin>({
        resolver: zodResolver(AuthDTO.signinSchema),
    });
    const { mutate: signinMutate, isPending } = useSignin();

    const onSubmit = handleSubmit((data) => {
        signinMutate(data, {
            onSuccess: (data) => {
                console.log(data);
                setToken(data.token);
                setCartId(data.cartId);
                setUserId(data.userId);
                toast("Đăng nhập thành công!");
                router.replace("/home");
            },
            onError: () => {
                toast.error("Đăng nhập thất bại!");
            },
        });
    });

    return (
        <form onSubmit={onSubmit}>
            <CardContent className="flex flex-col">
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        {...register("email")}
                        placeholder="Enter your mail address"
                        disabled={isPending}
                    />
                </div>
                {errors.email && (
                    <ErrorField>{errors.email.message}</ErrorField>
                )}

                <div className="space-y-1">
                    <Label htmlFor="password">Password</Label>
                    <IconInput
                        {...register("password")}
                        placeholder="Enter your password"
                        className="pr-10"
                        type={showPassword ? "text" : "password"}
                        disabled={isPending}
                    >
                        <RightIcon>
                            <button
                                className="text-gray-500"
                                type="button"
                                onClick={() => {
                                    setShowPassword(!showPassword);
                                }}
                                disabled={isPending}
                            >
                                {showPassword ? (
                                    <EyeOff size={22} />
                                ) : (
                                    <Eye size={22} />
                                )}
                            </button>
                        </RightIcon>
                    </IconInput>
                </div>
                {errors.password && (
                    <ErrorField>{errors.password.message}</ErrorField>
                )}

                <CardDescription className="flex cursor-pointer justify-end text-black hover:underline">
                    Forgot password ?
                </CardDescription>
            </CardContent>
            <CardContent className="flex flex-col space-y-4">
                <Button variant="secondary" disabled={isPending}>
                    Sign in
                </Button>
            </CardContent>
        </form>
    );
}
