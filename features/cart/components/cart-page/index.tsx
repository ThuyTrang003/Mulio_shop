"use client";

import { data } from "../cart-dropdown";
import { cartColumns } from "./cart-columns";
import Payment from "./payment";

import useCartStore from "@/stores/cart-store";

import { DataTable } from "@/components/data-table";

export function Cart() {
    const { cartId } = useCartStore();
    console.log(cartId);
    return (
        <div className="py-4">
            {data && <DataTable columns={cartColumns} data={data.products} />}
            <div>
                <Payment
                    totalPrice={data.totalPrice}
                    totalNumber={data.totalNumber}
                />
            </div>
        </div>
    );
}
