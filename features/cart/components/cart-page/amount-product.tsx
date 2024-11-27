import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import { useUpdateProductToCart } from "@/hooks/cart-hook/use-cart";

import useCartStore from "@/stores/cart-store";

import { CartItem } from "@/features/cart/types/cart-item-type";

import { Input } from "@/components/ui/input";

interface AmountProductProps {
    item: CartItem;
}
export function AmountProduct({ item }: AmountProductProps) {
    const { mutate: updateProductToCart } = useUpdateProductToCart();
    const queryClient = useQueryClient();

    const [value, setValue] = useState(item.amount);
    const { cartId } = useCartStore();

    useEffect(() => {
        if (item.amount) setValue(item.amount);
    }, [item.amount]);

    const updateAmount = async () => {
        if (value > item.limit) {
            setValue(item.limit);
        }
        if (value === 0) {
            setValue(1);
        }
        // Gửi request lên server để cập nhật số lượng sản phẩm
        updateProductToCart(
            {
                cartId: cartId,
                productId: item.productId,
                amount: value,
            },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({
                        queryKey: ["getCart"],
                    });
                },
            },
        );
    };
    return (
        <>
            <Input
                type="number"
                className="h-8 w-16 px-1 text-center"
                min={1}
                max={item.limit}
                value={value}
                onChange={(e) => {
                    setValue(Number(e.target.value));
                }}
                onBlur={updateAmount}
            />
        </>
    );
}
