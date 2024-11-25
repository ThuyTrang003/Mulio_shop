"use client";

import { ProductPreview } from "./product-preview";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

// interface Product {
//     id: string;
//     category: string;
//     image: string;
//     name: string;
//     price: string;
//     description: string;
// }
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
    images: string;
    createdAt: string; // Sử dụng string vì Date được backend trả về ở dạng ISO
    updatedAt?: string | null;
    deletedAt?: string | null;
}


interface ProductSectionProps {
    title: string;
    products: Product[];
}

// const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
//     const [visibleProducts, setVisibleProducts] = useState(4);

//     const handleShowMore = () => {
//         // Hiển thị toàn bộ sản phẩm
//         setVisibleProducts(products.length);
//     };

//     return (
//         <section className="mx-14 my-10 flex flex-col items-center justify-center gap-4">
//             <h2 className="text-2xl font-bold text-black">{title}</h2>
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
//                 {products.slice(0, visibleProducts).map((product) => (
//                     <ProductPreview
//                         key={product.productId}
//                         productId={product.productId}
//                         productType={product.productType}
//                         images={product.images}
//                         productName={product.productName}
//                         price={product.price}
//                         description={product.description}
//                     />
//                 ))}
//             </div>
//             {visibleProducts < products.length && (
//                 <Button size="sm" variant="outline" onClick={handleShowMore}>
//                     Xem thêm
//                 </Button>
//             )}
//         </section>
//     );
// };
const ProductSection: React.FC<ProductSectionProps> = ({ title, products }) => {
    const [visibleProducts, setVisibleProducts] = useState(4);

    const handleShowMore = () => {
        setVisibleProducts(products.length);
    };

    console.log(products);

    return (
        <section className="mx-14 my-10 flex flex-col items-center justify-center gap-4">
            <h2 className="pt-10 text-2xl font-bold text-black">{title}</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
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
