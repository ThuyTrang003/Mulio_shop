"use client";

// Mark this as a Client Component
import Image from "next/image";
import React, { useEffect, useState } from "react";

// Import the Next.js Image component

type CarouselProps = {
    images: string[];
};

const CarouselLayout: React.FC<CarouselProps> = ({ images }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Function to move to the next image
    const nextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    // Function to move to the previous image
    const prevImage = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length,
        );
    };

    // Auto-change images every 5 seconds
    useEffect(() => {
        const interval = setInterval(nextImage, 2000);
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, []);

    // Function to get the scale class for each image
    const getImageClass = (index: number) => {
        const position = (index - currentIndex + images.length) % images.length;
        if (position === 1) return "scale-200"; // Middle image, larger
        return position === 0 ? "scale-60" : ""; // Previous and next images, smaller
    };

    // Display the images (previous, current, next)
    const displayImages = () => {
        const prevIndex = (currentIndex - 1 + images.length) % images.length;
        const nextIndex = (currentIndex + 1) % images.length;
        return [prevIndex, currentIndex, nextIndex].map((index, i) => (
            <div key={index} className={`relative w-full ${getImageClass(i)}`}>
                <Image
                    src={images[index]}
                    alt={`carousel-image-${index}`}
                    width={400} // Set a specific width for each image
                    height={580} // Set a specific height for each image
                    className="h-auto w-full rounded-lg transition-transform duration-500 ease-in-out"
                />
            </div>
        ));
    };

    return (
        <div className="relative flex items-center justify-center space-x-4">
            {displayImages()}

            <button
                onClick={prevImage}
                className="absolute left-0 top-1/2 -translate-y-1/2 transform p-2 text-white transition-colors duration-300 hover:text-yellow-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <button
                onClick={nextImage}
                className="absolute right-0 top-1/2 -translate-y-1/2 transform p-2 text-white transition-colors duration-300 hover:text-yellow-700"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    );
};

export default CarouselLayout;
