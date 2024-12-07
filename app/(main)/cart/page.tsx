"use client";

import { redirect } from "next/navigation";
import React, { useEffect } from "react";

import { useAuthStore } from "@/stores/auth";

import { Cart } from "@/features/cart/components/cart-page";
import PageHeader from "@/features/main/components/page-header";

export default function CartPage() {
    const { token } = useAuthStore();
    useEffect(() => {
        if (token)
            if (token.accessToken === "") {
                redirect("/signin");
            }
    }, [token]);
    return (
        <>
            <PageHeader
                backgroundImage="/banner_shop.png"
                title="Cart"
                breadcrumbItems={[
                    { label: "Trang chủ", href: "/home" },
                    { label: "Giỏ hàng", href: "/cart" },
                ]}
            />
            <div className="px-20">
                <Cart />
            </div>
        </>
    );
}
