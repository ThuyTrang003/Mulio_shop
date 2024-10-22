"use client"
import React, { useState } from "react";
import PageHeader from "@/features/main/page-header";
import FeatureProduct from "@/features/main/feature-product";
import { Button } from "@/components/ui/button";

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
  ];

  // State to manage how many products are displayed
  const [visibleProducts, setVisibleProducts] = useState(4);

  // Function to handle 'Xem thêm' button click
  const handleShowMore = () => {
    setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 4);
  };

  return (
    <>
      <PageHeader
        backgroundImage="/banner_shop.png"
        title="Shop"
        breadcrumbItems={[
          { label: "Home", href: "/home" },
          { label: "Shop", href: "/shop" },
        ]}
      />

      <section className="mx-14 my-10 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-black">Áo</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {featureProducts.slice(0, visibleProducts).map((product, index) => (
            <FeatureProduct
              key={index}
              image={product.image}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
        {visibleProducts < featureProducts.length && (
          <Button size="sm" variant="outline" onClick={handleShowMore}>
            Xem thêm
          </Button>
        )}
      </section>

      {/* Tương tự với phần Quần */}
      <section className="mx-14 my-10 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-black">Quần</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {featureProducts.slice(0, visibleProducts).map((product, index) => (
            <FeatureProduct
              key={index}
              image={product.image}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
        {visibleProducts < featureProducts.length && (
          <Button size="sm" variant="outline" onClick={handleShowMore}>
            Xem thêm
          </Button>
        )}
      </section>

      {/* Tương tự với phần Phụ kiện */}
      <section className="mx-14 my-10 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-black">Phụ kiện</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {featureProducts.slice(0, visibleProducts).map((product, index) => (
            <FeatureProduct
              key={index}
              image={product.image}
              name={product.name}
              price={product.price}
              description={product.description}
            />
          ))}
        </div>
        {visibleProducts < featureProducts.length && (
          <Button size="sm" variant="outline" onClick={handleShowMore}>
            Xem thêm
          </Button>
        )}
      </section>
    </>
  );
};

export default ShopPage;
