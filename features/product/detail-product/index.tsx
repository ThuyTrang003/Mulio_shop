"use client";

import { ProductImages } from "./product-images";
import { ProductInfor } from "./product-infor";
import Image from "next/image";
import { useState } from "react";

import { CustomerReview } from "@/features/rating/customer-review";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const productData = {
    _id: "123",
    code: "TEE01",
    productName: "Áo thun cổ tròn",
    price: 499999,
    description:
        "Áo thun ngắn tay, có túi với màu trơn đơn giản, form áo căn bản; vải được dệt từ 100% sợi cotton to, thô mộc, đứng dáng. Tem dệt Ananas xanh, nho nhỏ kẹp nhẹ nhàng bên cạnh trái túi tạo điểm nhấn vừa phải, không làm mất đi định hướng của áo cơ bản. Phối và ứng dụng bất chấp trong mọi ngày, mọi thể loại trang phục (nếu hợp màu).",
    sizes: ["S", "M", "L"],
    colors: ["Green", "Yellow", "Gray"],
    amount: 75,
    status: "Available",
    productType: "Type3",
    images: [
        "/product.jpg",
        "/product.jpg",
        "/product.jpg",
        "/product.jpg",
        "/product.jpg",
    ],
    averageRating: 4,
};
export function DetailProduct() {
    const [totalReviews, setTotalReviews] = useState(0);
    return (
        <>
            <div className="grid gap-14 md:grid-cols-2">
                {/* product images */}
                <ProductImages images={productData.images} />
                {/* product infor */}
                <ProductInfor productData={productData} />
            </div>
            {/* additional information */}
            <div className="flex w-full flex-col items-center border-y py-8">
                <Tabs defaultValue="description">
                    <TabsList className="grid w-full grid-cols-2 bg-transparent">
                        <TabsTrigger className="text-lg" value="description">
                            Description
                        </TabsTrigger>

                        <TabsTrigger className="text-lg" value="reviews">
                            Reviews
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="mt-6">
                        <div className="space-y-6">
                            <div className="block px-32 text-muted-foreground">
                                {productData.description}
                            </div>
                            <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                                {productData.images.map((src, index) => (
                                    <div
                                        className="rounded-lg bg-muted/10 p-2"
                                        key={index}
                                    >
                                        <Image
                                            src={src}
                                            alt={`Product ${index + 1}`}
                                            width={300}
                                            height={300}
                                            className="h-auto w-full rounded-lg"
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="reviews" className="mt-6">
                        <CustomerReview setTotalReviews={setTotalReviews} />
                    </TabsContent>
                </Tabs>
            </div>
        </>
    );
}
