// "use client";

// // import React from "react";
// // import PageHeader from "@/features/layout/page-header";
// // import ProductSection from "@/features/product/components/products-section/product-section";
// // const ShopPage: React.FC = () => {
// //     const featureProducts = [
// //         {
// //             id: "1",
// //             category: "shirt",
// //             image: "/cardigan/c-1.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Xanh đậm",
// //         },
// //         {
// //             id: "2",
// //             category: "shirt",
// //             image: "/cardigan/c-2.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Xám",
// //         },
// //         {
// //             id: "3",
// //             category: "shirt",
// //             image: "/cardigan/c-3.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Đen",
// //         },
// //         {
// //             id: "4",
// //             category: "shirt",
// //             image: "/cardigan/c-4.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Xanh",
// //         },
// //         {
// //             id: "5",
// //             category: "shirt",
// //             image: "/cardigan/c-4.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Tím",
// //         },
// //         {
// //             id: "1",
// //             category: "pants",
// //             image: "/cardigan/c-1.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Xanh đậm",
// //         },
// //         {
// //             id: "2",
// //             category: "pants",
// //             image: "/cardigan/c-2.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Xám",
// //         },
// //         {
// //             id: "3",
// //             category: "pants",
// //             image: "/cardigan/c-3.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Đen",
// //         },
// //         {
// //             id: "4",
// //             category: "pants",
// //             image: "/cardigan/c-4.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Xanh",
// //         },
// //         {
// //             id: "1",
// //             category: "accessories",
// //             image: "/cardigan/c-1.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Xanh đậm",
// //         },
// //         {
// //             id: "2",
// //             category: "accessories",
// //             image: "/cardigan/c-2.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Xám",
// //         },
// //         {
// //             id: "3",
// //             category: "accessories",
// //             image: "/cardigan/c-3.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Đen",
// //         },
// //         {
// //             id: "4",
// //             category: "accessories",
// //             image: "/cardigan/c-4.png",
// //             name: "Áo Cardigan",
// //             price: "300.000 VNĐ",
// //             description: "Xanh",
// //         },
// //         // Thêm các sản phẩm cho các category "pants" và "accessories" tương tự
// //     ];
// //     return (
// //         <>
// //             <PageHeader
// //                 backgroundImage="/banner_shop.png"
// //                 title="Sản phẩm"
// //                 breadcrumbItems={[
// //                     { label: "Trang chủ", href: "/home" },
// //                     { label: "Sản phẩm", href: "/shop" },
// //                 ]}
// //             />
// //             <ProductSection
// //                 title="Áo"
// //                 products={featureProducts.filter((p) => p.category === "shirt")}
// //             />
// //             <ProductSection
// //                 title="Quần"
// //                 products={featureProducts.filter((p) => p.category === "pants")}
// //             />
// //             <ProductSection
// //                 title="Phụ kiện"
// //                 products={featureProducts.filter(
// //                     (p) => p.category === "accessories",
// //                 )}
// //             />
// //         </>
// //     );
// // };
// // export default ShopPage;
// import React, { useEffect, useState } from "react";

// import { useAuthStore } from "@/stores/auth";

// import ProductSection, {
//     Product,
// } from "@/features/product/components/products-section/product-section";

// const ShopPage: React.FC = () => {
//     const { setToken, token } = useAuthStore();
//     console.log("getToken", token);
//     const accessToken = token.accessToken;
//     console.log("accessToken", accessToken);
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     // useEffect(() => {
//     //     const fetchProducts = async () => {
//     //         try {
//     //             const response = await fetch(
//     //                 "http://localhost:8080/api/products/by-product-type/Áo thun",
//     //                 {
//     //                     method: "GET",
//     //                     headers: {
//     //                         Authorization: `Bearer ${accessToken}`,
//     //                         "Content-Type": "application/json",
//     //                     },
//     //                 },
//     //             );
    
//     //             if (!response.ok) {
//     //                 throw new Error("Failed to fetch products");
//     //             }
    
//     //             const data = await response.json();
//     //             setProducts(
//     //                 data.data.map((product: any) => ({
//     //                     productId: product.productId,
//     //                     skuBase: product.skuBase,
//     //                     skuCode: product.skuCode,
//     //                     productName: product.productName,
//     //                     price: product.price,
//     //                     description: product.description,
//     //                     size: product.size,
//     //                     color: product.color,
//     //                     amount: product.amount || 0,
//     //                     status: product.status,
//     //                     productType: product.productType,
//     //                     images: product.images,
//     //                     createdAt: product.createdAt,
//     //                     updatedAt: product.updatedAt,
//     //                     deletedAt: product.deletedAt,
//     //                 })),
//     //             );
//     //         } catch (err: any) {
//     //             setError(err.message);
//     //         } finally {
//     //             setLoading(false);
//     //         }
//     //     };
    
//     //     fetchProducts();
//     // }, []);
//     useEffect(() => {
//         if (!accessToken) return;  // Exit if no token is present
    
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch("http://localhost:8080/api/products/by-product-type/Áo thun", {
//                     method: "GET",
//                     headers: {
//                         Authorization: `Bearer ${accessToken}`,
//                         "Content-Type": "application/json",
//                     },
//                 });
    
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch products");
//                 }
    
//                 const data = await response.json();
//                 setProducts(data.data.map(product => ({
//                     productId: product.productId,
//                     productName: product.productName,
//                     price: product.price,
//                     description: product.description,
//                     images: product.images,
//                     // etc...
//                 })));
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
    
//         fetchProducts();
//     }, [accessToken]);  // Fetch when accessToken changes
    
    

//     if (loading) {
//         return <p>Đang tải dữ liệu...</p>;
//     }

//     if (error) {
//         return <p>Lỗi: {error}</p>;
//     }

//     return <ProductSection title="Áo thun" products={products} />;
// };

// export default ShopPage;
// "use client";
// import React, { useEffect, useState } from "react";
// import { useAuthStore } from "@/stores/auth";
// import ProductSection, { Product } from "@/features/product/components/products-section/product-section";

// const ShopPage: React.FC = () => {
//     const { setToken, accessToken } = useAuthStore();
//     console.log("accessToken", accessToken);
//     // const accessToken = token.accessToken;
//     const [products, setProducts] = useState<Product[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await fetch("http://localhost:8080/api/products/by-product-type/Áo thun", {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 });

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch products");
//                 }

//                 const data = await response.json();
//                 setProducts(data.data.map((product: any) => ({
//                     productId: product.productId,
//                     skuBase: product.skuBase,
//                     skuCode: product.skuCode,
//                     productName: product.productName,
//                     price: product.price,
//                     description: product.description,
//                     size: product.size,
//                     color: product.color,
//                     amount: product.amount || 0,
//                     status: product.status,
//                     productType: product.productType,
//                     images: product.images,
//                     createdAt: product.createdAt,  // Assuming backend sends ISO date
//                     updatedAt: product.updatedAt,
//                     deletedAt: product.deletedAt,
//                 })));
//             } catch (err) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchProducts();
//     }, []);
//     if (loading) {
//         return <p>Đang tải dữ liệu...</p>;
//     }

//     if (error) {
//         return <p>Lỗi: {error}</p>;
//     }

//     return <ProductSection title="Áo thun" products={products} />;
// };

// export default ShopPage;
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

