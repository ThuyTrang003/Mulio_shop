import { Heart, MessageSquare } from "lucide-react";
import Image from "next/image";

import StarRating from "@/components/star-rating";
import StarRatingDisplay from "@/components/star-rating-display";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const reviews = [
    {
        id: 1,
        author: "Towhidur fvhfidjnd jcoecoejoj",
        rating: 4,
        date: "24-10-2022",
        content:
            "My first and only maltones I was called to invite together in this kind of creation. The fun and genuine joy I invite together in this kind of creation.",
    },
    {
        id: 2,
        author: "Towhidur Rahman",
        rating: 4,
        date: "24-10-2022",
        content:
            "My first and only mala ordered on Etsy, and I'm beyond delighted! I requested a custom mala based on two stones I was called to invite together in this kind of creation. The fun and genuine joy I invite together in this kind of creation.",
    },
    {
        id: 3,
        author: "Towhidur Rahman",
        rating: 5,
        date: "24-10-2022",
        content: "My first an two stones I wa tf creation.",
    },
];
interface CustomerReviewProps {
    setTotalReviews: (value: number) => void;
}
export function CustomerReview({ setTotalReviews }: CustomerReviewProps) {
    setTotalReviews(reviews.length);
    return (
        <div className="mx-10 space-y-6">
            {reviews.map((review) => (
                <Card key={review.id} className="p-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-[200px_1fr]">
                        {/* Left Column - Author Info */}
                        <div className="flex flex-col items-start gap-2">
                            <div className="flex items-center gap-3">
                                <div>
                                    <h3 className="font-semibold">
                                        {review.author}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Review Content */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <StarRatingDisplay rating={review.rating} />
                                    <span className="ml-2 text-sm text-muted-foreground">
                                        {review.date}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    {review.content}
                                </p>
                            </div>
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    );
}
