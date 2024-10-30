"use client"
import React from "react";
import PageHeader from "@/features/main/components/page-header";
import ProductSection from "@/features/main/components/product-section";

const ShopPage: React.FC = () => {
  // Sample data for each product
  const featureProducts = [
    { image: "/cardigan/c-1.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Xanh đậm" },
    { image: "/cardigan/c-2.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Xám" },
    { image: "/cardigan/c-3.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Đen" },
    { image: "/cardigan/c-4.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Xanh" },
    { image: "/cardigan/c-1.png", name: "Áo Cardigan", price: "350.000 VNĐ", description: "Đỏ" },
    { image: "/cardigan/c-2.png", name: "Áo Cardigan", price: "350.000 VNĐ", description: "Tím" },
    { image: "/cardigan/c-3.png", name: "Áo Cardigan", price: "350.000 VNĐ", description: "Vàng" },
    { image: "/cardigan/c-4.png", name: "Áo Cardigan", price: "350.000 VNĐ", description: "Xanh lá" },
    { image: "/cardigan/c-3.png", name: "Áo Cardigan", price: "350.000 VNĐ", description: "Vàng" },
    { image: "/cardigan/c-4.png", name: "Áo Cardigan", price: "350.000 VNĐ", description: "Xanh lá" },
  ];

  return (
    <>
      <PageHeader
        backgroundImage="/banner_shop.png"
        title="Sản phẩm"
        breadcrumbItems={[
          { label: "Trang chủ", href: "/home" },
          { label: "Sản phẩm", href: "/shop" },
        ]}
      />

      <ProductSection title="Áo" products={featureProducts} />
      <ProductSection title="Quần" products={featureProducts} />
      <ProductSection title="Phụ kiện" products={featureProducts} />
    </>
  );
};

export default ShopPage;
