import Image from "next/image";
import React, { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";

interface PurchaseItem {
    name: string;
    quantity: number;
    price: number;
    imageUrl: string;
}

interface PurchaseGroup {
    items: PurchaseItem[];
    total: number;
}

export default function PurchaseHistory() {
    const [searchTerm, setSearchTerm] = useState("");
    const [purchaseHistory, setPurchaseHistory] = useState<PurchaseGroup[]>([]);
    const [filteredHistory, setFilteredHistory] = useState<PurchaseGroup[]>([]);

    useEffect(() => {
        async function fetchPurchaseHistory() {
            try {
                const response = await fetch(
                    "https://your-backend-api.com/purchase-history",
                );
                const data: PurchaseGroup[] = await response.json();
                setPurchaseHistory(data);
                setFilteredHistory(data);
            } catch (error) {
                console.error("Error fetching purchase history:", error);
            }
        }

        fetchPurchaseHistory();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            const filtered = purchaseHistory.filter((group) =>
                group.items.some((item) =>
                    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
                ),
            );
            setFilteredHistory(filtered);
        } else {
            setFilteredHistory(purchaseHistory);
        }
    }, [searchTerm, purchaseHistory]);

    return (
        <div className="container mx-auto space-y-6 px-4 py-6">
            <div>
                <Input
                    type="text"
                    placeholder="Bạn có thể tìm kiếm theo tên Shop hoặc tên Sản phẩm"
                    className="w-full rounded-md border border-gray-300 p-2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-6">
                {filteredHistory.map((group, groupIndex) => (
                    <div
                        key={groupIndex}
                        className="rounded-lg bg-gray-50 p-4 shadow-md"
                    >
                        <div className="space-y-4">
                            {group.items.map((item, itemIndex) => (
                                <div
                                    key={itemIndex}
                                    className={`flex items-center justify-between ${
                                        itemIndex < group.items.length - 1
                                            ? "border-b pb-4"
                                            : ""
                                    }`}
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="relative h-16 w-16">
                                            <Image
                                                src={item.imageUrl}
                                                alt={item.name}
                                                layout="fill"
                                                objectFit="cover"
                                                className="rounded"
                                            />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800">
                                                {item.name}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                x{item.quantity}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="font-semibold text-gray-700">
                                        {item.price.toLocaleString("vi-VN")} VND
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-4 flex items-center justify-between border-t pt-4">
                            <p className="font-bold text-gray-800">
                                Thành tiền
                            </p>
                            <p className="text-xl font-bold text-gray-900">
                                {group.total.toLocaleString("vi-VN")} VND
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                <button className="rounded bg-yellow-600 px-6 py-2 font-bold text-white">
                    Xem thêm
                </button>
            </div>
        </div>
    );
}
