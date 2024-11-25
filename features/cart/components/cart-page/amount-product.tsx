import { useState } from "react";

import { Input } from "@/components/ui/input";

interface AmountProductProps {
    item: {
        amount: number;
        color: string;
        size: string;
        skuBase: string;
    };
}
export function AmountProduct({ item }: AmountProductProps) {
    //  /api/products/by-sku/{skuBase}
    const limitOfProduct = 10; //số hàng còn lại lấy từ /api/products/by-sku/{skuBase}
    const [value, setValue] = useState(item.amount);
    return (
        <>
            <Input
                type="number"
                className="h-8 w-16 px-1 text-center"
                min={1}
                max={limitOfProduct}
                value={value}
                onChange={(e) => {
                    setValue(Number(e.target.value));
                }}
            />
        </>
    );
}
