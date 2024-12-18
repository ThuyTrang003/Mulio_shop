"use client";

import { ProductPreview } from "./product-preview";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

export interface Product {
    productId: string; // Map với ObjectId từ backend
    skuBase: string;
    skuCode: string;
    productName: string;
    price: number;
    description: string;
    size: string;
    color: string;
    amount: number;
    status: string;
    productType: string;
    images: string[];
    createdAt: string; // Sử dụng string vì Date được backend trả về ở dạng ISO
    updatedAt?: string | null;
    deletedAt?: string | null;
}

interface ProductSectionProps {
    title: string;
    products: Product[];
}

const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
    const [visibleProducts, setVisibleProducts] = useState(8);

    const handleShowMore = () => {
        setVisibleProducts((prevVisible) => prevVisible + 8); // Mỗi lần bấm Xem thêm sẽ hiển thị thêm 8 sản phẩm
    };

    return (
        <section className="mx-14 my-10 flex flex-col items-center justify-center gap-5">
            <h2 className="text-2xl font-bold text-black">{title}</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">
                {products.slice(0, visibleProducts).map((product) => (
                    <ProductPreview
                        key={product.productId}
                        productId={product.productId}
                        productType={product.productType}
                        images={product.images}
                        productName={product.productName}
                        price={product.price}
                        description={product.description}
                        color={product.color}
                        skuBase={product.skuBase}
                    />
                ))}
            </div>
            {visibleProducts < products.length && (
                <Button size="sm" variant="outline" onClick={handleShowMore}>
                    Xem thêm
                </Button>
            )}
        </section>
    );
};

export default ProductSection;
