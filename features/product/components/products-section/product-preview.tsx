import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProductPreviewProps {
    productId: string;
    productType: string;
    images: string;
    color: string;
    productName: string;
    price: number;
    description: string;
}

export function ProductPreview({
    productId,
    productType,
    color,
    images,
    productName,
    price,
    description,
}: ProductPreviewProps) {
    const [isHovered, setIsHovered] = useState(false);
    const router = useRouter();

    const handleProductClick = () => {
        router.push(`/products/${productId}`);
    };

    return (
        <Card
            className="width w-full max-w-xs cursor-pointer rounded-xl border"
            onClick={handleProductClick}
        >
            <div className="grid gap-4 p-4">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
                    {/* <Image
                        src={images}
                        alt={productName}
                        width="400"
                        height="500"
                        className="aspect-[4/5] w-full object-cover"
                    /> */}
                    <Image
                        src={
                            Array.isArray(images) && images.length > 0
                                ? images[0]
                                : "/placeholder.jpg"
                        } // Hiển thị hình ảnh đầu tiên hoặc ảnh placeholder
                        alt={productName}
                        width="400"
                        height="500"
                        className="aspect-[4/5] w-full object-cover"
                    />
                </div>
                <div className="flex gap-2">
                    <div className="grid flex-1 gap-1.5">
                        <h3 className="font-semibold md:text-base">
                            {productName}
                        </h3>
                        <h4 className="text-sm text-[#898989] md:text-base">
                            {color}
                        </h4>
                        <p className="text-sm font-semibold text-[#B88E2F] md:text-base">
                            {price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                            })}
                        </p>
                        {/* <p className="text-sm text-gray-600 md:text-base">{description}</p> */}
                    </div>
                    <div className="flex flex-col gap-2">
                        <Button
                            className="rounded-[50%] bg-transparent hover:bg-transparent"
                            size="icon"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            {isHovered ? (
                                <FaHeart className="text-[#B88E2F] hover:text-[#B88E2F]" />
                            ) : (
                                <FaRegHeart className="text-[#B88E2F] hover:text-[#B88E2F]" />
                            )}
                        </Button>

                        <Button
                            className="rounded-[50%] border-black bg-[#FCF8F3] hover:bg-[#B88E2F]"
                            size="icon"
                        >
                            <FaCartPlus className="text-[#B88E2F] hover:text-[#FCF8F3]" />
                        </Button>
                    </div>
                </div>
                {/* <Button size="sm">
                    <FaCartPlus />
                </Button>
                <Button size="sm">Thêm vào giỏ hàng</Button> */}
            </div>
        </Card>
    );
}
