"use client";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth-hook/useAuth";
import { useAuthStore } from "@/stores/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function Home() {
  const {setToken, token, resetToken} = useAuthStore();
  const router = useRouter();
  const {mutate: logout}= useLogout();
  // const {data: logout} = useLogout();
  const handleLogout = () => {
    console.log("handle");
    console.log({token});
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

  return (
      <Button onClick={handleLogout}>logout</Button>
  );
}
