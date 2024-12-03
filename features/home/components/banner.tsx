"use client";

// Mark as client component for usage of hooks
import Image from "next/image";
import { useRouter } from "next/navigation";
// Import useRouter from next/navigation
import * as React from "react";

export default function Banner() {
    const router = useRouter(); // Initialize the router

    const handleBuyNowClick = () => {
        router.push("/shop"); // Navigate to the /shop page
    };

    return (
        <div className="relative flex h-[500px] items-center justify-end bg-red-600 md:h-[600px] lg:h-[700px]">
            Background Image
            <Image
                src={"/home/banner.png"}
                alt="Banner background"
                layout="fill"
                objectFit="cover"
                className="z-0"
            />
            {/* Overlay Content */}
            <div className="relative z-10 mr-10 max-w-sm rounded-lg bg-white bg-opacity-80 p-6 md:max-w-md md:p-10 lg:max-w-lg lg:p-12">
                <p className="font-semibold uppercase text-gray-700">
                    Sản phẩm mới
                </p>
                <h2
                    className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl"
                    style={{ color: "#B88E2F" }}
                >
                    Khám phá bộ sưu tập mới của chúng tôi
                </h2>
                <p className="mt-4 text-gray-600">
                    Mỗi sản phẩm đều phù hợp với xu hướng thời trang hiện đại và
                    nhu cầu của khách hàng.
                </p>
                <button
                    onClick={handleBuyNowClick} // Trigger router.push when clicked
                    className="mt-6 rounded-md px-6 py-3 font-semibold text-white"
                    style={{ background: "#B88E2F" }}
                >
                    Mua Ngay
                </button>
            </div>
        </div>
    );
}
