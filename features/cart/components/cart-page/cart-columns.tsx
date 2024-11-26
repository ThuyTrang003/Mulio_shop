"use client";

import { AmountProduct } from "./amount-product";
import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Image from "next/image";

import { CartItem } from "@/types/cart-item-type";

import { moneyFormatter } from "@/utils/money-formatter";

import { Button } from "@/components/ui/button";

export const cartColumns: ColumnDef<CartItem>[] = [
    {
        accessorKey: "image",
        header: "Ảnh",
        cell: ({ row }) => {
            return (
                <div className="h-16 w-16 overflow-hidden rounded-md">
                    <Image
                        src={row.getValue("image")}
                        alt={row.getValue("productName")}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                    />
                </div>
            );
        },
    },
    {
        accessorKey: "productName",
        header: "Sản phẩm",
        cell: ({ row }) => {
            return (
                <div className="flex flex-col">
                    <span className="font-medium">
                        {row.getValue("productName")}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        Màu: {row.original.color}
                    </span>
                    <span className="text-sm text-muted-foreground">
                        Size: {row.original.size}
                    </span>
                </div>
            );
        },
    },
    {
        accessorKey: "price",
        header: "Giá tiền",
        cell: ({ row }) => (
            <div className="text-left">
                {moneyFormatter(row.getValue("price"))}
            </div>
        ),
    },
    {
        accessorKey: "amount",
        header: "Số lượng",
        cell: ({ row }) => {
            return (
                <AmountProduct
                    item={{
                        amount: row.getValue("amount"),
                        color: row.original.color,
                        size: row.original.size,
                        skuBase: row.original.skuBase,
                    }}
                />
            );
        },
    },
    {
        accessorKey: "totalPrice",
        header: "Tổng tiền",
        cell: ({ row }) => (
            <div>{moneyFormatter(row.getValue("totalPrice"))}</div>
        ),
    },
    {
        id: "actions",
        header: "Xóa",
        cell: ({ row }) => {
            return (
                <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => {
                        // Handle delete
                    }}
                >
                    <Trash2 className="h-5 w-5" />
                </Button>
            );
        },
    },
];