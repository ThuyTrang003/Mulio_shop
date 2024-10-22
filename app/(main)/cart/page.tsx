// ShopPage.tsx
import React from "react";
import PageHeader from "@/features/main/page-header";

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
      <div>Welcome to the Shop!</div>
    </>
  );
};

export default CartPage;
