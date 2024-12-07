"use client";

// default import
import { IProduct } from "../../../app/(main)/shop/page";
import MainLayout from "../layout";
import React, { useEffect, useState } from "react";

import Banner from "@/features/home/components/banner";
import ProductCategory from "@/features/home/components/category";
import Carousel_layout from "@/features/home/section/carousel-section";
import CollectionsPage from "@/features/home/section/collectionspage";
import ProductHomeSection from "@/features/home/section/product-home-section";

// Ensure correct path

export default function HomePage() {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/products",
                    {
                        method: "GET",
                        headers: { "Content-Type": "application/json" },
                    },
                );

                if (!response.ok) throw new Error("Failed to fetch products");

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

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Banner />
            <ProductCategory />
            <Carousel_layout />
            <ProductHomeSection products={products} />
            <CollectionsPage />
        </div>
    );
}
