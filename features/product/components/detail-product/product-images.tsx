"use client";

import Image from "next/image";
import { useState } from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductImagesProps {
    images: string[];
}

export function ProductImages({ images }: ProductImagesProps) {
    const [selectedImage, setSelectedImage] = useState(0);

    return (
        <div className="flex items-center gap-8">
            {/* Thumbnails Carousel */}
            <div className="relative py-6">
                <Carousel orientation="vertical">
                    <CarouselContent className="mt-1 h-[500px]">
                        {images.map((src, index) => (
                            <CarouselItem
                                key={index}
                                className="basis-1/4 pt-1"
                            >
                                <button
                                    onClick={() => setSelectedImage(index)}
                                    className={`border-2 ${
                                        selectedImage === index
                                            ? "border-primary"
                                            : "border-gray-200"
                                    } h-28 w-28 overflow-hidden rounded-lg`}
                                >
                                    <Image
                                        src={src}
                                        alt={`Product thumbnail ${index + 1}`}
                                        width={2000}
                                        height={2000}
                                        className="h-auto w-full object-cover"
                                    />
                                </button>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            {/* Main Image */}
            <div className="flex-1">
                <Image
                    src={images[selectedImage]}
                    alt="Product main image"
                    width={2000}
                    height={2000}
                    className="h-auto w-full rounded-lg"
                />
            </div>
        </div>
    );
}
