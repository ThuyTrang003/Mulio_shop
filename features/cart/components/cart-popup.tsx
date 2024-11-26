import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { TbShoppingBagX } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";

import { Button } from "@/components/ui/button";

interface CartPopupProps {
    onClose: () => void;
}

const products = [
    {
        id: "1",
        category: "shirt",
        image: "/cardigan/c-1.png",
        name: "Áo Cardigan",
        count: 2,
        price: 300000,
        color: "Xanh đậm",
    },
    {
        id: "2",
        category: "shirt",
        image: "/cardigan/c-2.png",
        name: "Áo Cardigan",
        count: 1,
        price: 300000,
        color: "Xám",
    },
    {
        id: "3",
        category: "shirt",
        image: "/cardigan/c-3.png",
        name: "Áo Cardigan",
        count: 3,
        price: 300000,
        color: "Đen",
    },
    {
        id: "4",
        category: "shirt",
        image: "/cardigan/c-4.png",
        name: "Áo Cardigan",
        count: 5,
        price: 300000,
        color: "Xanh",
    },
];

const CartPopup: React.FC<CartPopupProps> = ({ onClose }) => {
    const router = useRouter();

    // Calculate the total price
    const totalPrice = products.reduce(
        (total, product) => total + product.count * product.price,
        0,
    );

    // Handle opening the cart page and closing the popup
    const handleOpenCart = () => {
        onClose(); // Close the popup
        router.push(`/cart`); // Navigate to the cart page
    };
    const handleOpenCheckout = () => {
        onClose(); // Close the popup
        router.push(`/checkout`); // Navigate to the cart page
    };
    return (
        <>
            {/* Dark overlay */}
            <div
                className="fixed left-[-2rem] top-0 z-10 h-full w-[2000px] bg-black bg-opacity-50"
                onClick={onClose}
            ></div>

            {/* Popup content */}
            <div className="absolute right-[4.5rem] top-[-4.75rem] z-20 ml-8 mt-16 w-80 border border-gray-300 bg-white p-4 shadow-xl">
                <div className="mb-4 flex items-center justify-between border-b border-gray-300 pb-2">
                    <h3 className="text-lg font-semibold">Giỏ hàng của bạn</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                    >
                        <TbShoppingBagX />
                    </button>
                </div>
                <div className="mt-4 space-y-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center">
                                <Image
                                    height="100"
                                    width="100"
                                    src={product.image}
                                    alt={product.name}
                                    className="mr-4 h-[5rem] w-[5rem]"
                                />
                                <div>
                                    <h4 className="text-sm font-semibold">
                                        {product.name}
                                    </h4>
                                    <p className="text-xs text-gray-500">
                                        Màu: {product.color}
                                    </p>
                                    <div className="flex gap-1">
                                        <p className="text-sm">
                                            {product.count} x{" "}
                                        </p>
                                        <p className="text-sm text-[#B88E2F]">
                                            {product.price.toLocaleString()} VNĐ
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <button className="text-red-500 hover:text-red-700">
                                    <TiDelete />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total Price and Divider */}
                <div className="mt-4 border-b border-gray-300 pb-2 pt-4">
                    <div className="flex items-center justify-between">
                        <p className="font-semibold">Tổng cộng:</p>
                        <h5 className="font-semibold text-[#B88E2F]">
                            {totalPrice.toLocaleString()} VNĐ
                        </h5>
                    </div>
                </div>

                {/* Buttons */}
                <div className="mt-4 flex justify-between gap-4">
                    <Button
                        className="w-full rounded-full bg-[#B88E2F] px-4 py-2 text-sm font-semibold hover:bg-[#C6A559]"
                        onClick={handleOpenCart}
                    >
                        Xem giỏ hàng
                    </Button>
                    <Button
                        className="bg-color-none w-full rounded-full border-[1px] border-[#B88E2F] px-4 py-2 text-sm font-semibold text-black hover:bg-[#B88E2F] hover:text-[white]"
                        onClick={handleOpenCheckout}
                    >
                        Tiến hành thanh toán
                    </Button>
                </div>
            </div>
        </>
    );
};

export default CartPopup;
