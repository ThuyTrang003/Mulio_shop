"use client";

import { useAuthStore } from "@/stores/auth";

import Footer from "@/features/layout/footer";
import Navbar from "@/features/layout/nav-bar";

export default function MainLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { setToken, token } = useAuthStore();
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar /> {/* Navbar sẽ hiển thị ở tất cả các trang */}
            <main className="mt-16 flex-1">{children}</main>{" "}
            {/* Nội dung động của từng trang */}
            <Footer /> {/* Footer sẽ hiển thị ở tất cả các trang */}
        </div>
    );
}
