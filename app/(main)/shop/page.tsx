"use client"
import React from "react";
import PageHeader from "@/features/main/components/page-header";
import ProductSection from "@/features/main/components/product-section";

const ShopPage: React.FC = () => {
  const featureProducts = [
    { id: "1", category: "shirt", image: "/cardigan/c-1.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Xanh đậm" },
    { id: "2", category: "shirt", image: "/cardigan/c-2.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Xám" },
    { id: "3", category: "shirt", image: "/cardigan/c-3.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Đen" },
    { id: "4", category: "shirt", image: "/cardigan/c-4.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Xanh" },
    { id: "1", category: "pants", image: "/cardigan/c-1.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Xanh đậm" },
    { id: "2", category: "pants", image: "/cardigan/c-2.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Xám" },
    { id: "3", category: "pants", image: "/cardigan/c-3.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Đen" },
    { id: "4", category: "pants", image: "/cardigan/c-4.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Xanh" },
    { id: "1", category: "accessories", image: "/cardigan/c-1.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Xanh đậm" },
    { id: "2", category: "accessories", image: "/cardigan/c-2.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Xám" },
    { id: "3", category: "accessories", image: "/cardigan/c-3.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Đen" },
    { id: "4", category: "accessories", image: "/cardigan/c-4.png", name: "Áo Cardigan", price: "300.000 VNĐ", description: "Xanh" },
    
    // Thêm các sản phẩm cho các category "pants" và "accessories" tương tự
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

      <ProductSection title="Áo" products={featureProducts.filter(p => p.category === "shirt")} />
      <ProductSection title="Quần" products={featureProducts.filter(p => p.category === "pants")} />
      <ProductSection title="Phụ kiện" products={featureProducts.filter(p => p.category === "accessories")} />
    </>
  );
};

export default ShopPage;
