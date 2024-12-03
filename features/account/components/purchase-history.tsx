"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { usePostReviewsByBase } from "@/hooks/review-hook/useReview";
import { useGetCartHistory } from "@/hooks/user-hook/use-purchased";

import { useAuthStore } from "@/stores/auth";

import { moneyFormatter } from "@/utils/money-formatter";

import { ReviewType } from "@/features/review/types/review-type";

import StarRating from "@/components/star-rating";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

interface Product {
    productId: string;
    productName: string;
    image: string[];
    size: string;
    color: string;
    amount: number;
    price: number;
    totalPrice: number;
}

interface Order {
    orderId: string;
    orderDate: string;
    totalPrice: number;
    orderProduct: Product[];
}

export default function PurchaseHistory() {
    const router = useRouter();
    const { token } = useAuthStore();
    const { data, isLoading, isError } = useGetCartHistory();
    const { mutate: postReview } = usePostReviewsByBase();

    const [orders, setOrders] = useState<Order[]>([]);
    const [isReviewDialogOpen, setIsReviewDialogOpen] =
        useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(
        null,
    );
    const [comment, setComment] = useState("");
    const [rating, setRating] = useState(0);
    const [images, setImages] = useState<File[]>([]);
    const [reviews, setReviews] = useState<{ [productId: string]: boolean }>(
        {},
    );

    const checkReviewExistence = async (productId: string) => {
        const exists = await fetchReview(productId); // wait for the promise to resolve
        setReviews((prev) => ({ ...prev, [productId]: exists })); // store the result
    };

    useEffect(() => {
        orders.forEach((order) => {
            order.orderProduct.forEach((product) => {
                checkReviewExistence(product.productId); // check for reviews when order is loaded
            });
        });
    }, [orders]);
    useEffect(() => {
        if (!token) {
            router.push("/login");
        }
    }, [token, router]);

    useEffect(() => {
        if (data) {
            setOrders(data.content);
        }
    }, [data]);

    const openReviewDialog = (product: Product) => {
        setSelectedProduct(product);
        setIsReviewDialogOpen(true);
    };

    const closeReviewDialog = () => {
        setIsReviewDialogOpen(false);
        setSelectedProduct(null);
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(Array.from(e.target.files));
        }
    };

    // const handleSubmit = async () => {
    //     if (!selectedProduct) return;
    //     if (!selectedProduct.productId || !selectedProduct.productName) {
    //         console.error("Missing review data!");
    //         alert("Missing review data!");
    //         return;
    //     }

    //     const reviewData: ReviewType = {
    //         id: "", // You can generate or leave it as empty if the ID is auto-generated by the backend
    //         productId: selectedProduct.productId,
    //         userId: "",
    //         userName: selectedProduct.productName, // or any user info you wish to associate with the review
    //         rating,
    //         comment,
    //         images: images.map((img) => URL.createObjectURL(img)), // Convert file to URL or use the image path as required
    //         createdAt: new Date().toISOString(), // Optional, if you need to store the creation timestamp
    //     };

    //     try {
    //         await postReview(reviewData);
    //         console.log("Review submitted successfully!");
    //         closeReviewDialog();
    //     } catch (error) {
    //         console.error("Error submitting review:", error);
    //         alert("An error occurred while submitting the review.");
    //     }
    // };

    const handleSubmit = async () => {
        if (!selectedProduct) return;

        const reviewData = {
            rating,
            comment,
            images: images.map((img) => URL.createObjectURL(img)), // Convert to URL if needed
            productId: selectedProduct.productId, // Sử dụng ID sản phẩm
        };

        try {
            await postReview(reviewData);
            console.log("Review submitted successfully!");
            closeReviewDialog();
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("An error occurred while submitting the review.");
        }
    };

    if (isLoading) {
        return (
            <div className="py-6 text-center">
                Loading your purchase history...
            </div>
        );
    }

    if (isError) {
        return (
            <div className="py-6 text-center text-red-500">
                Failed to load purchase history.
            </div>
        );
    }
    const fetchReview = async (productId: string) => {
        try {
            const response = await fetch(
                `http://localhost:8080/api/products/reviews/${productId}`,
            );
            const result = await response.json();
            console.log("Review data:", result);
            if (result && result.data.length > 0) {
                const review = result.data[0];
                setRating(review.rating); // Set fetched rating
                setComment(review.comment); // Set fetched comment
                setImages(
                    review.images.map(
                        (imageUrl: string) => new File([], imageUrl),
                    ),
                );
                return true; // Review exists
            } else {
                setRating(0); // Reset if no review exists
                setComment("");
                setImages([]);
                return false; // No review exists
            }
        } catch (error) {
            console.error("Error fetching review:", error);
            alert("Không thể lấy dữ liệu đánh giá!");
            return false;
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="mb-6 text-center text-4xl font-bold">
                Lịch sử mua hàng
            </h1>
            {orders.length === 0 ? (
                <div className="py-6 text-center">You have no orders yet.</div>
            ) : (
                orders.map((order: Order) => (
                    <div
                        key={order.orderId}
                        className="mb-8 rounded-lg border bg-white p-4 shadow-md"
                    >
                        <p className="mb-2 text-gray-600">
                            Ngày đặt:{" "}
                            {new Date(order.orderDate).toLocaleDateString()}
                        </p>
                        <p className="mb-4 text-red-600">
                            Tổng đơn hàng: {moneyFormatter(order.totalPrice)}
                        </p>
                        <div className="flex flex-col justify-between space-y-6">
                            {order.orderProduct.map((product: Product) => (
                                <div
                                    key={product.productId}
                                    className="flex flex-grow items-center rounded-lg border bg-gray-50 p-4 shadow-sm"
                                >
                                    <div className="relative h-32 w-32">
                                        <Image
                                            src={product.image[0]}
                                            alt={product.productName}
                                            layout="fill"
                                            objectFit="cover"
                                            className="rounded"
                                        />
                                    </div>
                                    <div className="ml-6 flex flex-col justify-between space-y-2">
                                        <h3 className="text-lg font-medium">
                                            {product.productName} -{" "}
                                            {product.size} - {product.color}
                                        </h3>
                                        <p className="text-sm text-gray-500">
                                            Đơn giá:{" "}
                                            {moneyFormatter(product.price)}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Số lượng: {product.amount}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Tổng:{" "}
                                            {moneyFormatter(product.totalPrice)}
                                        </p>
                                        {reviews[product.productId] ? (
                                            <Button
                                                variant="contained"
                                                size="sm"
                                                onClick={() =>
                                                    openReviewDialog(product)
                                                }
                                            >
                                                Cập nhật đánh giá
                                            </Button>
                                        ) : (
                                            <Button
                                                variant="contained"
                                                size="sm"
                                                onClick={() =>
                                                    openReviewDialog(product)
                                                }
                                            >
                                                Đánh giá sản phẩm
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}

            {/* Review Dialog */}
            {selectedProduct && (
                <Dialog
                    open={isReviewDialogOpen}
                    onOpenChange={closeReviewDialog}
                >
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                            <StarRating
                                defaultValue={rating}
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
                            <button
                                className="btn-secondary"
                                onClick={handleSubmit}
                            >
                                Gửi đánh giá
                            </button>
                            <DialogClose asChild>
                                <button
                                    className="btn-outline"
                                    onClick={closeReviewDialog}
                                >
                                    Hủy
                                </button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
        </div>
    );
}
