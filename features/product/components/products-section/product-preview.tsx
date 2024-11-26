import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuthStore } from "@/stores/auth";
import { Modal } from "@/components/modal";

interface ProductPreviewProps {
    productId: string;
    productType: string;
    images: string;
    color: string;
    productName: string;
    price: number;
    description: string;
    skuBase: string;
}

export function ProductPreview({
    productId,
    productType,
    color,
    images,
    productName,
    price,
    description,
    skuBase,
}: ProductPreviewProps) {
    const { token } = useAuthStore();
    const accessToken = token.accessToken;
    const [isHovered, setIsHovered] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const router = useRouter();

    const handleProductClick = () => {
        router.push(`/products/${skuBase}`);
    };
    const handleFavoriteClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (!accessToken) {
            // Nếu không có token, hiển thị popup
            setShowPopup(true);
        } else {
            console.log("Thêm vào danh sách yêu thích");
            // Xử lý logic thêm vào danh sách yêu thích ở đây
        }
    };
    const handleClosePopup = () => setShowPopup(false);

    return (
        <Card
            className="width w-full max-w-xs cursor-pointer rounded-xl border"
            onClick={handleProductClick} // Chỉ kích hoạt khi click vào Card, không phải các nút con
        >
            <div className="grid gap-4 p-4">
                <div className="aspect-[4/5] w-full overflow-hidden rounded-xl">
                    <Image
                        src={
                            Array.isArray(images) && images.length > 0
                                ? images[0]
                                : "/placeholder.jpg"
                        }
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
                    </div>
                    <div className="flex flex-col justify-end gap-2">
                        <Button
                            className="rounded-[50%] bg-[#FCF8F3] hover:bg-[#FCF8F3]"
                            size="icon"
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            onClick={handleFavoriteClick}
                        >
                            {isHovered ? (
                                <FaHeart className="text-[#B88E2F] hover:text-[#B88E2F]" />
                            ) : (
                                <FaRegHeart className="text-[#B88E2F] hover:text-[#B88E2F]" />
                            )}
                        </Button>
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleProductClick}
                >
                    Mua hàng
                </Button>
            </div>
            {showPopup && (
                <Modal onClose={handleClosePopup}>
                    <div className="p-4 text-center">
                        <h3 className="text-lg font-semibold">
                            Thêm vào danh sách yêu thích
                        </h3>
                        <p className="mt-2 text-sm text-gray-600">
                            <span className="text-red-500">!</span> Vui lòng đăng nhập để sử dụng tính năng danh sách yêu thích hoặc đăng ký tài khoản mới.
                        </p>
                        <div className="flex justify-center gap-4 mt-4">
                            <Button variant="contained" onClick={() => console.log("Đi tới trang đăng nhập")}>
                                Đăng nhập
                            </Button>
                            <Button variant="secondary" onClick={() => console.log("Đi tới trang đăng ký")}>
                                Đăng ký
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
        </Card>
    );
}
