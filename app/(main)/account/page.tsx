import MainLayout from "../layout";
import React from "react";

import Profilelayout from "@/features/account/layout/accountLayout";
import PageHeader from "@/features/layout/page-header";

export default function ProfilePage() {
    return (
        <div>
            <PageHeader
                backgroundImage="/banner_shop.png"
                title="Tài khoản của tôi"
                breadcrumbItems={[
                    { label: "Trang chủ", href: "/home" },
                    { label: "Tài khoản của tôi", href: "/account" },
                ]}
            />
            <Profilelayout />
        </div>
    );
}
