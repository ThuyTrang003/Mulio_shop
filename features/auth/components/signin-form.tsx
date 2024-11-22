"use client";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";

import { IconInput, RightIcon } from "@/components/icon-input";
import { CardContent, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { AuthDTO, Signin } from "../utils/auth-validate";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorField } from "@/components/error-field";
import { useSignin } from "@/hooks/auth-hook/useAuth";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth";
import { redirect, useRouter } from "next/navigation";

export function SigninForm() {
  const router = useRouter();
  const { setToken, token} = useAuthStore();
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
        setToken(data.token);
        toast("Signin successfully!");
        router.replace("/home");
      },
      onError: () => {
          toast.error("Signin failed!");
      },

      })
  });
  console.log(token)


  return (
    <form onSubmit={onSubmit}>
      <CardContent className="flex flex-col">
        <div className=" space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input {...register("email")} placeholder="Enter your mail address" disabled={isPending}/>
        </div>
        {errors.email && <ErrorField>{errors.email.message}</ErrorField>}

        <div className=" space-y-1">
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
                className=" text-gray-500"
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                disabled={isPending}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </RightIcon>
          </IconInput>
        </div>
        {errors.password && <ErrorField>{errors.password.message}</ErrorField>}

        <CardDescription className="hover:underline flex justify-end cursor-pointer text-black">
          Forgot password ?
        </CardDescription>
      </CardContent>
      <CardContent className="flex flex-col space-y-4 ">
        <Button variant="secondary" disabled={isPending}>Sign in</Button>
      </CardContent>
    </form>
  );
}
