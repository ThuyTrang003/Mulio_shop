"use client";

import { useState } from "react";

import { usePostReviewsByBase } from "@/hooks/review-hook/useReview";

import { useAuthStore } from "@/stores/auth";

import { ReviewType } from "@/features/review/types/review-type";

import StarRating from "@/components/star-rating";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface ProductReviewDialogProps {
    isOpen: boolean;
    onClose: () => void;
    review?: {
        productId: string;
        userId: string;
        userName: string;
    };
}

export default function ProductReviewDialog({
    isOpen,
    onClose,
    review,
}: ProductReviewDialogProps) {
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [images, setImages] = useState<File[]>([]);
    const { mutate: postReview } = usePostReviewsByBase();
    const { token } = useAuthStore();

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    const handleSubmit = async () => {
        console.log("Review Object:", review);
        console.log("Rating:", rating);
        console.log("Comment:", comment);

        if (
            !review ||
            !review.productId ||
            !review.userId ||
            !review.userName
        ) {
            console.error("Thiếu thông tin đánh giá!");
            alert("Missing review data!");
            return;
        }

        // Tạo đối tượng dữ liệu để gửi
        const reviewData = {
            productId: review.productId,
            userId: review.userId,
            userName: review.userName,
            rating,
            comment,
            images, // Nếu có ảnh
        };

        // Gọi hàm postReview để gửi đánh giá
        try {
            await postReview(reviewData);
            console.log("Đánh giá đã được gửi thành công!");
            onClose(); // Đóng hộp thoại sau khi gửi
        } catch (error) {
            console.error("Có lỗi khi gửi đánh giá:", error);
            alert("Đã có lỗi xảy ra khi gửi đánh giá.");
        }
    };

    if (!isOpen) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <StarRating
                        onChange={(newRating) => setRating(newRating)}
                    />
                    <textarea
                        className="w-full rounded border p-2"
                        placeholder="Viết bình luận..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <div>
                        <label className="block text-sm font-medium">
                            Tải lên ảnh
                        </label>
                        <input
                            type="file"
                            multiple
                            onChange={handleImageUpload}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <button className="btn-secondary" onClick={handleSubmit}>
                        Gửi đánh giá
                    </button>
                    <DialogClose asChild>
                        <button className="btn-outline" onClick={onClose}>
                            Hủy
                        </button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
