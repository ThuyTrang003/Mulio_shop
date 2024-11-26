"use client";
import React, { useEffect, useState } from "react";
import { useAuthStore } from "@/stores/auth";
import ProductSection, { Product } from "@/features/product/components/products-section/product-section";

const ShopPage: React.FC = () => {
    const { token } = useAuthStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/products", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(data.data.map((product: any) => ({
                    productId: product.productId,
                    productName: product.productName,
                    price: product.price,
                    color: product.color,
                    description: product.description,
                    // images: product.images,
                    images: Array.isArray(product.images) ? product.images : [product.images],
                    productType: product.productType,
                    size: product.size,
                    skuBase: product.skuBase,
                })));
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    if (error) {
        return <p>Lỗi: {error}</p>;
    }

    return (
        <>
            <div className=" padding-10 gap-10">
            <ProductSection
                title="Áo"
                products={products.filter((p) => p.productType === "Áo" && p.size === "S")}
            />
            <ProductSection
                title="Quần"
                products={products.filter((p) => p.productType === "Quần" && p.size === "S")}
            />
            <ProductSection
                title="Phụ kiện"
                products={products.filter((p) => p.productType === "Phụ kiện")}
            />
            </div>
        </>
    );
};

export default ShopPage;

