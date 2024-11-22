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
//                     productName: product.productName,/-strong/-heart:>:o:-((:-h price: product.price,
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

// export default ShopPage;​
