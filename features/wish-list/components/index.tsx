"use client";

import { WishListType } from "../types/wish-list-type";
import { WishListItem } from "./wish-list-item";

import { useGetWishList } from "@/hooks/wish-list-hook/useWishList";

export function WishList() {
    const { data: wishListData } = useGetWishList();
    return (
        <div className="space-y-4">
            {wishListData &&
                (wishListData.length === 0 ? (
                    <div className="text-center text-muted-foreground">
                        Danh mục yêu thích trống!
                    </div>
                ) : (
                    wishListData.map((product: WishListType) => (
                        <WishListItem key={product.skuBase} product={product} />
                    ))
                ))}
        </div>
    );
}
