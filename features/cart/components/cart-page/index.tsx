"use client";

import { cartColumns } from "./cart-columns";
import Payment from "./payment";

import { useGetCart } from "@/hooks/cart-hook/use-cart";

import useCartStore from "@/stores/cart-store";

import { DataTable } from "@/components/data-table";

export function Cart() {
    const { data: cartData } = useGetCart();
    return (
        <div className="py-4">
            {cartData && (
                <>
                    <DataTable columns={cartColumns} data={cartData.products} />
                    <Payment
                        totalPrice={cartData.totalPrice}
                        totalNumber={cartData.totalNumber}
                    />
                </>
            )}
        </div>
    );
}
