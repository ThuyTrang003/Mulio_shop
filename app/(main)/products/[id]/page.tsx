"use client";

import { useParams } from "next/navigation";

import { DetailProduct } from "@/features/product/components/detail-product/index";

export default function DetailProductPage() {
    const params = useParams();
    const { id } = params;
    return (
        <div className="container mx-12 space-y-8 py-8">
            {id && <DetailProduct id={id} />}
        </div>
    );
}
