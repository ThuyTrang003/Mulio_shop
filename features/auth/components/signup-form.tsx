"use client";

import { AuthDTO, Signup } from "../utils/auth-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useSignup } from "@/hooks/auth-hook/useAuth";

import { ErrorField } from "@/components/error-field";
import { IconInput, RightIcon } from "@/components/icon-input";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmPass, setShowconfirmPass] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Signup>({
        resolver: zodResolver(AuthDTO.signupSchema),
    });
    const { mutate: signupMutate, isPending } = useSignup();
    const router = useRouter();
    const onSubmit = handleSubmit((data) => {
        console.log(data);
        signupMutate(data, {
            onSuccess: (resp) => {
                toast(
                    "Đăng ký thành công, vui lòng xác thực qua thư được gửi qua email",
                );
            },
            onError: (resp) => {
                console.log(resp);
                toast.error("Signup failed: " + resp.message);
            },
        });
    });

    return (
        <form onSubmit={onSubmit}>
            <CardContent className="flex flex-col">
                <div className="space-y-1">
                    <Label htmlFor="username">Họ và tên</Label>
                    <Input
                        {...register("username")}
                        placeholder="Nhập họ và tên"
                        disabled={isPending}
                    />
                </div>
                {errors.username && (
                    <ErrorField>{errors.username.message}</ErrorField>
                )}

                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        {...register("email")}
                        placeholder="Nhập địa chỉ email"
                        disabled={isPending}
                    />
                </div>
                {errors.email && (
                    <ErrorField>{errors.email.message}</ErrorField>
                )}

                <div className="space-y-1">
                    <Label htmlFor="password">Mật khẩu</Label>
                    <IconInput
                        {...register("password")}
                        placeholder="Nhập mật khẩu"
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

                <div className="space-y-1">
                    <Label htmlFor="confirmPassword">Xác nhận mật khẩu</Label>
                    <IconInput
                        {...register("confirmPassword")}
                        placeholder="Nhập lại mật khẩu"
                        className="pr-10"
                        type={showconfirmPass ? "text" : "password"}
                        disabled={isPending}
                    >
                        <RightIcon>
                            <button
                                className="text-gray-500"
                                type="button"
                                onClick={() => {
                                    setShowconfirmPass(!showconfirmPass);
                                }}
                                disabled={isPending}
                            >
                                {showconfirmPass ? (
                                    <EyeOff size={22} />
                                ) : (
                                    <Eye size={22} />
                                )}
                            </button>
                        </RightIcon>
                    </IconInput>
                </div>
                {errors.confirmPassword && (
                    <ErrorField>{errors.confirmPassword.message}</ErrorField>
                )}
            </CardContent>
            <CardContent className="flex flex-col space-y-4">
                <Button disabled={isPending} variant="secondary">
                    Đăng ký
                </Button>
            </CardContent>
        </form>
    );
}
