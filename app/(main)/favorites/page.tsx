import MainLayout from "../layout";
import React from "react";

import PageHeader from "@/features/layout/page-header";
import { WishList } from "@/features/wish-list/components";

export default function WishListPage() {
    return (
        <>
            <PageHeader
                backgroundImage="/banner_shop.png"
                title="Cart"
                breadcrumbItems={[
                    { label: "Home", href: "/home" },
                    { label: "Favorites", href: "/favorites" },
                ]}
            />
            <div className="px-20 py-10">
                <WishList />
            </div>
        </>
    );
}
