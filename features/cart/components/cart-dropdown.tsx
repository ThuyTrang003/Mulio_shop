"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { useGetCart } from "@/hooks/cart-hook/use-cart";

import { moneyFormatter } from "@/utils/money-formatter";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface CartDropdownProps {
    children: React.ReactNode;
}
export const data = {
    products: [
        {
            productId: "1",
            productName: "Áo len dệt",
            price: 300000,
            description: " description",
            size: "S",
            color: "green",
            amount: 2,
            productType: "category",
            image: "/product.jpg",
            totalPrice: 600000,
        },
        {
            productId: "2",
            productName: "Áo len",
            price: 300000,
            description: " description",
            size: "S",
            color: "green",
            amount: 1,
            productType: "category",
            image: "/product.jpg",
            totalPrice: 100000,
        },
        {
            productId: "2",
            productName: "Áo len",
            price: 300000,
            description: " description",
            size: "S",
            color: "green",
            amount: 1,
            productType: "category",
            image: "/product.jpg",
            totalPrice: 100000,
        },
        {
            productId: "2",
            productName: "Áo len",
            price: 300000,
            description: " description",
            size: "S",
            color: "green",
            amount: 1,
            productType: "category",
            image: "/product.jpg",
            totalPrice: 100000,
        },
    ],
    totalNumber: 4,
    totalPrice: 200000,
};
export function CartDropdown({ children }: CartDropdownProps) {
    const { data: cartData, isError, error } = useGetCart();
    if (isError) {
        console.error(error);
    }
    const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 pl-4" align="end">
                <h2 className="mb-4 mt-2 font-semibold">Cart</h2>
                <div className="flex flex-col gap-4">
                    <ScrollArea
                        className={cn(
                            "pr-2",
                            data.totalNumber > 6 ? "h-[calc(100vh-19rem)]" : "",
                        )}
                    >
                        <div className="flex flex-col gap-4">
                            {data.products.map((item) => (
                                <div
                                    key={item.productId}
                                    className="flex items-center gap-4"
                                >
                                    <div className="relative h-16 w-16 overflow-hidden rounded-md">
                                        <Image
                                            src={item.image}
                                            alt={item.productName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="grid flex-1 gap-1">
                                        <h3 className="text-sm font-medium">
                                            {item.productName}
                                        </h3>
                                        <div className="flex items-center gap-2 text-sm">
                                            <span>{item.amount}</span>
                                            <span>x</span>
                                            <span>
                                                {moneyFormatter(item.price)}
                                            </span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                    <div className="mb-2 space-y-2 pr-4">
                        <div className="border-t pt-4">
                            <div className="flex justify-between font-medium">
                                <span>Subtotal</span>
                                <span>{moneyFormatter(data.totalPrice)}</span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                disabled={
                                    cartData?.products?.length > 0
                                        ? false
                                        : true
                                }
                                className="flex-1"
                                variant="outline"
                                onClick={() => router.push("/cart")}
                            >
                                Cart
                            </Button>
                            <Button className="flex-1" variant="secondary">
                                Checkout
                            </Button>
                        </div>
                    </div>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
