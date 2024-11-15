// ShopPage.tsx
import React from "react";
import PageHeader from "@/features/main/components/page-header";

export default function CartPage() {
  return (
    <>
      <PageHeader
        backgroundImage="/banner_shop.png"
        title="Giỏ hàng"
        breadcrumbItems={[
          { label: "Trang chủ", href: "/home" },
          { label: "Giỏ hàng", href: "/cart" },
        ]}
      />
      <div>Welcome to the Shop!</div>
    </>
  );
};