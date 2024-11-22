"use client"
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token } = useAuthStore();
  const router = useRouter();
  // useEffect(() => { 
  //   if (token)
  //         if (token !== "" ) {
  //             router.replace("/"); // Chuyển hướng nếu đã login
  //         }
  // }, [token]);

  return (
    <main className="bg-white flex justify-between h-screen w-screen">
      <section className="w-1/2 h-screen">{children}</section>
      <div className=" m-2 bg-black w-1/2 rounded-xl"></div>
    </main>
  );
}
