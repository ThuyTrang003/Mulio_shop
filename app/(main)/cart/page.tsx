// ShopPage.tsx
import React from "react";
import PageHeader from "@/features/main/components/page-header";

import { Cart } from "@/features/cart/components/cart-page";
// import PageHeader from "@/features/layout/page-header";

export default function CartPage (){
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
};