import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ProductPreviewProps {
    id: string;
    category: string;
    image: string;
    name: string;
    price: string;
    description: string;
}

export function ProductPreview({
    id,
    category,
    image,
    name,
    price,
    description,
}: ProductPreviewProps) {
    const router = useRouter();

    const handleProductClick = () => {
        router.push(`/products/${id}`); // Chuyển hướng đến trang chi tiết sản phẩm
    };

    return (
        <Card
            className="width w-full max-w-xs cursor-pointer rounded-xl border"
            onClick={handleProductClick}
        >
            <div className="grid gap-4 p-4">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
                    <Image
                        src={image}
                        alt={name}
                        width="400"
                        height="500"
                        className="aspect-[4/5] w-full border object-cover"
                    />
                </div>
                <div className="grid gap-1.5">
                    <h3 className="text-sm font-semibold md:text-base">
                        {name}
                    </h3>
                    <p className="text-sm font-semibold md:text-base">
                        {price}
                    </p>
                    <p className="text-sm text-gray-600 md:text-base">
                        {description}
                    </p>
                </div>
                <Button size="sm">Thêm vào giỏ hàng</Button>
            </div>
        </Card>
    );
}
