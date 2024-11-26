"use client";

import { WishListType } from "../types/wish-list-type";
import { ShoppingCart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const favoriteProducts: WishListType[] = [
    {
        image: ["/product.jpg"],
        skuBase: "1",
        productName: "Classic White T-Shirt",
        averageRating: 4.5,
        sizes: ["S", "M", "L", "XL"],
        colors: ["White", "Black", "Gray"],
        price: 100000,
    },
    {
        image: ["/product.jpg"],
        skuBase: "2",
        productName: "Classic White T-Shirt",
        averageRating: 4.2,
        sizes: ["28", "30", "32", "34"],
        colors: ["Blue", "Black", "Light Blue"],
        price: 100000,
    },
    {
        image: ["/product.jpg"],
        skuBase: "3",
        productName: "Classic White T-Shirt",
        averageRating: 4.8,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Black", "Brown", "Red"],
        price: 100000,
    },
];
export function WishList() {
    const [selectedSizes, setSelectedSizes] = useState("");
    const [selectedColors, setSelectedColors] = useState("");

    const handleAddToCart = (productId: number) => {
        const size = selectedSizes[productId];
        const color = selectedColors[productId];
        console.log(
            `Added product ${productId} to cart with size ${size} and color ${color}`,
        );
        // Here you would typically dispatch an action to add the item to the cart
    };
    return (
        <div className="space-y-4">
            {favoriteProducts.map((product) => (
                <div
                    key={product.skuBase}
                    className="flex flex-col items-center gap-4 rounded-lg bg-amber-1/50 p-4 sm:flex-row"
                >
                    <div className="h-24 w-24 flex-shrink-0">
                        <Image
                            src={product.image[0]}
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
                        <div className="flex items-center justify-center sm:justify-start">
                            <Star className="mr-1 h-4 w-4 fill-current text-yellow-400" />
                            <span>{product.averageRating.toFixed(1)}</span>
                        </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 sm:flex-row">
                        <Select
                            onValueChange={(value) => setSelectedSizes(value)}
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
                            onValueChange={(value) => setSelectedColors(value)}
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
                            // onClick={() => handleAddToCart(product.id)}
                            // disabled={
                            //     !selectedSizes[product.id] ||
                            //     !selectedColors[product.id]
                            // }
                            size="sm"
                            className="w-full sm:w-auto"
                        >
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Add to Cart
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    );
}
