import Link from "next/link";
import { useState } from "react";

import { useGetProductByColorSize } from "@/hooks/product-hook/useProduct";

import { moneyFormatter } from "@/utils/money-formatter";

import StarRatingDisplay from "@/components/star-rating-display";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ProductInforProps {
    productData: {
        productId: string;
        skuBase: string;
        skuCode: string;
        productName: string;
        price: number;
        description: string;
        sizes: string[];
        colors: string[];
        status: string;
        productType: string;
        images: string[];
        averageRating: number;
    };
}
export function ProductInfor({ productData }: ProductInforProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(productData.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(productData.colors[0]);
    const { data: productByColorSize } = useGetProductByColorSize({
        color: selectedColor,
        size: selectedSize,
        skuBase: productData.skuBase,
    });
    return (
        <div className="space-y-6">
            <div>
                <h1 className="mb-2 text-3xl font-bold">
                    {productData.productName}
                </h1>
                <p className="text-2xl font-semibold text-primary">
                    {moneyFormatter(productData.price)}
                </p>
            </div>

            <StarRatingDisplay rating={productData.averageRating} />

            <p className="text-muted-foreground">{productData.description}</p>

            <div className="space-y-4">
                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Size
                    </label>
                    <div className="flex gap-2">
                        {productData.sizes.map((size) => (
                            <Button
                                key={size}
                                variant={
                                    selectedSize === size
                                        ? "secondary"
                                        : "outline"
                                }
                                onClick={() => setSelectedSize(size)}
                                className="h-12 w-12"
                            >
                                {size}
                            </Button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium">
                        Color
                    </label>
                    <div className="flex gap-2">
                        {productData.colors.map((color) => (
                            <Button
                                variant={
                                    selectedColor === color
                                        ? "secondary"
                                        : "outline"
                                }
                                key={color}
                                onClick={() => setSelectedColor(color)}
                            >
                                {color}
                            </Button>
                        ))}
                    </div>
                </div>
                {productByColorSize && (
                    <p>Số lượng: {productByColorSize.amount} </p>
                )}
                <div className="flex items-center gap-4">
                    <div className="flex items-center rounded-md border">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                setQuantity(Math.max(1, quantity - 1))
                            }
                        >
                            -
                        </Button>
                        <input
                            value={quantity}
                            onChange={(e) =>
                                setQuantity(
                                    Math.max(1, parseInt(e.target.value) || 1),
                                )
                            }
                            disabled
                            className="w-16 border-0 text-center focus:ring-0"
                        />
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setQuantity(quantity + 1)}
                            disabled={quantity >= productByColorSize?.amount}
                        >
                            +
                        </Button>
                    </div>
                    <Button
                        variant="outline"
                        className="flex-1 border border-black"
                    >
                        Thêm vào giỏ hàng
                    </Button>
                </div>
            </div>

            <div className="space-y-2 border-t pt-4">
                <p className="text-sm">
                    <span className="font-medium">Code:</span>{" "}
                    {productData.skuBase}
                </p>
                <p className="text-sm">
                    <span className="font-medium">Category:</span>{" "}
                    <Link href="#" className="text-primary hover:underline">
                        {productData.productType}
                    </Link>
                </p>
            </div>
        </div>
    );
}
