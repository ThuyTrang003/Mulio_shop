"use client";

import { redirect } from "next/navigation";
import React, { useEffect } from "react";

import { useAuthStore } from "@/stores/auth";

import PageHeader from "@/features/layout/page-header";
import { WishList } from "@/features/wish-list/components";

export default function WishListPage() {
    const { token } = useAuthStore();
    useEffect(() => {
        if (token)
            if (token.accessToken === "") {
                redirect("/signin"); // Chuyển hướng nếu đã login
            }
    }, [token]);
    console.log(token);
    return (
        <>
            <PageHeader
                backgroundImage="/banner_shop.png"
                title="Yêu thích"
                breadcrumbItems={[
                    { label: "Trang chủ", href: "/home" },
                    { label: "Yêu thích", href: "/favorites" },
                ]}
            />
            <div className="px-20 py-10">
                <WishList />
            </div>
        </>
    );
}
