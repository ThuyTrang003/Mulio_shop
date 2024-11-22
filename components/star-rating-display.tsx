import { Star } from "lucide-react";

interface StarRatingDisplayProps {
    rating: number;
    maxRating?: number;
}

export default function StarRatingDisplay({
    rating,
    maxRating = 5,
}: StarRatingDisplayProps) {
    return (
        <div
            className="flex items-center space-x-1"
            aria-label={`Đánh giá ${rating.toFixed(1)} trên ${maxRating} sao`}
        >
            <span className="text-base font-medium text-muted-foreground">
                {rating.toFixed(1)}
            </span>
            {[...Array(maxRating)].map((_, index) => {
                const fillPercentage = Math.min(
                    Math.max((rating - index) * 100, 0),
                    100,
                );

                return (
                    <div key={index} className="relative h-6 w-6">
                        {/* Background star (empty) */}
                        <Star className="absolute h-6 w-6 text-gray-200" />

                        {/* Foreground star (filled) with width based on rating */}
                        <div
                            className="absolute h-6 w-6 overflow-hidden"
                            style={{ width: `${fillPercentage}%` }}
                        >
                            <Star className="h-6 w-6 fill-current text-yellow-400" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
