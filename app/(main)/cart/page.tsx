// ShopPage.tsx
import React from "react";

import { Cart } from "@/features/cart/components/cart-page";
import PageHeader from "@/features/layout/page-header";

const CartPage: React.FC = () => {
    return (
        <>
            <PageHeader
                backgroundImage="/banner_shop.png"
                title="Cart"
                breadcrumbItems={[
                    { label: "Home", href: "/home" },
                    { label: "Cart", href: "/cart" },
                ]}
            />
            <div className="px-20">
                <Cart />
            </div>
        </>
    );
};

export default CartPage;
