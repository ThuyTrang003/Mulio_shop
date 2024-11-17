"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useLogout } from "@/hooks/auth-hook/useAuth";

import { useAuthStore } from "@/stores/auth";

import { Button } from "@/components/ui/button";

export default function Home() {
    const { setToken, token, resetToken } = useAuthStore();
    const router = useRouter();
    const { mutate: logout } = useLogout();
    // const {data: logout} = useLogout();
    const handleLogout = () => {
        console.log("handle");
        console.log({ token });
        logout(undefined, {
            onSuccess: () => {
                toast.success("Logout successfully!");
                router.push("/");
                resetToken();
            },
            onError: () => {
                toast("Logout failed!");
            },
        });
    };
    //   useEffect(() => {
    //     if ()
    //     isAuthorization(undefined, {
    //         onSuccess: (res) => {
    //             toast.success("Authorized");
    //             setUserAccount(res.user_id, res.role);
    //             //UI cho user đã login
    //         },
    //         onError: () => {
    //             toast.error("Unauthorized");
    //             resetUserAccount();
    //             //UI cho user chưa login
    //         },
    //     });
    // }, []);

    return <Button onClick={handleLogout}>logout</Button>;
}
