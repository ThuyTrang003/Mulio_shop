"use client";

import { ProductImages } from "./product-images";
import { ProductInfor } from "./product-infor";
import Image from "next/image";
import { useState } from "react";

import { useGetProductByBase } from "@/hooks/product-hook/useProduct";

import { CustomerReview } from "@/features/review/customer-review";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface DetailProductProps {
    id: string | string[] | undefined; // The product id
}
export function DetailProduct({ id }: DetailProductProps) {
    const { data: productByBase } = useGetProductByBase(id);
    return (
        <>
            {productByBase && (
                <>
                    <div className="grid gap-14 md:grid-cols-2">
                        {/* product images */}
                        <ProductImages images={productByBase[0].images} />
                        {/* product infor */}
                        <ProductInfor productData={productByBase[0]} />
                    </div>
                    {/* additional information */}
                    <div className="flex w-full flex-col items-center border-y py-8">
                        <Tabs defaultValue="description">
                            <TabsList className="grid w-full grid-cols-2 bg-transparent">
                                <TabsTrigger
                                    className="text-lg"
                                    value="description"
                                >
                                    Description
                                </TabsTrigger>

                                <TabsTrigger
                                    className="text-lg"
                                    value="reviews"
                                >
                                    Reviews ({productByBase[0].totalRating})
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="description" className="mt-6">
                                <div className="space-y-6">
                                    <div className="block px-32 text-muted-foreground">
                                        {productByBase[0].description}
                                    </div>
                                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                                        {productByBase[0].images.map(
                                            (src: string, index: number) => (
                                                <div
                                                    className="rounded-lg bg-muted/10 p-2"
                                                    key={index}
                                                >
                                                    <Image
                                                        src={src}
                                                        alt={`Product ${index + 1}`}
                                                        width={1000}
                                                        height={1000}
                                                        className="h-auto w-full rounded-lg"
                                                    />
                                                </div>
                                            ),
                                        )}
                                    </div>
                                </div>
                            </TabsContent>

                            <TabsContent value="reviews" className="mt-6">
                                <CustomerReview
                                    skuBase={productByBase[0].skuBase}
                                />
                            </TabsContent>
                        </Tabs>
                    </div>
                </>
            )}
        </>
    );
}
