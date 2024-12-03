import CarouselLayout from "../components/carousel";
import React from "react";

const images = [
    "/home/slide/slide1.png",
    "/home/slide/slide2.png",
    "/home/slide/slide3.jpg",
    "/home/slide/slide4.jpg",
];

export default function CarouselLayoutPage() {
    return (
        <div className="flex min-h-screen items-center bg-gray-100">
            <div className="ml-20 w-1/3 p-8">
                <h2 className="mb-4 text-4xl font-semibold text-gray-800">
                    50+ Cảm hứng thời trang
                </h2>
                <p className="mb-6 text-lg text-gray-600">
                    Nhà thiết kế của chúng tôi đã tạo ra nhiều mẫu trang phục
                    đẹp mắt để truyền cảm hứng cho bạn.
                </p>
                <button className="rounded-lg bg-yellow-700 px-6 py-2 text-white transition duration-300 hover:bg-blue-700">
                    Khám phá thêm
                </button>
            </div>

            {/* Carousel on the right side */}
            <div className="w-2/3 p-8">
                <CarouselLayout images={images} />
            </div>
        </div>
    );
}
