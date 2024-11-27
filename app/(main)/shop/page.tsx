"use client";

import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

import { useAuthStore } from "@/stores/auth";

import ProductSection, {
    Product,
} from "@/features/product/components/products-section/product-section";

export interface IProduct {
    productId: string;
    productName: string;
    price: number;
    color: string;
    description: string;
    images: string[];
    productType: string;
    size: string;
    skuBase: string;
}
const ShopPage: React.FC = () => {
    const { token } = useAuthStore();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // State cho bộ lọc
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

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

        // Lọc theo kích thước nếu là quần áo
        const isClothing = ["Áo", "Quần"].includes(product.productType);
        const matchSize = isClothing ? product.size === "S" : true;

        return matchType && matchColor && matchSize;
    });

    // Hàm xử lý chọn loại sản phẩm
    const handleTypeClick = (type: string) => {
        setSelectedTypes((prev) =>
            prev.includes(type)
                ? prev.filter((t) => t !== type)
                : [...prev, type],
        );
    };

    // Hàm xử lý chọn màu sắc
    const handleColorClick = (color: string) => {
        setSelectedColors((prev) =>
            prev.includes(color)
                ? prev.filter((c) => c !== color)
                : [...prev, color],
        );
    };

    if (loading) {
        return <p>Đang tải dữ liệu...</p>;
    }

    if (error) {
        return <p>Lỗi: {error}</p>;
    }

    return (
        <div
            className="d-flex"
            style={{ display: "flex", gap: "20px", padding: "20px" }}
        >
            {/* Menu bên trái */}
            <div style={{ width: "200px" }}>
                <h2 className="mb-4 pt-14 text-2xl font-bold text-[#f15e2c]">
                    Loại sản phẩm
                </h2>
                <ul style={{ listStyle: "none", padding: "0" }}>
                    {["Áo", "Quần", "Phụ kiện"].map((type) => (
                        <li key={type}>
                            <button
                                onClick={() => handleTypeClick(type)}
                                className={
                                    selectedTypes.includes(type)
                                        ? "filter-btn selected"
                                        : "filter-btn"
                                }
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    background: selectedTypes.includes(type)
                                        ? "#E2E1DF"
                                        : "transparent",
                                    color: selectedTypes.includes(type)
                                        ? "#000"
                                        : "#000",
                                    // border: "1px solid #ccc",
                                    textAlign: "left",
                                    width: "100%",
                                    padding: "5px 20px",
                                    marginBottom: "5px",
                                    cursor: "pointer",
                                }}
                            >
                                {type}
                                {selectedTypes.includes(type) && (
                                    <IoClose
                                        style={{
                                            color: "#000",
                                            cursor: "pointer",
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation(); // Ngăn sự kiện click lan sang button cha
                                            handleTypeClick(type); // Bỏ chọn loại sản phẩm
                                        }}
                                    />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
                <hr
                    style={{
                        border: "none",
                        borderTop: "2px dashed #ccc",
                        margin: "30px 0",
                    }}
                />
                <h2 className="mb-4 text-2xl font-bold text-[#f15e2c]">
                    Màu sắc
                </h2>
                <ul
                    style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "5px",
                        padding: "0",
                        listStyle: "none",
                    }}
                >
                    {[
                        { name: "Xanh lá", color: "#56624C" },
                        { name: "Xám", color: "#CDC9BF" },
                        { name: "Đen", color: "#000000" },
                        { name: "Tím", color: "#BCAFC0" },
                        { name: "Trắng", color: "#FFFFFF" },
                        { name: "Nâu", color: "#755E4E" },
                        { name: "Xanh lam", color: "#1E2B3B" },
                        { name: "Vàng", color: "#DBBF79" },
                        { name: "Đỏ gạch", color: "#8D4A37" },
                        { name: "Be nhạt", color: "#DED6CB" },
                        { name: "Be", color: "#D9D4C7" },
                        { name: "Hồng", color: "#F6D9D3" },
                    ].map(({ name, color }) => (
                        <li key={name}>
                            <button
                                onClick={() => handleColorClick(name)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    background: selectedColors.includes(name)
                                        ? "#E2E1DF"
                                        : "transparent",
                                    padding: "2px 2px",
                                    cursor: "pointer",
                                }}
                            >
                                <span
                                    style={{
                                        backgroundColor: color,
                                        display: "inline-block",
                                        width: "30px",
                                        height: "30px",
                                        // borderRadius: "50%",
                                        // marginRight: "5px",
                                        border: "1px solid #ccc",
                                    }}
                                ></span>
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Danh sách sản phẩm */}
            <div style={{ flex: 1 }}>
                {filteredProducts.length > 0 ? (
                    <ProductSection title="" products={filteredProducts} />
                ) : (
                    <p>Không có sản phẩm nào phù hợp.</p>
                )}
            </div>
        </div>
    );
};

export default ShopPage;
