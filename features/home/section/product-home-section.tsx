// Adjust the path if needed
import { IProduct } from "../../../app/(main)/shop/page";
import React from "react";

import { ProductPreview } from "@/features/product/components/products-section/product-preview";

import { Button } from "@/components/ui/button";

interface ProductHomeSectionProps {
    products: IProduct[];
}

const ProductHomeSection: React.FC<ProductHomeSectionProps> = ({
    products = [],
}) => {
    const displayedProducts = products.slice(0, 8);

    return (
        <div className="product-home-section">
            <h2 className="my-8 text-center text-4xl font-bold">
                Sản phẩm nổi bật
            </h2>
            <div className="flex justify-center gap-8">
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(4, 1fr)",
                        gap: "1.25rem",
                        padding: "20px",
                    }}
                >
                    {displayedProducts.map((product) => (
                        <ProductPreview
                            key={product.productId}
                            productId={product.productId}
                            productType={product.productType}
                            color={product.color}
                            images={product.images}
                            productName={product.productName}
                            price={product.price}
                            description={product.description}
                            skuBase={product.skuBase}
                        />
                    ))}
                </div>
            </div>

            {/* "Xem thêm" button */}
            <div className="mt-8 text-center">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={() => (window.location.href = "/shop")}
                >
                    Xem thêm
                </Button>
            </div>
        </div>
    );
};

export default ProductHomeSection;
