"use client";

import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
    onChange?: (rating: number) => void;
}
export default function StarRating({ onChange }: StarRatingProps) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    const handleMouseEnter = (starIndex: number) => {
        setHover(starIndex);
    };

    const handleMouseLeave = () => {
        setHover(0);
    };

    const handleClick = (starIndex: number) => {
        setRating(starIndex);
        if (onChange) {
            onChange(starIndex);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2">
            <div className="flex">
                {[1, 2, 3, 4, 5].map((starIndex) => (
                    <button
                        key={starIndex}
                        className={`p-1 ${
                            (hover || rating) >= starIndex
                                ? "text-yellow-400"
                                : "text-gray-300"
                        } transition-colors duration-150`}
                        onMouseEnter={() => handleMouseEnter(starIndex)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(starIndex)}
                        aria-label={`Rate ${starIndex} stars out of 5`}
                    >
                        <Star
                            className="h-8 w-8"
                            fill={
                                (hover || rating) >= starIndex
                                    ? "currentColor"
                                    : "none"
                            }
                        />
                    </button>
                ))}
            </div>
            <p className="text-lg font-semibold" aria-live="polite">
                Đánh giá của bạn: {rating} sao
            </p>
        </div>
    );
}
