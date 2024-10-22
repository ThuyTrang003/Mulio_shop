// ShopPage.tsx
import React from "react";
import PageHeader from "@/features/main/page-header";

const CheckoutPage: React.FC = () => {
  return (
    <>
      <PageHeader
        backgroundImage="/banner_shop.png"
        title="Checkout"
        breadcrumbItems={[
          { label: "Home", href: "/home" },
          { label: "Checkout", href: "/checkout" },
        ]}
      />
      <div>Welcome to the Shop!</div>
    </>
  );
};

export default CheckoutPage;
