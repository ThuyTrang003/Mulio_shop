import Image from "next/image";

import { useGetReviewsByBase } from "@/hooks/review-hook/useReview";

import { dateFormatter } from "@/utils/date-formatter";

import { ReviewType } from "@/features/review/types/review-type";

import StarRatingDisplay from "@/components/star-rating-display";
import { Card } from "@/components/ui/card";

interface CustomerReviewProps {
    skuBase: string;
}
export function CustomerReview({ skuBase }: CustomerReviewProps) {
    const { data: reviewsByBase } = useGetReviewsByBase(skuBase);
    console.log(reviewsByBase);
    return (
        <div className="mx-10 w-full space-y-6">
            {reviewsByBase && reviewsByBase.length === 0 && (
                <div className="text-center text-muted-foreground">
                    No reviews found.
                </div>
            )}
            {reviewsByBase &&
                reviewsByBase.map((review: ReviewType) => (
                    <Card key={review.id} className="p-6">
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr]">
                            {/* Left Column - Author Info */}
                            <div className="flex flex-col items-start gap-2">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <h3 className="font-semibold">
                                            {review.userName}
                                        </h3>
                                    </div>
                                </div>
                            </div>

                            {/* Right Column - Review Content */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <StarRatingDisplay
                                            rating={review.rating}
                                        />
                                        <span className="ml-2 text-sm text-muted-foreground">
                                            {dateFormatter(review.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-base">
                                        {review.comment}
                                    </p>
                                </div>
                                {/* Review Images */}
                                {review.images.length > 0 && (
                                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                        {review.images.map((image, index) => (
                                            <div
                                                key={index}
                                                className="relative aspect-square"
                                            >
                                                <Image
                                                    src={image}
                                                    alt={`Review image ${index + 1}`}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-md"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </Card>
                ))}
        </div>
    );
}
