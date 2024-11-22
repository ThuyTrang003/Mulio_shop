import React from 'react';
import Image from 'next/image';

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  badgeText?: string; // "New" or "-50%"
  currency: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  price,
  originalPrice,
  imageUrl,
  badgeText,
  currency,
}) => {
  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden group">
      {/* Image Section */}
      <div className="relative w-full h-60 overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg transition-transform duration-300 group-hover:scale-110"
        />
        {badgeText && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-lg">
            {badgeText}
          </span>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-center z-10">
          <button className="bg-white text-gray-800 font-semibold px-4 py-2 rounded shadow hover:bg-gray-200">
            Add to cart
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="mt-2 flex items-baseline space-x-2">
          <span className="text-red-500 text-xl font-bold">
            {price} {currency}
          </span>
          {originalPrice && (
            <span className="text-gray-400 line-through text-sm">
              {originalPrice} {currency}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;