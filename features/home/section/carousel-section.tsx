import React from 'react';
import CarouselLayout from '../components/carousel';

const images = [
  "/home/slide/slide1.png",
  "/home/slide/slide2.png",
  "/home/slide/slide3.jpg",
  "/home/slide/slide4.jpg",
];

export default function CarouselLayoutPage(){
  return (
    <div className="flex items-center min-h-screen bg-gray-100">

      <div className="w-1/3 p-8 ml-20">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          50+ Beautiful Fashion Inspiration
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Our designer already made a lot of beautiful prototypes of outfits that inspire you.
        </p>
        <button className="bg-yellow-700 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
          Explore More
        </button>
      </div>

      {/* Carousel on the right side */}
      <div className="w-2/3 p-8">
        <CarouselLayout images={images} />
      </div>
    </div>
  );
};


