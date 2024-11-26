"use client";

import { DeleteItemDialog } from "./cart-page/delete-item-dialog";
import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import { useGetCart } from "@/hooks/cart-hook/use-cart";

import { CartItem } from "@/types/cart-item-type";

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

export function CartDropdown({ children }: CartDropdownProps) {
    const { data: cartData } = useGetCart();

    const router = useRouter();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 pl-4" align="end">
                <h2 className="mb-4 mt-2 font-semibold">Cart</h2>
                {cartData && cartData.totalNumber > 0 ? (
                    <div className="flex flex-col gap-4">
                        <ScrollArea
                            className={cn(
                                "pr-2",
                                cartData.totalNumber > 6
                                    ? "h-[calc(100vh-19rem)]"
                                    : "",
                            )}
                        >
                            <div className="flex flex-col gap-4">
                                {cartData.products.map((item: CartItem) => (
                                    <div
                                        key={item.productId}
                                        className="flex items-center gap-4"
                                    >
                                        <div className="relative h-16 w-16 overflow-hidden rounded-md">
                                            <Image
                                                src={item.image[0]}
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
                                        <DeleteItemDialog
                                            productId={item.productId}
                                            productName={item.productName}
                                        >
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8"
                                            >
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </DeleteItemDialog>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="mb-2 space-y-2 pr-4">
                            <div className="border-t pt-4">
                                <div className="flex justify-between font-medium">
                                    <span>Số lượng</span>
                                    <span>{cartData.totalNumber}</span>
                                </div>
                                <div className="flex justify-between font-medium">
                                    <span>Tạm tính</span>
                                    <span>
                                        {moneyFormatter(cartData.totalPrice)}
                                    </span>
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
                                    Xem giỏ hàng
                                </Button>
                                <Button className="flex-1" variant="secondary" onClick={() => router.push("/checkout")}>
                                    Thanh toán
                                </Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="my-6 flex justify-center">No Items</div>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
