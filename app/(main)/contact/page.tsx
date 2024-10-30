// ShopPage.tsx
import React from "react";
import PageHeader from "@/features/main/components/page-header";

const ContactPage: React.FC = () => {
  return (
    <>
      <PageHeader
        backgroundImage="/banner_shop.png"
        title="Contact"
        breadcrumbItems={[
          { label: "Home", href: "/home" },
          { label: "Contact", href: "/contact" },
        ]}
      />
      <div>Welcome to the Shop!</div>
    </>
  );
};

export default ContactPage;
