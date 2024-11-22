'use client'; // Mark as client component for usage of hooks

import Image from 'next/image';
import { useRouter } from 'next/navigation';  // Import useRouter from next/navigation
import * as React from "react";

export default function Banner() {
  const router = useRouter();  // Initialize the router

  const handleBuyNowClick = () => {
    router.push('/shop');  // Navigate to the /shop page
  };

  return (
    <div className="bg-red-600 relative h-[500px] md:h-[600px] lg:h-[700px] flex items-center justify-end">
      Background Image
      <Image
        src={"/home/banner.png"}
        alt="Banner background"
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      
      {/* Overlay Content */}
      <div className="relative z-10 bg-white bg-opacity-80 p-6 md:p-10 lg:p-12 rounded-lg max-w-sm md:max-w-md lg:max-w-lg mr-10">
        <p className="text-gray-700 uppercase font-semibold">New Arrival</p>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" style={{ color: "#B88E2F" }}>
          Discover Our New Collection
        </h2>
        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
        </p>
        <button 
          onClick={handleBuyNowClick}  // Trigger router.push when clicked
          className="mt-6 px-6 py-3 text-white font-semibold rounded-md" 
          style={{ background: "#B88E2F" }}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
