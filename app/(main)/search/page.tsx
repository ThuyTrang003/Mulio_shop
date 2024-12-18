"use client";

import { IProduct } from "../shop/page";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

import ProductSection, {
    Product,
} from "@/features/product/components/products-section/product-section";

export default function ShopPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ShopPageContent />
        </Suspense>
    );
}

function ShopPageContent() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);
    const searchParams = useSearchParams();
    const searchQuery = searchParams.get("query") || ""; // Get search query from URL

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/products",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    },
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                setProducts(
                    data.data.map((product: IProduct) => ({
                        productId: product.productId,
                        productName: product.productName,
                        price: product.price,
                        color: product.color,
                        description: product.description,
                        images: Array.isArray(product.images)
                            ? product.images
                            : [product.images],
                        productType: product.productType,
                        size: product.size,
                        skuBase: product.skuBase,
                    })),
                );
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchType =
            selectedTypes.length === 0 ||
            selectedTypes.includes(product.productType);
        const matchColor =
            selectedColors.length === 0 ||
            selectedColors.includes(product.color);
        const matchSearchQuery = product.productName
            .toLowerCase()
            .includes(searchQuery.toLowerCase()); // Filter by product name

        const matchSize =
            product.productType === "Áo" || product.productType === "Quần"
                ? product.size === "S"
                : true; // Nếu sản phẩm không phải "Áo" hoặc "Quần", bỏ qua điều kiện size

        return matchType && matchColor && matchSearchQuery && matchSize;
    });

    const resultsCount = filteredProducts.length;

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    if (error) {
        return <p>Lỗi: {error}</p>;
    }

    return (
        <div style={{ flex: 1 }}>
            {resultsCount > 0 ? (
                <div className="p-10">
                    <p className="text-center text-2xl font-semibold">
                        Tìm thấy {resultsCount} kết quả cho &quot;{searchQuery}
                        &quot;
                    </p>
                    <hr className="my-10" />
                    <ProductSection title="" products={filteredProducts} />
                </div>
            ) : (
                <div className="p-10">
                    <p className="text-center text-2xl font-semibold">
                        Tìm thấy {resultsCount} kết quả cho &quot;{searchQuery}
                        &quot;
                    </p>
                    <hr className="my-10" />
                    <p className="text-l text-center">
                        Không có sản phẩm nào phù hợp với tìm kiếm của bạn.
                    </p>
                </div>
            )}
        </div>
    );
}
