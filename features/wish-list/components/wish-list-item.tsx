"use client";

import { WishListType } from "../types/wish-list-type";
import { useQueryClient } from "@tanstack/react-query";
import { ShoppingCart, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { useAddProductToCart } from "@/hooks/cart-hook/use-cart";
import { useGetProductByColorSize } from "@/hooks/product-hook/useProduct";
import { useDeleteProductToWishList } from "@/hooks/wish-list-hook/useWishList";

import useCartStore from "@/stores/cart-store";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface WishListItemProps {
    product: WishListType;
}
export function WishListItem({ product }: WishListItemProps) {
    const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
    const [selectedColor, setSelectedColor] = useState(product.colors[0]);
    const { cartId } = useCartStore();
    const queryClient = useQueryClient();

    const { data: productByColorSize } = useGetProductByColorSize({
        color: selectedColor,
        size: selectedSize,
        skuBase: product.skuBase,
    });

    const { mutate: addProductToCart, isPending: pendingAddProductToCart } =
        useAddProductToCart();
    const handleAddToCart = () => {
        addProductToCart(
            {
                cartId: cartId,
                productId: productByColorSize.productId,
                amount: 1,
            },
            {
                onSuccess: () => {
                    toast(
                        `Item ${productByColorSize.productName} added to cart successfully`,
                    );
                    queryClient.invalidateQueries({
                        queryKey: ["getCart"],
                    });
                },
                onError: () => {
                    toast.error("Add item failed!");
                },
            },
        );
    };

    const { mutate: deleteToWishList } = useDeleteProductToWishList();
    const handleDeleteToWishList = () => {
        deleteToWishList(product.skuBase, {
            onSuccess: () => {
                toast(
                    `Item ${product.productName} removed from wishlist successfully`,
                );
                queryClient.invalidateQueries({
                    queryKey: ["getWishList"],
                });
            },
        });
    };

    return (
        <div
            key={product.skuBase}
            className="flex flex-col items-center gap-4 rounded-lg bg-amber-1/50 p-4 sm:flex-row"
        >
            <div className="h-24 w-24 flex-shrink-0">
                <Image
                    src={product.images[0]}
                    alt={product.productName}
                    width={100}
                    height={100}
                    className="h-full w-full rounded-md object-cover"
                />
            </div>
            <div className="flex-grow space-y-2 text-center sm:text-left">
                <Link
                    href={`products/${product.skuBase}`}
                    className="text-lg font-semibold hover:underline"
                >
                    {product.productName}
                </Link>
                <p>Số lượng: {productByColorSize?.amount}</p>
                <div className="flex items-center justify-center sm:justify-start">
                    <Star className="mr-1 h-4 w-4 fill-current text-yellow-400" />
                    <span>{product.averageRating.toFixed(1)}</span>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2 sm:flex-row">
                <Select
                    value={selectedSize}
                    onValueChange={(value) => setSelectedSize(value)}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Size" />
                    </SelectTrigger>
                    <SelectContent>
                        {product.sizes.map((size) => (
                            <SelectItem key={size} value={size}>
                                {size}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select
                    value={selectedColor}
                    onValueChange={(value) => setSelectedColor(value)}
                >
                    <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Color" />
                    </SelectTrigger>
                    <SelectContent>
                        {product.colors.map((color) => (
                            <SelectItem key={color} value={color}>
                                {color}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    onClick={handleAddToCart}
                    disabled={
                        productByColorSize?.amount === 0 ||
                        pendingAddProductToCart
                    }
                    size="sm"
                    className="w-full sm:w-auto"
                >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Thêm vào giỏ hàng
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-item hover:text-white"
                    onClick={handleDeleteToWishList}
                >
                    <Trash2 className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
